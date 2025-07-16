# Angular Development Server as Windows Service

This setup allows you to run the Angular development server as a Windows service that automatically starts with your computer.

## Quick Setup

### 1. Install Service (Run as Administrator)
```bash
# Double-click this file as Administrator
install-service.bat
```

### 2. Control Service
```bash
# Use the control panel
service-control.bat
```

## Manual Commands

### Install Service
```bash
# Install dependencies first
npm install node-windows

# Install the service (requires admin privileges)
node service.js --install
```

### Control Service
```bash
# Start service
node service.js --start

# Stop service
node service.js --stop

# Uninstall service
node service.js --uninstall
```

## Service Details

- **Service Name**: "AI Initiative Frontend"
- **Port**: 4200 (http://localhost:4200)
- **Auto-start**: Yes (starts with Windows)
- **Log File**: `service.log` (in frontend directory)
- **Working Directory**: Frontend project folder

## Service Features

✅ **Auto-restart**: Automatically restarts if it crashes  
✅ **Logging**: All output logged to `service.log`  
✅ **Windows Integration**: Manageable via `services.msc`  
✅ **Boot startup**: Starts automatically with Windows  
✅ **Admin control**: Full start/stop/restart control  

## Troubleshooting

### Service won't start
1. Check `service.log` for error messages
2. Ensure `npm install` was run in frontend directory
3. Verify Angular CLI is installed: `npm list @angular/cli`

### Port conflicts
- Change port in `service-runner.js` if 4200 is in use
- Update firewall rules if needed

### Permission issues
- Service installation requires administrator privileges
- Run `install-service.bat` as Administrator

## Windows Services Manager

You can also manage the service through Windows Services Manager:
1. Press `Win + R`, type `services.msc`
2. Find "AI Initiative Frontend" service
3. Right-click for start/stop/properties options

## Log Monitoring

The service logs all output to `service.log`:
- Angular CLI output
- Error messages  
- Service start/stop events
- Automatic restart notifications

View logs with: `notepad service.log` or use the service control menu.

## Uninstalling

To completely remove the service:
1. Stop the service: `node service.js --stop`
2. Uninstall: `node service.js --uninstall`
3. Or use `service-control.bat` option 5

## Production Notes

This setup is designed for development environments. For production:
- Use the built Angular app served by the backend
- Run the backend as a service instead
- Consider using IIS or Apache for production hosting
