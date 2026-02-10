const { exec } = require('child_process');

const commands = [
    'git remote remove origin', // Remove if exists
    'git remote add origin https://github.com/RickBillie-pixel/renovawrap-website.git',
    'git add .',
    'git commit -m "Auto-commit by agent"',
    'git branch -M main',
    'git push -u origin main'
];

function runNextCommand(index) {
    if (index >= commands.length) {
        console.log('All commands executed successfully.');
        return;
    }

    const cmd = commands[index];
    console.log(`Executing: ${cmd}`);

    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            // Ignore error for remove remote if it doesn't exist
            if (cmd.includes('remote remove') && (stderr.includes('No such remote') || error.code === 128 || error.code === 2)) {
                console.log('Remote remove skipped/failed harmlessly.');
            } else if (cmd.includes('commit') && (stdout.includes('nothing to commit') || stderr.includes('nothing to commit'))) {
                console.log('Nothing to commit, proceeding...');
            } else {
                console.error(`Error executing ${cmd}:`, error);
                console.error(`Stderr: ${stderr}`);
                return; // Stop on error
            }
        }
        if (stdout) console.log(`Stdout: ${stdout}`);
        if (stderr) console.error(`Stderr: ${stderr}`);

        runNextCommand(index + 1);
    });
}

runNextCommand(0);
