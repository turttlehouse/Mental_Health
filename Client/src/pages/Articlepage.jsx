import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Articlepage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Articles</h1>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.length > 0 ? (
              articles.map((article) => (
                <Link to={`/articles/${article._id}`} key={article._id}>
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img src={article.image || 'https://via.placeholder.com/300'} alt={article.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{article.title}</h2>
                      <p className="text-gray-600 mb-4">{article.content.substring(0, 100)}...</p>
                      <div className="flex items-center">
                        <div className="text-sm text-gray-500">
                          <span className="font-medium text-gray-900">By {article.author.name}</span> <br />
                          <span>{new Date(article.published_date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p>No articles available.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Articlepage;
