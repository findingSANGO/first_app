from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
from models import db, User, Location, Entry, MaterialEntry, OutPass, AccessCard
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def create_app():
    app = Flask(__name__)
    
    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///gate_management.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=8)

    # Initialize extensions
    CORS(app)
    db.init_app(app)
    jwt = JWTManager(app)

    # Create database tables
    with app.app_context():
        db.create_all()

    # Authentication routes
    @app.route('/api/auth/login', methods=['POST'])
    def login():
        data = request.get_json()
        user = User.query.filter_by(email=data.get('email')).first()
        
        if user and user.check_password(data.get('password')):
            access_token = create_access_token(identity=user.id)
            return jsonify({
                'access_token': access_token,
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'role': user.role,
                    'location_id': user.location_id
                }
            })
        
        return jsonify({'error': 'Invalid credentials'}), 401

    # User management routes
    @app.route('/api/users', methods=['GET'])
    @jwt_required()
    def get_users():
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        if current_user.role not in ['super_admin', 'admin']:
            return jsonify({'error': 'Unauthorized'}), 403
            
        users = User.query
        if current_user.role == 'admin':
            users = users.filter_by(location_id=current_user.location_id)
            
        return jsonify([{
            'id': user.id,
            'email': user.email,
            'role': user.role,
            'location_id': user.location_id,
            'is_active': user.is_active
        } for user in users.all()])

    # Entry management routes
    @app.route('/api/entries', methods=['POST'])
    @jwt_required()
    def create_entry():
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        if current_user.role not in ['guard', 'admin']:
            return jsonify({'error': 'Unauthorized'}), 403
            
        data = request.get_json()
        entry = Entry(
            entry_type=data['entry_type'],
            user_id=data['user_id'],
            location_id=current_user.location_id
        )
        
        db.session.add(entry)
        
        if data['entry_type'] == 'material':
            material_entry = MaterialEntry(
                entry=entry,
                bill_number=data.get('bill_number'),
                material_type=data.get('material_type'),
                quantity=data.get('quantity'),
                unit=data.get('unit'),
                supplier_name=data.get('supplier_name'),
                receiver_id=data.get('receiver_id'),
                ocr_data=data.get('ocr_data')
            )
            db.session.add(material_entry)
            
        db.session.commit()
        return jsonify({'message': 'Entry created successfully', 'id': entry.id})

    # OutPass routes
    @app.route('/api/outpass', methods=['POST'])
    @jwt_required()
    def request_outpass():
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        outpass = OutPass(
            user_id=current_user_id,
            reason=data['reason'],
            valid_until=data['valid_until']
        )
        
        db.session.add(outpass)
        db.session.commit()
        
        return jsonify({'message': 'OutPass requested successfully', 'id': outpass.id})

    @app.route('/api/outpass/<int:outpass_id>/approve', methods=['POST'])
    @jwt_required()
    def approve_outpass(outpass_id):
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        if current_user.role not in ['admin', 'manager']:
            return jsonify({'error': 'Unauthorized'}), 403
            
        outpass = OutPass.query.get(outpass_id)
        if not outpass:
            return jsonify({'error': 'OutPass not found'}), 404
            
        outpass.status = 'approved'
        outpass.approved_by_id = current_user_id
        outpass.approved_at = datetime.utcnow()
        
        db.session.commit()
        return jsonify({'message': 'OutPass approved successfully'})

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True) 