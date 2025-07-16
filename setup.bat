@echo off
echo Setting up AI Initiative App...
echo.

echo [1/4] Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Error installing backend dependencies!
    pause
    exit /b 1
)
cd ..

echo [2/4] Installing frontend dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo Error installing frontend dependencies!
    pause
    exit /b 1
)
cd ..

echo [3/4] Installing Angular CLI globally...
call npm install -g @angular/cli

echo [4/4] Setup complete!
echo.
echo ====================================
echo AI Initiative App is ready to use!
echo ====================================
echo.
echo Quick Start Options:
echo 1. Development Mode: Run start-dev.bat
echo 2. Production Mode: Run build-production.bat
echo.
echo Manual Commands:
echo - Backend: cd backend ^&^& npm start
echo - Frontend: cd frontend ^&^& npm start
echo.
echo Backend will run on: http://localhost:3000
echo Frontend will run on: http://localhost:4200
echo.
pause
