import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const UserArticleDetails = () => {
  const { id } = useParams(); // Extracting the article ID from the URL
  const navigate = useNavigate(); // Initialize navigate function
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/articles/${id}`);
        setArticle(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the article:', error);
        setError('Error fetching the article');
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={handleGoBack}
        className="mb-4 text-blue-600 hover:text-blue-800 font-semibold"
      >
        &larr; Go Back
      </button>
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <div className="text-sm text-gray-600 mb-2">
        By {article.author.name} | {new Date(article.published_date).toLocaleDateString()}
      </div>
      {article.image && <img src={article.image} alt={article.title} className="mb-4" />}
      <div className="prose max-w-none">
        {article.content}
      </div>
      <div className="mt-8">
        <span className="text-gray-600">Status: {article.status}</span>
        <div className="text-gray-600 mt-2">Likes: {article.likes}</div>
      </div>
    </div>
  );
};

export default UserArticleDetails;
