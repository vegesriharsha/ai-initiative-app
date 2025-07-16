// backend-service.js - Windows Service wrapper for the backend
const Service = require('node-windows').Service;
const path = require('path');

// Create a new service object for the backend
const svc = new Service({
  name: 'AI Initiative Backend',
  description: 'AI Initiative Ideas Collection - Node.js Backend Server',
  script: path.join(__dirname, 'server.js'),
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=2048'
  ],
  env: [
    {
      name: "NODE_ENV",
      value: "production"
    },
    {
      name: "PORT",
      value: "3000"
    }
  ]
});

// Handle command line arguments
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case '--install':
    installService();
    break;
  case '--uninstall':
    uninstallService();
    break;
  case '--start':
    startService();
    break;
  case '--stop':
    stopService();
    break;
  default:
    console.log('AI Initiative Backend Service Manager');
    console.log('===================================');
    console.log('Available commands:');
    console.log('  --install     Install the Windows service');
    console.log('  --uninstall   Uninstall the Windows service');
    console.log('  --start       Start the service');
    console.log('  --stop        Stop the service');
    console.log('');
    console.log('Usage: node backend-service.js [command]');
    break;
}

function installService() {
  console.log('Installing AI Initiative Backend Service...');
  
  svc.on('install', function() {
    console.log('✅ Backend service installed successfully!');
    console.log('Service Name: AI Initiative Backend');
    console.log('');
    console.log('To manage the service:');
    console.log('  Start: node backend-service.js --start');
    console.log('  Stop: node backend-service.js --stop');
    console.log('  Or use Windows Services Manager (services.msc)');
    console.log('');
    console.log('The backend API will be available at: http://localhost:3000');
  });

  svc.on('alreadyinstalled', function() {
    console.log('⚠️  Backend service is already installed.');
    console.log('To reinstall, first run: node backend-service.js --uninstall');
  });

  svc.on('error', function(err) {
    console.error('❌ Error installing backend service:', err);
  });

  svc.install();
}

function uninstallService() {
  console.log('Uninstalling AI Initiative Backend Service...');
  
  svc.on('uninstall', function() {
    console.log('✅ Backend service uninstalled successfully!');
  });

  svc.on('error', function(err) {
    console.error('❌ Error uninstalling backend service:', err);
  });

  svc.uninstall();
}

function startService() {
  console.log('Starting AI Initiative Backend Service...');
  
  svc.on('start', function() {
    console.log('✅ Backend service started successfully!');
    console.log('Backend API is running at: http://localhost:3000');
  });

  svc.on('error', function(err) {
    console.error('❌ Error starting backend service:', err);
  });

  svc.start();
}

function stopService() {
  console.log('Stopping AI Initiative Backend Service...');
  
  svc.on('stop', function() {
    console.log('✅ Backend service stopped successfully!');
  });

  svc.on('error', function(err) {
    console.error('❌ Error stopping backend service:', err);
  });

  svc.stop();
}

module.exports = svc;
