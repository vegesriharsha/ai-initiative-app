@echo off
echo AI Initiative Frontend - Windows Service Setup
echo =============================================
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

echo Installing service dependencies...
call npm install node-windows
if %errorlevel% neq 0 (
    echo ❌ Error installing node-windows dependency!
    pause
    exit /b 1
)

echo.
echo Installing AI Initiative Frontend Windows Service...
node service.js --install

echo.
echo Service installation complete!
echo.
echo The service has been installed but not started.
echo You can manage it through:
echo   1. Windows Services Manager (services.msc)
echo   2. Command line: node service.js --start/--stop
echo   3. Use the service-control.bat script
echo.
pause
