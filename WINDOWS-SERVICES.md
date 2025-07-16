# Windows Services Setup Guide

## 🚀 Quick Service Installation

### One-Click Setup (Recommended)
1. **Right-click `install-all-services.bat`** → **"Run as administrator"**
2. **Double-click `services-control.bat`** to manage services
3. **Start both services** and access at http://localhost:4200

## 📋 What Gets Installed

### Two Windows Services:
1. **"AI Initiative Backend"** 
   - Runs Node.js API server on port 3000
   - Serves both API and production frontend
   - Auto-starts with Windows

2. **"AI Initiative Frontend"**
   - Runs Angular dev server on port 4200
   - Hot reload for development
   - Auto-starts with Windows

## 🎛️ Service Management

### Easy Control Panel
```bash
# Master control for both services
services-control.bat
```

### Individual Service Control
```bash
# Backend service
cd backend
node backend-service.js --start/--stop/--install/--uninstall

# Frontend service  
cd frontend
node service.js --start/--stop/--install/--uninstall
```

### Windows Services Manager
1. Press `Win + R` → type `services.msc`
2. Find "AI Initiative Backend" and "AI Initiative Frontend"
3. Right-click for options

## 🌐 Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend Development | http://localhost:4200 | Angular dev server with hot reload |
| Backend API | http://localhost:3000/api | REST API endpoints |
| Production App | http://localhost:3000 | Combined frontend + backend |

## 📊 Service Features

✅ **Auto-start with Windows** - Services start automatically on boot  
✅ **Auto-restart on crash** - Automatic recovery from failures  
✅ **Centralized logging** - All output saved to log files  
✅ **Windows integration** - Full Windows Services management  
✅ **Development friendly** - Hot reload support for Angular  
✅ **Production ready** - Backend serves built Angular app  

## 📝 Log Files

- **Backend**: `backend/server.log` (if exists)
- **Frontend**: `frontend/service.log`
- **Service events**: Windows Event Viewer → Windows Logs → Application

## 🔧 Manual Installation

If the automated scripts don't work:

```bash
# Install dependencies
cd backend && npm install node-windows
cd ../frontend && npm install node-windows

# Install services (as Administrator)
cd backend && node backend-service.js --install
cd ../frontend && node service.js --install
```

## ⚙️ Configuration

### Backend Service
- **Script**: `backend/server.js`
- **Port**: 3000 (configurable in service)
- **Environment**: Production
- **Data file**: `backend/ai_ideas.json`

### Frontend Service  
- **Script**: `frontend/service-runner.js`
- **Port**: 4200 (Angular default)
- **Environment**: Development
- **Hot reload**: Enabled

## 🛠️ Troubleshooting

### Service won't start
1. Check Windows Event Viewer for errors
2. Verify `npm install` completed successfully
3. Ensure ports 3000/4200 are available
4. Run services manually first to test

### Permission issues
- Service installation requires administrator privileges
- File permissions may need adjustment

### Port conflicts
- Change ports in service configuration files
- Update Windows Firewall rules if needed

## 🗑️ Uninstalling Services

### Complete removal:
```bash
# Use the control panel
services-control.bat → Option 7

# Or manually
cd backend && node backend-service.js --uninstall
cd ../frontend && node service.js --uninstall
```

## 📈 Production Deployment

For production environments:
1. Build the Angular app: `cd frontend && npm run build`
2. Copy to backend: `xcopy dist\* ..\backend\public\`
3. Stop frontend service: Only run backend service
4. Access at: http://localhost:3000

## 🔄 Service Lifecycle

### Development Workflow:
1. Both services running for development
2. Frontend (4200) for live editing
3. Backend (3000) for API testing

### Production Workflow:
1. Build frontend to backend/public
2. Stop frontend service
3. Only backend service needed
4. Single URL for everything

## 🚨 Important Notes

- **Administrator required** for service installation
- **Firewall**: May need to allow Node.js through Windows Firewall
- **Antivirus**: Some antivirus may flag node.exe running as service
- **Updates**: Restart services after code changes (except frontend hot reload)

## 📞 Support Commands

```bash
# Check service status
sc query "AI Initiative Backend"
sc query "AI Initiative Frontend"

# Manual start/stop
net start "AI Initiative Backend"
net stop "AI Initiative Backend"

# View Windows Event logs
eventvwr.msc
```

## 🎯 Best Practices

1. **Development**: Use both services for hot reload
2. **Testing**: Use production build occasionally to test full integration
3. **Deployment**: Use only backend service with built frontend
4. **Monitoring**: Regularly check log files and Windows Event Viewer
5. **Backup**: Regular backup of `backend/ai_ideas.json` data file

Your AI Initiative app is now fully set up as Windows services! 🎉
