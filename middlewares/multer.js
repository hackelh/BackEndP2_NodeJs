const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Middleware multer.diskStorage qui permet d'uploader une image, en modifiant son nom
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    req.body.imageUrl = 'htpp://localhost:3000/images'+name + Date.now() + '.' + extension;
    callback(null, name + Date.now() + '.' + extension);
  }
});
module.exports = multer({ storage }).single('image');