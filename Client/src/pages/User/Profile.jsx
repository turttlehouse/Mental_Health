import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const fetchUserArticles = async () => {
      try {
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/articles/myarticles`, {
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

    fetchUserArticles();
  }, [token]);

  const handleSeeMore = (id) => {
    navigate(`/userarticles/${id}`); // Navigate to the detailed article view
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-lg text-gray-600">Loading your articles...</div>
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
      <Navbar />
      <div className="bg-gray-50 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8">Your Articles</h1>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {articles.length > 0 ? (
                articles.map((article) => (
                  <li
                    key={article._id}
                    className="relative px-4 py-6 sm:px-6 flex flex-col sm:flex-row justify-between items-start border-b border-gray-200"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-semibold text-indigo-600 truncate">
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
                    <div className="mt-4 sm:mt-0 sm:ml-4 flex items-center space-x-2">
                      <button
                        onClick={() => handleSeeMore(article._id)}
                        className="text-blue-600 hover:text-blue-800 font-medium px-4 py-2 border border-blue-600 rounded-lg transition duration-200"
                      >
                        See More
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <div className="text-center text-gray-500 py-6">You haven't posted any articles yet.</div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
