@echo off
echo AI Initiative - Services Control Panel
echo =====================================
echo.

:main_menu
echo Main Menu:
echo 1. Backend Service Management
echo 2. Frontend Service Management  
echo 3. Start Both Services
echo 4. Stop Both Services
echo 5. Check All Services Status
echo 6. View Service Logs
echo 7. Uninstall All Services
echo 8. Exit
echo.
set /p choice="Enter your choice (1-8): "

if "%choice%"=="1" goto backend_menu
if "%choice%"=="2" goto frontend_menu
if "%choice%"=="3" goto start_all
if "%choice%"=="4" goto stop_all
if "%choice%"=="5" goto status_all
if "%choice%"=="6" goto logs_menu
if "%choice%"=="7" goto uninstall_all
if "%choice%"=="8" goto exit

echo Invalid choice. Please try again.
echo.
goto main_menu

:backend_menu
echo.
echo Backend Service Management:
echo 1. Start Backend Service
echo 2. Stop Backend Service
echo 3. Check Backend Status
echo 4. Back to Main Menu
echo.
set /p bchoice="Enter choice (1-4): "

if "%bchoice%"=="1" (
    cd backend
    node backend-service.js --start
    cd ..
    echo Backend service start command sent.
)
if "%bchoice%"=="2" (
    cd backend
    node backend-service.js --stop
    cd ..
    echo Backend service stop command sent.
)
if "%bchoice%"=="3" (
    sc query "AI Initiative Backend" | findstr STATE
)
if "%bchoice%"=="4" goto main_menu

echo.
pause
goto backend_menu

:frontend_menu
echo.
echo Frontend Service Management:
echo 1. Start Frontend Service
echo 2. Stop Frontend Service
echo 3. Check Frontend Status
echo 4. Back to Main Menu
echo.
set /p fchoice="Enter choice (1-4): "

if "%fchoice%"=="1" (
    cd frontend
    node service.js --start
    cd ..
    echo Frontend service start command sent.
)
if "%fchoice%"=="2" (
    cd frontend
    node service.js --stop
    cd ..
    echo Frontend service stop command sent.
)
if "%fchoice%"=="3" (
    sc query "AI Initiative Frontend" | findstr STATE
)
if "%fchoice%"=="4" goto main_menu

echo.
pause
goto frontend_menu

:start_all
echo Starting all services...
cd backend
node backend-service.js --start
cd ..\frontend
node service.js --start
cd ..
echo.
echo Both services start commands sent.
echo Backend API: http://localhost:3000
echo Frontend: http://localhost:4200
echo.
pause
goto main_menu

:stop_all
echo Stopping all services...
cd backend
node backend-service.js --stop
cd ..\frontend
node service.js --stop
cd ..
echo.
echo Both services stop commands sent.
echo.
pause
goto main_menu

:status_all
echo Checking all services status...
echo.
echo Backend Service:
sc query "AI Initiative Backend" | findstr STATE
echo.
echo Frontend Service:
sc query "AI Initiative Frontend" | findstr STATE
echo.
pause
goto main_menu

:logs_menu
echo.
echo Service Logs:
echo 1. View Backend Logs
echo 2. View Frontend Logs
echo 3. Back to Main Menu
echo.
set /p lchoice="Enter choice (1-3): "

if "%lchoice%"=="1" (
    if exist "backend\server.log" (
        notepad backend\server.log
    ) else (
        echo No backend log file found.
    )
)
if "%lchoice%"=="2" (
    if exist "frontend\service.log" (
        notepad frontend\service.log
    ) else (
        echo No frontend log file found.
    )
)
if "%lchoice%"=="3" goto main_menu

echo.
pause
goto logs_menu

:uninstall_all
echo.
echo ⚠️  WARNING: This will uninstall BOTH Windows services.
set /p confirm="Are you sure you want to uninstall all services? (y/N): "
if /i "%confirm%"=="y" (
    echo Uninstalling backend service...
    cd backend
    node backend-service.js --uninstall
    cd ..\frontend
    echo Uninstalling frontend service...
    node service.js --uninstall
    cd ..
    echo.
    echo ✅ All services uninstalled.
) else (
    echo Uninstall cancelled.
)
echo.
pause
goto main_menu

:exit
echo.
echo Thanks for using AI Initiative Services Control Panel!
pause
exit /b 0
