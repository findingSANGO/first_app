# Database Setup Guide

## Prerequisites
- Python 3.8 or later
- PostgreSQL 13 or later
- Required Python packages (from requirements.txt):
  - Flask-SQLAlchemy==3.1.1
  - SQLAlchemy==2.0.27
  - python-dotenv==1.0.1

## 1. PostgreSQL Setup

### On macOS (using Homebrew):
```bash
# Install PostgreSQL
brew install postgresql@14

# Start PostgreSQL service
brew services start postgresql@14
```

### Create Database and User:
```sql
-- Connect to PostgreSQL
psql postgres

-- Create database
CREATE DATABASE gate_management;

-- Create user (replace with your credentials)
CREATE USER gate_user WITH PASSWORD 'your_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE gate_management TO gate_user;
```

## 2. Project Setup

### Environment Configuration
Create `.env` file in `web_app/backend/`:
```bash
DATABASE_URL=postgresql://gate_user:your_password@localhost:5432/gate_management
JWT_SECRET_KEY=your-secret-key-here
FLASK_ENV=development
FLASK_APP=app.py
```

### Database Initialization
```bash
# Navigate to backend directory
cd web_app/backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Initialize database
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

## 3. Database Schema

### Tables and Relationships

1. **Location**
   - Primary Key: id
   - Fields:
     - name (String, Required)
     - address (String, Required)
     - created_at (DateTime)
     - is_active (Boolean)

2. **User**
   - Primary Key: id
   - Fields:
     - email (String, Unique, Required)
     - password_hash (String)
     - first_name (String)
     - last_name (String)
     - role (String: super_admin, admin, manager, employee, guard, visitor)
     - location_id (Foreign Key to Location)
     - manager_id (Foreign Key to User)
     - employee_type (String: privileged, normal)
     - is_active (Boolean)
     - created_at (DateTime)
     - last_login (DateTime)

3. **AccessCard**
   - Primary Key: id
   - Fields:
     - card_number (String, Unique, Required)
     - user_id (Foreign Key to User)
     - is_active (Boolean)
     - issued_at (DateTime)
     - valid_until (DateTime)

4. **Entry**
   - Primary Key: id
   - Fields:
     - entry_type (String: employee, material)
     - user_id (Foreign Key to User)
     - location_id (Foreign Key to Location)
     - entry_time (DateTime)
     - exit_time (DateTime)
     - approved_by_id (Foreign Key to User)
     - status (String: pending, approved, rejected)

5. **MaterialEntry**
   - Primary Key: id
   - Fields:
     - entry_id (Foreign Key to Entry)
     - bill_number (String)
     - material_type (String)
     - quantity (Float)
     - unit (String)
     - supplier_name (String)
     - receiver_id (Foreign Key to User)
     - ocr_data (JSON)

6. **OutPass**
   - Primary Key: id
   - Fields:
     - user_id (Foreign Key to User)
     - approved_by_id (Foreign Key to User)
     - reason (String)
     - requested_at (DateTime)
     - approved_at (DateTime)
     - valid_until (DateTime)
     - status (String: pending, approved, rejected)

## 4. Initial Data Setup

### Create Super Admin
```python
# Run Flask shell
flask shell

# Create admin user
from models import db, User
admin = User(
    email="admin@example.com",
    role="super_admin",
    first_name="Admin",
    last_name="User",
    is_active=True
)
admin.set_password("your_admin_password")
db.session.add(admin)
db.session.commit()
```

## 5. Common Operations

### Backup Database
```bash
pg_dump -U gate_user gate_management > backup.sql
```

### Restore Database
```bash
psql -U gate_user gate_management < backup.sql
```

### Reset Database
```bash
# In PostgreSQL shell
DROP DATABASE gate_management;
CREATE DATABASE gate_management;

# Then run migrations
flask db upgrade
```

## 6. Troubleshooting

1. **Connection Issues**
   - Verify PostgreSQL is running
   - Check credentials in .env
   - Ensure database exists
   - Check PostgreSQL logs

2. **Migration Issues**
   ```bash
   # Reset migrations
   flask db stamp head
   flask db migrate
   flask db upgrade
   ```

3. **Permission Issues**
   ```sql
   -- Grant privileges
   GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO gate_user;
   GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO gate_user;
   ```
