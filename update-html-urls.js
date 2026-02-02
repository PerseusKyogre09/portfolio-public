const fs = require('fs');
const path = require('path');

// Load the Cloudinary URLs mapping
const cloudinaryUrls = JSON.parse(fs.readFileSync('./cloudinary-urls.json', 'utf-8'));

// Convert Windows paths to forward slashes for matching
const urlMap = {};
for (const [localPath, cloudinaryUrl] of Object.entries(cloudinaryUrls)) {
  // Store both Windows and Unix path formats
  urlMap[localPath] = cloudinaryUrl;
  urlMap[localPath.replace(/\\/g, '/')] = cloudinaryUrl;
}

console.log('🔄 Starting HTML URL replacement...\n');

let totalReplacements = 0;
let filesModified = 0;

// Find all HTML files
function findHtmlFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.')) {
      files.push(...findHtmlFiles(fullPath));
    } else if (item.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

const htmlFiles = findHtmlFiles('.');

if (htmlFiles.length === 0) {
  console.log('⚠️  No HTML files found.');
  process.exit(0);
}

console.log(`Found ${htmlFiles.length} HTML files.\n`);

for (const htmlFile of htmlFiles) {
  let content = fs.readFileSync(htmlFile, 'utf-8');
  let fileReplacements = 0;

  // Replace all local asset paths with Cloudinary URLs
  for (const [localPath, cloudinaryUrl] of Object.entries(urlMap)) {
    const escapedPath = localPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Simple pattern that matches and removes the entire ../assets/ or assets/ path
    // This will match: src="../assets/path" or src="assets/path" etc.
    const patterns = [
      // Match any quote type and optional path prefix before assets
      new RegExp(`(src=["'])(?:\\.\\./)?assets[/\\\\]${escapedPath}(["'])`, 'gi'),
      // Same for href
      new RegExp(`(href=["'])(?:\\.\\./)?assets[/\\\\]${escapedPath}(["'])`, 'gi'),
    ];

    for (const pattern of patterns) {
      if (pattern.test(content)) {
        const matches = content.match(pattern);
        if (matches) {
          fileReplacements += matches.length;
          // Simple replacement: keep the quote and opening, replace the URL, keep closing quote
          content = content.replace(pattern, `$1${cloudinaryUrl}$2`);
        }
      }
    }
  }

  if (fileReplacements > 0) {
    fs.writeFileSync(htmlFile, content, 'utf-8');
    console.log(`✅ ${htmlFile}`);
    console.log(`   Updated ${fileReplacements} image reference(s)\n`);
    filesModified++;
    totalReplacements += fileReplacements;
  }
}

console.log(`\n📊 Summary:`);
console.log(`   ✅ Files modified: ${filesModified}`);
console.log(`   🔗 Total replacements: ${totalReplacements}`);
