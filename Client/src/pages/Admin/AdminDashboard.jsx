import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(`${API_URL}/api/articles/admin`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setArticles(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [token]);

  const handleStatusChange = async (id, status) => {
    try {
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.put(
        `${API_URL}/api/articles/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setArticles(articles.map(article => 
          article._id === id ? { ...article, status } : article
        ));
      }
    } catch (error) {
      console.error('Error updating article status:', error);
    }
  };

  const handleArticleClick = (id) => {
    navigate(`/article/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-lg text-gray-600">Loading articles...</div>
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

  return (
    <>
      <div className="bg-gray-50 py-10 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Admin Dashboard</h1>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {articles.length > 0 ? (
                articles.map((article) => (
                  <li
                    key={article._id}
                    className="relative px-6 py-8 sm:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 hover:bg-gray-50 transition duration-200"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <div
                          onClick={() => handleArticleClick(article._id)}
                          className="text-lg font-semibold text-indigo-600 truncate cursor-pointer hover:underline"
                        >
                          {article.title}
                        </div>
                        <div className="ml-2 flex-shrink-0">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            article.status === 'published' ? 'bg-green-100 text-green-800' :
                            article.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {article.status}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-gray-700">
                        {article.content.substring(0, 150)}...
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 items-start sm:items-center">
                      <button
                        onClick={() => handleArticleClick(article._id)}
                        className="text-blue-600 hover:text-blue-800 font-medium px-3 py-2 border border-blue-600 rounded-lg transition duration-200"
                      >
                        See more
                      </button>
                      <div className="flex space-x-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleStatusChange(article._id, 'published'); }}
                          className={`text-white bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg transition duration-200 ${
                            article.status === 'published' ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          disabled={article.status === 'published'}
                        >
                          Publish
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleStatusChange(article._id, 'draft'); }}
                          className={`text-white bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded-lg transition duration-200 ${
                            article.status === 'draft' ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          disabled={article.status === 'draft'}
                        >
                          Draft
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleStatusChange(article._id, 'rejected'); }}
                          className={`text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg transition duration-200 ${
                            article.status === 'rejected' ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          disabled={article.status === 'rejected'}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <div className="text-center text-gray-500 py-6">No articles available.</div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
