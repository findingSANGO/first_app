from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class Location(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200))
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    role = db.Column(db.String(20), nullable=False)  # super_admin, admin, manager, employee, guard, visitor
    location_id = db.Column(db.Integer, db.ForeignKey('location.id'))
    manager_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    employee_type = db.Column(db.String(20))  # privileged, normal
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime)

    # Relationships
    location = db.relationship('Location', backref='users')
    manager = db.relationship('User', backref='subordinates', remote_side=[id])

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class AccessCard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    card_number = db.Column(db.String(50), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    is_active = db.Column(db.Boolean, default=True)
    issued_at = db.Column(db.DateTime, default=datetime.utcnow)
    valid_until = db.Column(db.DateTime)
    
    user = db.relationship('User', backref='access_card')

class Entry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    entry_type = db.Column(db.String(20), nullable=False)  # employee, material
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    location_id = db.Column(db.Integer, db.ForeignKey('location.id'))
    entry_time = db.Column(db.DateTime, default=datetime.utcnow)
    exit_time = db.Column(db.DateTime)
    approved_by_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    status = db.Column(db.String(20), default='pending')  # pending, approved, rejected
    
    user = db.relationship('User', foreign_keys=[user_id], backref='entries')
    location = db.relationship('Location', backref='entries')
    approved_by = db.relationship('User', foreign_keys=[approved_by_id])

class MaterialEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    entry_id = db.Column(db.Integer, db.ForeignKey('entry.id'))
    bill_number = db.Column(db.String(50))
    material_type = db.Column(db.String(100))
    quantity = db.Column(db.Float)
    unit = db.Column(db.String(20))
    supplier_name = db.Column(db.String(100))
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    ocr_data = db.Column(db.JSON)
    
    entry = db.relationship('Entry', backref='material_details')
    receiver = db.relationship('User', backref='received_materials')

class OutPass(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    approved_by_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    reason = db.Column(db.String(200))
    requested_at = db.Column(db.DateTime, default=datetime.utcnow)
    approved_at = db.Column(db.DateTime)
    valid_until = db.Column(db.DateTime)
    status = db.Column(db.String(20), default='pending')  # pending, approved, rejected
    
    user = db.relationship('User', foreign_keys=[user_id], backref='outpasses')
    approved_by = db.relationship('User', foreign_keys=[approved_by_id]) 