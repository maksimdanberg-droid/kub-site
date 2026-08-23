// print-structure.js — выводит структуру проекта
const fs = require('fs');
const path = require('path');

const ROOT = 'C:/Projects/kub-site';
const IGNORE = ['node_modules', '.next', '.git', 'dist', 'build', 'coverage'];

function printStructure(dir, prefix = '', isLast = true) {
  const base = path.basename(dir);
  console.log(prefix + (isLast ? '└── ' : '├── ') + base);
  
  const newPrefix = prefix + (isLast ? '    ' : '│   ');
  
  let items;
  try {
    items = fs.readdirSync(dir).filter(f => !IGNORE.includes(f));
  } catch { return; }
  
  items.forEach((item, idx) => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    const isLastItem = idx === items.length - 1;
    
    if (stat.isDirectory()) {
      printStructure(fullPath, newPrefix, isLastItem);
    } else if (item.match(/\.(tsx|ts|jsx|js)$/)) {
      console.log(newPrefix + (isLastItem ? '└── ' : '├── ') + item);
    }
  });
}

console.log('📁 kub-site');
printStructure(ROOT);