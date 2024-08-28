import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';

const AdminArticleDetails = () => {
  const { id } = useParams(); // Get the article ID from the URL
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/articles/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setArticle(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-lg text-gray-600">Loading article details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-lg text-gray-600">Article not found</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8">
            Article Details
          </h1>
           {/* Full Image */}
           <div className="w-full h-full sm:h-72 lg:h-full">
              <img 
                src={article.image || 'https://via.placeholder.com/1200x600'} 
                alt={article.title} 
                className="w-full h-auto object-cover"
              />
            </div>
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-4">
              {article.title}
            </h2>
            <div className="text-gray-600 mb-4">
              <span className="font-semibold">Status: </span>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  article.status === 'published' ? 'bg-green-100 text-green-800' :
                  article.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}
              >
                {article.status}
              </span>
            </div>
            {/* Article Metadata */}
            <div className="flex flex-col sm:flex-row sm:justify-between text-gray-500 mb-4 sm:mb-6">
                <div className="flex items-center mb-2 sm:mb-0">
                  <FaUser className="mr-2" />
                  <span className="mr-4">By {article.author?.name || 'Unknown'}</span>
                  <FaCalendarAlt className="mr-2" />
                  <span>{new Date(article.published_date).toLocaleDateString()}</span>
                </div>
              
              </div>
            <div className="text-gray-700 mb-6">
              <p>{article.content}</p>
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => navigate(-1)} // Go back to the previous page
                className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2 rounded-lg transition duration-200"
              >
                Back
              </button>
              {/* <button
                onClick={() => navigate(`/admin/articles/${id}/edit`)} // Navigate to the edit page (if exists)
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-200"
              >
                Edit Article
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminArticleDetails;
