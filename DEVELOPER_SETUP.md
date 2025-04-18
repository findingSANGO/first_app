# Developer Setup Guide

## Prerequisites
- Node.js (v16 or later)
- Python 3.8 or later (for AI components)
- PostgreSQL 13 or later
- Xcode (for iOS development)
- Android Studio (for Android development)

## Repository Structure
```
first_app/
├── web_app/           # Web application
│   ├── frontend/      # React frontend
│   └── backend/       # python backend
├── mobile_app/        # React Native mobile app
└── ai_components/     # AI/ML components
```

## 1. Web Application Setup

### Backend Setup (Flask)
```bash
cd web_app/backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env  # Configure your environment variables
flask run  # Start development server
```

### Frontend Setup
```bash
cd web_app/frontend
npm install
cp .env.example .env  # Configure your environment variables
npm start            # Start development server
```

## 2. Mobile Application Setup

### Initial Setup
```bash
cd mobile_app
npm install
```

### iOS Setup
```bash
cd ios
pod install
cd ..
npm run ios  # Start iOS simulator
```

### Android Setup
```bash
# Make sure you have Android Studio and an emulator set up
npm run android  # Start Android emulator
```

## 3. AI Components Setup

### Python Environment Setup
```bash
cd ai_components
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Environment Variables

### Backend (.env)
```
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/entry_management
JWT_SECRET=your_jwt_secret
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:3000/api
```

### Mobile App (.env)
```
API_URL=http://localhost:3000/api
```

## Development Workflow

1. **Backend Development**
   - Write API endpoints in `web_app/backend/src/routes`
   - Add models in `web_app/backend/src/models`
   - Run tests: `npm test`

2. **Frontend Development**
   - Components in `web_app/frontend/src/components`
   - Pages in `web_app/frontend/src/pages`
   - Run tests: `npm test`

3. **Mobile Development**
   - Screens in `mobile_app/src/screens`
   - Components in `mobile_app/src/components`
   - Run tests: `npm test`

## Testing

### Running Tests
```bash
# Backend tests
cd web_app/backend
npm test

# Frontend tests
cd web_app/frontend
npm test

# Mobile app tests
cd mobile_app
npm test
```

## Common Issues & Solutions

### Mobile App
1. **Pod install fails**
   ```bash
   cd ios
   pod deintegrate
   pod install
   ```

2. **Android build fails**
   - Clean Android build:
     ```bash
     cd android
     ./gradlew clean
     ```

### Web App
1. **Database connection fails**
   - Check PostgreSQL service is running
   - Verify database credentials in .env

2. **Frontend API calls fail**
   - Ensure backend server is running
   - Check API_URL in .env

## Deployment

### Web Application
1. Build frontend:
   ```bash
   cd web_app/frontend
   npm run build
   ```

2. Build backend:
   ```bash
   cd web_app/backend
   npm run build
   ```

### Mobile Application
1. iOS Release:
   ```bash
   cd mobile_app
   npm run ios:release
   ```

2. Android Release:
   ```bash
   cd mobile_app
   npm run android:release
   ```

## Code Style & Linting

- Run ESLint:
  ```bash
  npm run lint
  ```

- Run Prettier:
  ```bash
  npm run format
  ```

## Contributing Guidelines

1. Create a new branch for each feature/fix
2. Follow the commit message convention:
   - feat: New feature
   - fix: Bug fix
   - docs: Documentation changes
   - style: Code style changes
   - refactor: Code refactoring
   - test: Test changes

3. Submit pull requests with:
   - Clear description
   - Screenshots (if UI changes)
   - Test coverage

## Support

For technical issues:
1. Check the troubleshooting guide
2. Search existing issues
3. Create a new issue with:
   - Environment details
   - Steps to reproduce
   - Expected vs actual behavior

## Documentation

- API Documentation: `web_app/backend/docs/API.md`
- Component Documentation: `web_app/frontend/docs/COMPONENTS.md`
- Mobile App Documentation: `mobile_app/docs/README.md`

Remember to keep this guide updated as the project evolves. For detailed documentation, refer to specific README files in each component's directory. 