const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'dist', 'index.html');

let html = fs.readFileSync(indexPath, 'utf8');

// use build timestamp as version
const stamp = Date.now().toString();

// replace CSS reference
html = html.replace(
  /css\/styles\.min\.css(\?v=\d+)?/g,
  `css/styles.min.css?v=${stamp}`
);

// replace JS reference
html = html.replace(
  /js\/scripts\.min\.js(\?v=\d+)?/g,
  `js/scripts.min.js?v=${stamp}`
);

fs.writeFileSync(indexPath, html, 'utf8');
console.log('✅ Cache-busting applied with version:', stamp);
