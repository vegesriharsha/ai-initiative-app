// service-runner.js - The actual script that runs as a Windows service
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configuration
const LOG_FILE = path.join(__dirname, 'service.log');
const PROJECT_DIR = __dirname;

// Logging function
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  
  // Write to log file
  fs.appendFileSync(LOG_FILE, logMessage);
  
  // Also write to console for debugging
  console.log(logMessage.trim());
}

// Main service function
function startAngularService() {
  log('AI Initiative Frontend Service Starting...');
  log(`Working directory: ${PROJECT_DIR}`);
  
  // Check if node_modules exists
  const nodeModulesPath = path.join(PROJECT_DIR, 'node_modules');
  if (!fs.existsSync(nodeModulesPath)) {
    log('ERROR: node_modules not found. Please run npm install first.');
    process.exit(1);
  }

  // Check if Angular CLI is available
  const ngPath = path.join(PROJECT_DIR, 'node_modules', '.bin', 'ng.cmd');
  if (!fs.existsSync(ngPath)) {
    log('ERROR: Angular CLI not found. Please install @angular/cli.');
    process.exit(1);
  }

  // Start the Angular development server
  log('Starting Angular development server...');
  
  const ngServe = spawn('npm', ['start'], {
    cwd: PROJECT_DIR,
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true
  });

  // Handle stdout
  ngServe.stdout.on('data', (data) => {
    const output = data.toString().trim();
    if (output) {
      log(`STDOUT: ${output}`);
    }
  });

  // Handle stderr
  ngServe.stderr.on('data', (data) => {
    const output = data.toString().trim();
    if (output) {
      log(`STDERR: ${output}`);
    }
  });

  // Handle process close
  ngServe.on('close', (code) => {
    log(`Angular development server exited with code ${code}`);
    if (code !== 0) {
      log('Restarting Angular development server in 5 seconds...');
      setTimeout(startAngularService, 5000);
    }
  });

  // Handle process error
  ngServe.on('error', (error) => {
    log(`ERROR: Failed to start Angular development server: ${error.message}`);
    log('Retrying in 10 seconds...');
    setTimeout(startAngularService, 10000);
  });

  // Handle service shutdown
  process.on('SIGINT', () => {
    log('Service shutdown requested...');
    ngServe.kill('SIGTERM');
    setTimeout(() => {
      ngServe.kill('SIGKILL');
      process.exit(0);
    }, 5000);
  });

  process.on('SIGTERM', () => {
    log('Service termination requested...');
    ngServe.kill('SIGTERM');
    setTimeout(() => {
      ngServe.kill('SIGKILL');
      process.exit(0);
    }, 5000);
  });

  log('Angular service runner initialized successfully');
}

// Start the service
startAngularService();
