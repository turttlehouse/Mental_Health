import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaArrowUp } from 'react-icons/fa';
import logo from '../assets/Logo.jpg';

const Footer = () => {
  const navigate = useNavigate();

  // Function to scroll to the top of the page slowly
  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth'
  //   });
  // };

  // Function to scroll to the top of the page slowly
  const scrollToTop = () => {
    const scrollStep = -window.scrollY / 100; 
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15); 
  };


  return (
    <footer className="bg-[#4B4F52] text-white py-10 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          {/* Logo and Description */}
          <div className="mb-6 lg:mb-0 flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
            <img src={logo} alt="Mental Balance Logo" className="h-12 w-12 object-cover rounded-full shadow-md" />
            <span className="text-2xl font-bold">Mental Balance</span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 items-center">
            <span
              className="cursor-pointer hover:text-gray-300 transition-colors duration-300"
              onClick={() => navigate("/mentalhealth")}
            >
              Mental Health
            </span>
            <span
              className="cursor-pointer hover:text-gray-300 transition-colors duration-300"
              onClick={() => navigate("/healthyliving")}
            >
              Healthy Living
            </span>
            <span
              className="cursor-pointer hover:text-gray-300 transition-colors duration-300"
              onClick={() => navigate("/articles")}
            >
              Articles
            </span>
            <span
              className="cursor-pointer hover:text-gray-300 transition-colors duration-300"
              onClick={() => navigate("/addarticle")}
            >
              Add New Articles
            </span>
            <span
              className="cursor-pointer hover:text-gray-300 transition-colors duration-300"
              onClick={() => navigate("/forum")}
            >
              Forum
            </span>
            <span
              className="cursor-pointer hover:text-gray-300 transition-colors duration-300"
              onClick={() => navigate("/campaign")}
            >
              Campaign
            </span>
            <span
              className="cursor-pointer hover:text-gray-300 transition-colors duration-300"
              onClick={() => navigate("/ads")}
            >
              Business Ads
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-500 my-6"></div>

        {/* Contact Information and Social Media Links */}
        <div className="flex flex-col lg:flex-row justify-between items-center">
          {/* Contact Info */}
          <div className="text-center lg:text-left">
            <p>&copy; 2024 Mental Balance. All rights reserved.</p>
            <p>Contact: info@mentalbalance.com</p>
          </div>

          {/* Social Media Links */}
          <div className="mt-4 lg:mt-0 flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <FaFacebookF className="text-2xl" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <FaTwitter className="text-2xl" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <FaInstagram className="text-2xl" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <FaLinkedinIn className="text-2xl" />
            </a>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="absolute bottom-4 right-4 bg-blue-800 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition-colors duration-300"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-2xl" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
