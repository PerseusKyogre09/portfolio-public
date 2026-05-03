const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

if (!process.env.CLOUDINARY_CLOUD_NAME) {
  console.error('❌ Error: Please set environment variables:');
  console.error('   CLOUDINARY_CLOUD_NAME');
  console.error('   CLOUDINARY_API_KEY');
  console.error('   CLOUDINARY_API_SECRET');
  console.error('\nExample in PowerShell:');
  console.error('   $env:CLOUDINARY_CLOUD_NAME = "your_cloud_name"');
  console.error('   $env:CLOUDINARY_API_KEY = "your_api_key"');
  console.error('   $env:CLOUDINARY_API_SECRET = "your_api_secret"');
  process.exit(1);
}

async function uploadImages(folderPath) {
  console.log(`📁 Scanning folder: ${folderPath}\n`);
  
  const files = [];
  const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
  
  function findFiles(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        findFiles(fullPath);
      } else if (imageExtensions.test(fullPath)) {
        files.push(fullPath);
      }
    }
  }
  
  findFiles(folderPath);
  
  if (files.length === 0) {
    console.log('⚠️  No images found in the folder.');
    return;
  }
  
  console.log(`Found ${files.length} images. Starting upload...\n`);
  
  const uploadedUrls = {};
  let successCount = 0;
  let failureCount = 0;
  
  for (const file of files) {
    const relativePath = path.relative(folderPath, file);
    let folderStructure = path.dirname(relativePath).replace(/\\/g, '/');
    
    if (folderStructure === '.') {
      folderStructure = 'root';
    }
    
    try {
      const result = await cloudinary.uploader.upload(file, {
        folder: `portfolio/${folderStructure}`,
        resource_type: 'auto',
      });
      
      console.log(`✅ ${relativePath}`);
      console.log(`   URL: ${result.secure_url}\n`);
      
      uploadedUrls[relativePath] = result.secure_url;
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to upload ${relativePath}`);
      console.error(`   Error: ${error.message}\n`);
      failureCount++;
    }
  }
  
  const outputFile = path.join(folderPath, '..', 'cloudinary-urls.json');
  fs.writeFileSync(outputFile, JSON.stringify(uploadedUrls, null, 2));
  
  console.log(`\n📊 Upload Summary:`);
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${failureCount}`);
  console.log(`   📄 URLs saved to: cloudinary-urls.json`);
}

uploadImages('./assets');
