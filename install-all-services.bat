@echo off
echo AI Initiative - Complete Service Setup
echo ======================================
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ❌ This script requires administrator privileges!
    echo Please run as administrator to install Windows services.
    echo.
    pause
    exit /b 1
)

echo [1/4] Installing backend service dependencies...
cd backend
call npm install node-windows
if %errorlevel% neq 0 (
    echo ❌ Error installing backend dependencies!
    pause
    exit /b 1
)

echo [2/4] Installing frontend service dependencies...
cd ..\frontend
call npm install node-windows
if %errorlevel% neq 0 (
    echo ❌ Error installing frontend dependencies!
    pause
    exit /b 1
)

echo [3/4] Installing backend Windows service...
cd ..\backend
node backend-service.js --install

echo [4/4] Installing frontend Windows service...
cd ..\frontend
node service.js --install

echo.
echo ========================================
echo ✅ Service Installation Complete!
echo ========================================
echo.
echo Two Windows services have been installed:
echo   1. "AI Initiative Backend" - Node.js API server
echo   2. "AI Initiative Frontend" - Angular dev server
echo.
echo Services are installed but not started.
echo.
echo Management Options:
echo   • Use services-control.bat for easy management
echo   • Use Windows Services Manager (services.msc)
echo   • Use individual service control scripts
echo.
echo Access Points (when services are running):
echo   • Frontend: http://localhost:4200
echo   • Backend API: http://localhost:3000
echo   • Production (backend only): http://localhost:3000
echo.
pause
