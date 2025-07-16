@echo off
echo.
echo  ╔════════════════════════════════════════════════════════════╗
echo  ║                AI Initiative Ideas Collection               ║
echo  ║                    Quick Start Menu                        ║
echo  ╚════════════════════════════════════════════════════════════╝
echo.

:main_menu
echo Choose your setup option:
echo.
echo  📦 SETUP OPTIONS:
echo     1. Quick Setup (Install dependencies only)
echo     2. Install as Windows Services (Requires Admin)
echo     3. Start Development Servers (Manual)
echo     4. Build for Production
echo.
echo  🎛️  SERVICE MANAGEMENT:
echo     5. Service Control Panel
echo     6. Check Service Status
echo.
echo  📚 HELP & INFO:
echo     7. View Documentation
echo     8. Open Project in Explorer
echo     9. Exit
echo.
set /p choice="Enter your choice (1-9): "

if "%choice%"=="1" goto quick_setup
if "%choice%"=="2" goto install_services
if "%choice%"=="3" goto start_dev
if "%choice%"=="4" goto build_prod
if "%choice%"=="5" goto service_control
if "%choice%"=="6" goto check_status
if "%choice%"=="7" goto documentation
if "%choice%"=="8" goto open_explorer
if "%choice%"=="9" goto exit

echo Invalid choice. Please try again.
echo.
goto main_menu

:quick_setup
echo.
echo 📦 Running Quick Setup...
echo ========================
call setup.bat
echo.
echo ✅ Quick setup complete!
echo.
pause
goto main_menu

:install_services
echo.
echo 🔧 Installing Windows Services...
echo ==================================
echo This requires administrator privileges.
echo.
set /p confirm="Continue with service installation? (y/N): "
if /i "%confirm%"=="y" (
    call install-all-services.bat
) else (
    echo Installation cancelled.
)
echo.
pause
goto main_menu

:start_dev
echo.
echo 🚀 Starting Development Servers...
echo ===================================
call start-dev.bat
echo.
pause
goto main_menu

:build_prod
echo.
echo 🏗️  Building for Production...
echo ==============================
call build-production.bat
echo.
pause
goto main_menu

:service_control
echo.
echo 🎛️  Opening Service Control Panel...
echo ====================================
call services-control.bat
goto main_menu

:check_status
echo.
echo 📊 Checking Service Status...
echo =============================
echo.
echo Backend Service Status:
sc query "AI Initiative Backend" 2>nul | findstr STATE || echo Service not installed
echo.
echo Frontend Service Status:
sc query "AI Initiative Frontend" 2>nul | findstr STATE || echo Service not installed
echo.
echo Manual Process Status:
echo Checking for Node.js processes...
tasklist | findstr node.exe || echo No Node.js processes running
echo.
pause
goto main_menu

:documentation
echo.
echo 📚 Documentation Options:
echo =========================
echo 1. Main README (Project Overview)
echo 2. Setup Instructions
echo 3. Windows Services Guide
echo 4. Backend API Documentation
echo 5. Frontend Development Guide
echo 6. Back to Main Menu
echo.
set /p doc_choice="Choose documentation (1-6): "

if "%doc_choice%"=="1" notepad README.md
if "%doc_choice%"=="2" notepad SETUP.md
if "%doc_choice%"=="3" notepad WINDOWS-SERVICES.md
if "%doc_choice%"=="4" notepad backend\README.md
if "%doc_choice%"=="5" notepad frontend\README.md
if "%doc_choice%"=="6" goto main_menu

echo.
pause
goto documentation

:open_explorer
echo.
echo 📁 Opening project in Windows Explorer...
explorer .
goto main_menu

:exit
echo.
echo Thanks for using AI Initiative Ideas Collection!
echo.
echo Quick Access URLs (when running):
echo   Development: http://localhost:4200
echo   Production:  http://localhost:3000
echo.
echo Have a great day! 🚀
echo.
pause
exit /b 0
