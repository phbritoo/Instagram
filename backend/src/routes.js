const express = require('express');
const PostController = require('../src/controllers/PostController');
const multer = require('multer');
const uploadConfig = require('../src/config/upload');
const LikeController = require('../src/controllers/LikeController');

const routes = new express.Router();

// cadastrando um objeto na variavel upload
const upload = multer(uploadConfig);

// app.get('/', (req, res) => {
//     return res.send(`Hello`);
// });
routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image') ,PostController.store);
routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;