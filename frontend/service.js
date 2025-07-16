// service.js - Windows Service wrapper for Angular development server
const Service = require('node-windows').Service;
const path = require('path');

// Create a new service object
const svc = new Service({
  name: 'AI Initiative Frontend',
  description: 'AI Initiative Ideas Collection - Angular Development Server',
  script: path.join(__dirname, 'service-runner.js'),
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ],
  env: [
    {
      name: "NODE_ENV",
      value: "development"
    },
    {
      name: "PORT",
      value: "4200"
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
    console.log('AI Initiative Frontend Service Manager');
    console.log('=====================================');
    console.log('Available commands:');
    console.log('  --install     Install the Windows service');
    console.log('  --uninstall   Uninstall the Windows service');
    console.log('  --start       Start the service');
    console.log('  --stop        Stop the service');
    console.log('');
    console.log('Usage: node service.js [command]');
    break;
}

function installService() {
  console.log('Installing AI Initiative Frontend Service...');
  
  // Listen for the "install" event, which indicates the process is available as a service.
  svc.on('install', function() {
    console.log('✅ Service installed successfully!');
    console.log('Service Name: AI Initiative Frontend');
    console.log('');
    console.log('To manage the service:');
    console.log('  Start: node service.js --start');
    console.log('  Stop: node service.js --stop');
    console.log('  Or use Windows Services Manager (services.msc)');
    console.log('');
    console.log('The Angular dev server will be available at: http://localhost:4200');
  });

  svc.on('alreadyinstalled', function() {
    console.log('⚠️  Service is already installed.');
    console.log('To reinstall, first run: node service.js --uninstall');
  });

  svc.on('error', function(err) {
    console.error('❌ Error installing service:', err);
  });

  svc.install();
}

function uninstallService() {
  console.log('Uninstalling AI Initiative Frontend Service...');
  
  svc.on('uninstall', function() {
    console.log('✅ Service uninstalled successfully!');
  });

  svc.on('error', function(err) {
    console.error('❌ Error uninstalling service:', err);
  });

  svc.uninstall();
}

function startService() {
  console.log('Starting AI Initiative Frontend Service...');
  
  svc.on('start', function() {
    console.log('✅ Service started successfully!');
    console.log('Angular dev server is running at: http://localhost:4200');
  });

  svc.on('error', function(err) {
    console.error('❌ Error starting service:', err);
  });

  svc.start();
}

function stopService() {
  console.log('Stopping AI Initiative Frontend Service...');
  
  svc.on('stop', function() {
    console.log('✅ Service stopped successfully!');
  });

  svc.on('error', function(err) {
    console.error('❌ Error stopping service:', err);
  });

  svc.stop();
}

// Export the service for potential external use
module.exports = svc;
