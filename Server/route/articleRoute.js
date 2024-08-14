const express = require('express');
const router = express.Router();

// Importing controller functions
const { createArticle, getArticles, getArticleById, likeArticle, updateArticleStatus, getAllArticlesForAdmin, getUserArticles } = require('../controller/articleController');
const isAuthenticated = require('../middleware/isAuthenticated');
const permitTo = require('../middleware/permitTo');

// Define routes for handling articles
router.route('/myarticles').get(isAuthenticated, getUserArticles);
router.route('/admin')
    .get(isAuthenticated, permitTo('admin'), getAllArticlesForAdmin); // Admin fetches all articles
// Route to create a new article
// router.post('/', createArticle);
router.route('/')
.post(isAuthenticated,permitTo('admin','user'),createArticle)
.get(getArticles)

router.route('/:id')
.get(getArticleById)

router.route('/:id/like')
  .post(likeArticle);

router.route('/:id/status')
  .put(isAuthenticated, permitTo('admin'), updateArticleStatus);

  
module.exports = router;
