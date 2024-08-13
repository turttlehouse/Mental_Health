const express = require('express');
const router = express.Router();

// Importing controller functions
const { createArticle, getArticles, getArticleById, likeArticle } = require('../controller/articleController');
const isAuthenticated = require('../middleware/isAuthenticated');
const permitTo = require('../middleware/permitTo');

// Define routes for handling articles

// Route to create a new article
// router.post('/', createArticle);
router.route('/')
.post(isAuthenticated,permitTo('admin','user'),createArticle)
.get(getArticles)

router.route('/:id')
.get(getArticleById)

router.route('/:id/like')
  .post(likeArticle);

module.exports = router;
