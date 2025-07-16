# Project Setup and Deployment Scripts

## Setup Scripts

### setup.bat (Windows)
```batch
@echo off
echo Setting up AI Initiative App...

echo Installing backend dependencies...
cd backend
call npm install
cd ..

echo Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo Setup complete!
echo.
echo To start the application:
echo 1. Run backend: cd backend && npm start
echo 2. Run frontend: cd frontend && npm start
echo.
pause
```

### setup.sh (Linux/Mac)
```bash
#!/bin/bash
echo "Setting up AI Initiative App..."

echo "Installing backend dependencies..."
cd backend
npm install
cd ..

echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "Setup complete!"
echo ""
echo "To start the application:"
echo "1. Run backend: cd backend && npm start"
echo "2. Run frontend: cd frontend && npm start"
```

### start-dev.bat (Windows Development)
```batch
@echo off
echo Starting AI Initiative App in development mode...

start "Backend Server" cmd /k "cd backend && npm start"
timeout 3
start "Frontend Server" cmd /k "cd frontend && npm start"

echo Both servers are starting...
echo Backend: http://localhost:3000
echo Frontend: http://localhost:4200
pause
```

### build-production.bat (Windows Production Build)
```batch
@echo off
echo Building AI Initiative App for production...

echo Building frontend...
cd frontend
call npm run build
cd ..

echo Copying frontend build to backend...
if exist "backend\public" rmdir /s /q "backend\public"
xcopy /E /I "frontend\dist\ai-initiative-frontend" "backend\public"

echo Production build complete!
echo Start with: cd backend && npm start
echo Access at: http://localhost:3000
pause
```

## Quick Start Commands

### Windows
```cmd
# Setup everything
setup.bat

# Start development servers
start-dev.bat

# Build for production
build-production.bat
```

### Linux/Mac
```bash
# Make scripts executable
chmod +x setup.sh

# Setup everything
./setup.sh

# Start backend
cd backend && npm start

# Start frontend (in another terminal)
cd frontend && npm start
```

## Manual Commands

### Backend Setup
```bash
cd backend
npm install
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Production Build
```bash
cd frontend
npm run build
cp -r dist/ai-initiative-frontend/* ../backend/public/
cd ../backend
npm start
```

Access the application at http://localhost:3000
