const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const wallpaperData = [];

  const wallpaperPath = path.join(__dirname, 'wallpapers');

  fs.readdirSync(wallpaperPath).forEach(category => {
    const categoryPath = path.join(wallpaperPath, category);
    const images = fs.readdirSync(categoryPath);

    images.forEach(image => {
      const imageUrl = `/wallpapers/${category}/${image}`;
      wallpaperData.push({
        imageUrl,
        category
      });
    });
  });

  res.json(wallpaperData);
});

app.use('/wallpapers', express.static(path.join(__dirname, 'wallpapers')));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
