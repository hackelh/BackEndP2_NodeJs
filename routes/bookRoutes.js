const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer');

router.post('/', auth, multer,bookController.createBook);
router.get('/', bookController.getBooks);
module.exports = router;