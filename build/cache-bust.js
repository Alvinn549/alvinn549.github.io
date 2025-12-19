const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'dist', 'index.html');

let html = fs.readFileSync(indexPath, 'utf8');

// use build timestamp as version
const stamp = Date.now().toString();

// 1. Replace CSS reference
// Regex explanation: Match 'css/styles', optionally '.min', then '.css', and optionally an existing version param
html = html.replace(
  /css\/styles(\.min)?\.css(\?v=\d+)?/g,
  `css/styles.min.css?v=${stamp}`
);

// 2. Replace JS reference
// Regex explanation: Match 'js/scripts', optionally '.min', then '.js', and optionally an existing version param
html = html.replace(
  /js\/scripts(\.min)?\.js(\?v=\d+)?/g,
  `js/scripts.min.js?v=${stamp}`
);

fs.writeFileSync(indexPath, html, 'utf8');
console.log('✅ Cache-busting and Minification applied with version:', stamp);