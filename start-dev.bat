@echo off
echo Starting AI Initiative App in Development Mode...
echo.

echo [1/2] Starting Backend Server...
start "AI Initiative Backend" cmd /k "cd /d %~dp0backend && npm start"

echo [2/2] Waiting 5 seconds then starting Frontend...
timeout 5 /nobreak >nul

start "AI Initiative Frontend" cmd /k "cd /d %~dp0frontend && npm start"

echo.
echo ====================================
echo AI Initiative App is starting...
echo ====================================
echo.
echo Backend Server: http://localhost:3000
echo Frontend Server: http://localhost:4200
echo.
echo Wait for both servers to fully start before accessing the application.
echo The frontend will automatically open in your browser.
echo.
echo Press any key to close this window...
pause >nul
