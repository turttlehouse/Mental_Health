import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaCalendarAlt, FaUser, FaComment, FaStar, FaThumbsUp } from 'react-icons/fa';


const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [liked, setLiked] = useState(false); // State to track if the user has liked the article
  const [likeCount, setLikeCount] = useState(0); // State to track the number of likes

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/articles/${id}`);
        setArticle(response.data);
        setLikeCount(response.data.likes); // Set the initial like count from the article data
        setLiked(response.data.likedByUser); // Update liked state based on whether the user has liked it
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [id]);

  const handleLike = async () => {
    if (!liked) {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/articles/${id}/like`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`, // Send the token if user is logged in
            },
          }
        );
        setLikeCount(response.data.likes); // Update like count with the response from backend
        setLiked(true); // Update local state to reflect the like
      } catch (error) {
        console.error('Error liking article:', error);
      }
    }
  };

  if (!article) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="bg-gray-100 py-6 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            {/* Full Image */}
            <div className="w-full h-full sm:h-72 lg:h-full">
              <img 
                src={article.image || 'https://via.placeholder.com/1200x600'} 
                alt={article.title} 
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div className="p-4 sm:p-8">
              {/* Article Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">{article.title}</h1>

              {/* Article Metadata */}
              <div className="flex flex-col sm:flex-row sm:justify-between text-gray-500 mb-4 sm:mb-6">
                <div className="flex items-center mb-2 sm:mb-0">
                  <FaUser className="mr-2" />
                  <span className="mr-4">By {article.author?.name || 'Unknown'}</span>
                  <FaCalendarAlt className="mr-2" />
                  <span>{new Date(article.published_date).toLocaleDateString()}</span>
                </div>
              
              </div>

              {/* Article Content */}
              <div className="text-base sm:text-lg text-gray-800 leading-relaxed mb-6">
                {article.content}
              </div>

              {/* Like Section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-6">
                <button 
                  onClick={handleLike} 
                  className={`flex items-center ${liked ? 'text-blue-500 font-bold' : 'text-gray-500'}`}
                >
                  <FaThumbsUp className="mr-2" />
                  <span>{likeCount} Likes</span>
                </button>
                <div className="flex items-center mt-4 sm:mt-0">
                  <FaComment className="mr-2" />
                  <span className="mr-4">10 Comments</span>
                  <FaStar className="mr-2" />
                  <span>4.5 Rating</span>
                </div>
              </div>

              {/* Comments Section (Placeholder) */}
              <div className="mt-6 sm:mt-10">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Comments</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">This is where user comments would go. You could integrate a commenting system like Disqus or Facebook Comments here.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleDetail;
