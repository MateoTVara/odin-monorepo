const { exec } = require('node:child_process');
const { argv, exit } = require('node:process');
const path = require('node:path');

if (argv.includes('--help') || argv.includes('-h')) {
    console.log(`
    Usage: node mycommit.cjs

    This script creates a 'temps' directory in the project root and saves:
    - Staged git changes to 'temps/staged.diff'
    - Git commit log to 'temps/commits.log'
    - Project directory tree to 'temps/project_tree.log'

    Make sure to add 'temps/' to your .gitignore to avoid committing these files.
    `);
    exit(0);
}

const rootDir = path.resolve(__dirname, '..');

const mycommit = () => {
    try {
        console.log('Creating temps and saving git info...');
        exec(`mkdir -p ${path.join(rootDir, 'temps')}`);
        exec(`git diff --staged > ${path.join(rootDir, 'temps', 'staged.diff')}`);
        exec(`git log > ${path.join(rootDir, 'temps', 'commits.log')}`);
        exec(`node ${path.join(rootDir, 'scripts', 'printDirTree.cjs')} > ${path.join(rootDir, 'temps', 'project_tree.log')}`);
        console.log('Temps created in temps/ directory.');
    } catch (error) {
        console.error('Error creating temps:', error);
    }
}

mycommit();