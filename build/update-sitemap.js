const fs = require("fs");
const path = require("path");

// The file inside src
const srcFile = path.join(__dirname, "../src/sitemap.xml");
// Output file inside dist
const distFile = path.join(__dirname, "../dist/sitemap.xml");

// Format today's date YYYY-MM-DD
const today = new Date().toISOString().split("T")[0];

// Read sitemap from /src
let xml = fs.readFileSync(srcFile, "utf8");

// Replace ALL lastmod tags (<lastmod>...</lastmod>)
xml = xml.replace(/<lastmod>.*?<\/lastmod>/g, `<lastmod>${today}</lastmod>`);

// Write into dist
fs.writeFileSync(distFile, xml);
console.log(`📄 sitemap updated → lastmod = ${today}`);
