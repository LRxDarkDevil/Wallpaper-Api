const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const baseImageUrl = 'https://raw.githubusercontent.com/LRxDarkDevil/Wallpaper-Api/main/wallpapers';

app.get('/wallpapers', (req, res) => {
  const wallpaperData = {};
  const wallpaperPath = path.join(__dirname, 'wallpapers');

  const categories = fs.readdirSync(wallpaperPath);

  categories.forEach(category => {
    const categoryPath = path.join(wallpaperPath, category);
    const images = fs.readdirSync(categoryPath);
    
    wallpaperData[category] = images.map(image => `${baseImageUrl}/${category}/${encodeURIComponent(image)}`);
  });

  // Create a category "all" that contains all images from all categories
  const allImages = [];
  categories.forEach(category => {
    allImages.push(...wallpaperData[category]);
  });
  wallpaperData['all'] = allImages;
  wallpaperData["categories"] = categories;
  res.json(wallpaperData);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
