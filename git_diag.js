const { exec } = require('child_process');
const fs = require('fs');

const log = (msg) => fs.appendFileSync('git_diag_output.txt', msg + '\n');

log('Starting diagnostics...');

exec('git --version', (error, stdout, stderr) => {
  if (error) {
    log(`Git check failed: ${error.message}`);
    return;
  }
  log(`Git version stdout: ${stdout}`);
  log(`Git version stderr: ${stderr}`);
  
  // Try init
  exec('git init', (error, stdout, stderr) => {
      if (error) {
          log(`Git init failed: ${error.message}`);
      } else {
          log(`Git init stdout: ${stdout}`);
          log(`Git init stderr: ${stderr}`);
      }
  });
});
