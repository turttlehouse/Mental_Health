import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const AddArticle = () => {
  const [article, setArticle] = useState({
    title: '',
    authorName: '',
    authorEmail: '',
    content: '',
    image: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({
      ...article,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const token = localStorage.getItem('token'); // Get the token from local storage

    // if (!token) {
    //   alert('You must be logged in to post an article.');
    //   // Redirect to login if not authenticated
    //   navigate('/login');
    //   return;
    // }

    if (!article.title || !article.authorName || !article.authorEmail || !article.content) {
      alert('Please fill out all required fields.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/articles',
        {
          title: article.title,
          author: {
            name: article.authorName,
            email: article.authorEmail,
          },
          content: article.content,
          image: article.image,
        },
        {
          headers: {
            // Authorization: `Bearer ${token}`, // Include the token in the headers
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 201) { // status 201 for a successful creation
        alert('Article added successfully!');
        setArticle({
          title: '',
          authorName: '',
          authorEmail: '',
          content: '',
          image: '',
        });
      } else {
        alert('Failed to add article.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-4 max-w-lg mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Add New Article</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={article.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="authorName" className="block text-sm font-medium text-gray-700">Author Name</label>
            <input
              type="text"
              id="authorName"
              name="authorName"
              value={article.authorName}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="authorEmail" className="block text-sm font-medium text-gray-700">Author Email</label>
            <input
              type="email"
              id="authorEmail"
              name="authorEmail"
              value={article.authorEmail}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              id="content"
              name="content"
              value={article.content}
              onChange={handleChange}
              rows="4"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={article.image}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add Article
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddArticle;
