const fs = require('node:fs');
const path = require('node:path');
const { argv, exit } = require('node:process');

if (argv.includes('--help') || argv.includes('-h')) {
    console.log(`
    Usage: node printDirTree.cjs

    This script prints the directory tree of the project, excluding 'node_modules' and '.git' directories.
    `);
    exit(0);
}

const rootPath = path.resolve(__dirname, '..');
const EXCLUDED_DIRS = new Set(['node_modules', '.git']);

let projectName;
try {
    const pkg = JSON.parse(fs.readFileSync(path.join(rootPath, 'package.json'), 'utf8'));
    projectName = pkg.name || path.basename(rootPath);
} catch {
    projectName = path.basename(rootPath);
}

const printDirTree = (dir, prefix = '') => {
    const items = fs.readdirSync(dir, { withFileTypes: true })
        .filter(item => !EXCLUDED_DIRS.has(item.name))
        .sort((a, b) => a.name.localeCompare(b.name));

    const dirs = items.filter(i => i.isDirectory());
    const files = items.filter(i => !i.isDirectory());
    const ordered = [...dirs, ...files];

    ordered.forEach((item, index) => {
        const isLast = index === ordered.length - 1;
        const pointer = isLast ? '└── ' : '├── ';
        console.log(prefix + pointer + item.name);

        if (item.isDirectory()) {
            const newPrefix = prefix + (isLast ? '    ' : '│   ');
            printDirTree(path.join(dir, item.name), newPrefix);
        }
    });
}

console.log(projectName);
printDirTree(rootPath);