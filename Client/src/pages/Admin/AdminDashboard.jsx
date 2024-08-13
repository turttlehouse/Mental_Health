import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const AdminDashboard = () => {
  const [articles, setArticles] = useState([]);
  const token = localStorage.getItem('token'); // Get the token from localStorage

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Check if token exists before making the request
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://localhost:5000/api/articles/admin', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });

        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
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
        `http://localhost:5000/api/articles/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
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

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Admin Dashboard</h1>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {articles.length > 0 ? (
                articles.map((article) => (
                  <li key={article._id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-indigo-600 truncate">
                        {article.title}
                      </div>
                      <div className="ml-2 flex-shrink-0">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          article.status === 'published' ? 'bg-green-100 text-green-800' :
                          article.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {article.status}
                        </span>
                      </div>
                      <div className="ml-4 flex-shrink-0 flex space-x-2">
                        <button
                          onClick={() => handleStatusChange(article._id, 'published')}
                          className="text-green-600 hover:text-green-900 px-2"
                          disabled={article.status === 'published'}
                        >
                          Publish
                        </button>
                        <button
                          onClick={() => handleStatusChange(article._id, 'draft')}
                          className="text-yellow-600 hover:text-yellow-900 px-2"
                          disabled={article.status === 'draft'}
                        >
                          Draft
                        </button>
                        <button
                          onClick={() => handleStatusChange(article._id, 'rejected')}
                          className="text-red-600 hover:text-red-900 px-2"
                          disabled={article.status === 'rejected'}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      {article.content.substring(0, 100)}...
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-center text-gray-500 py-6">No articles available.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
