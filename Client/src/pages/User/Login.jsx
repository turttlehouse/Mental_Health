import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext'; // Import AuthContext

const Login = () => {
  const { setIsAuthenticated } = useContext(AuthContext); // Use the context
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    console.log('API URL:', import.meta.env.VITE_API_URL);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, formData);
      const { token, role, name } = response.data;  // Updated to include name

      localStorage.setItem('token', token); // Store the token in local storage
      localStorage.setItem('role', role); // Store the role in local storage
      localStorage.setItem('name', name); // Store the name in local storage

      setIsAuthenticated(true); // Update the authentication state
      toast.success(`Welcome back, ${name}!`);

      // Redirect based on the user role
      if (role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
      toast.error('There was an error logging in. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Register
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
