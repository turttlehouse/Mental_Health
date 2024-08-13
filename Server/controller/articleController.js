const Article = require("../model/articleModel.");

const createArticle = async (req, res) => {
    try {
        const { title, author, content, image } = req.body;

        if (!title || !author || !author.name || !author.email || !content) {
            return res.status(400).json({
                message: 'Title, author name, author email, and content are required',
            });
        }

        const newArticle = new Article({
            title,
            author: {
                name: author.name,
                email: author.email,
            },
            content,
            image,
            status: 'draft' // Set the default status to 'draft'
        });

        await newArticle.save();

        res.status(201).json({
            message: 'Article created successfully',
            article: newArticle,
        });
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(500).json({
            message: 'Server error. Please try again later.',
        });
    }
};

const getArticles = async (req, res) => {
    try {
        // const articles = await Article.find({ status: 'published' }); // Fetch only published articles
        const articles = await Article.find();
        res.status(200).json(articles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({
            message: 'Server error. Please try again later.',
        });
    }
};

const getArticleById = async (req, res) => {
    try {
      const { id } = req.params;
      const article = await Article.findById(id);
  
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }
  
      res.status(200).json(article);
    } catch (error) {
      console.error('Error fetching article:', error);
      res.status(500).json({
        message: 'Server error. Please try again later.',
      });
    }
  };

  
const likeArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await Article.findById(id);

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // Increment the likes count
        article.likes += 1;
        await article.save();

        res.status(200).json({
            message: 'Article liked successfully',
            likes: article.likes,
        });
    } catch (error) {
        console.error('Error liking article:', error);
        res.status(500).json({
            message: 'Server error. Please try again later.',
        });
    }
};

module.exports = {
    createArticle,
    getArticles,
    getArticleById,
    likeArticle, 
};