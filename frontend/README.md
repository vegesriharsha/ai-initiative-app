# Frontend Setup Instructions

## Prerequisites
- Node.js (version 16 or higher)
- npm (comes with Node.js)
- Angular CLI (optional but recommended)

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Install Angular CLI globally (if not already installed):
```bash
npm install -g @angular/cli
```

## Running the Application

### Development Mode
```bash
npm start
# or
ng serve
```

The application will start on http://localhost:4200

### Development with auto-open browser
```bash
npm run serve
```

### Build for Production
```bash
npm run build
```

This creates a `dist/` folder with the compiled application.

## Deployment

### Production Build and Deploy to Backend
```bash
# Build the application
npm run build

# Copy dist files to backend's public folder
# Windows:
xcopy /E /I dist\ai-initiative-frontend ..\backend\public

# Linux/Mac:
cp -r dist/ai-initiative-frontend/* ../backend/public/
```

## Development Features

- Hot reload during development
- TypeScript support
- Angular standalone components
- Responsive design
- Form validation
- Local storage fallback

## API Integration

The application automatically tries to connect to the backend API at `/api/submit-idea`. If the backend is not available, it falls back to localStorage.

## Troubleshooting

- Make sure Node.js version is 16 or higher
- Clear browser cache if styles don't load properly
- Check browser console for any JavaScript errors
- Ensure the backend server is running if you want server-side persistence
