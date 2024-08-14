import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.jpg';
import userAvatar from '../assets/user.png'; // Import your user avatar image

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [isSticky, setIsSticky] = useState(false);
  const token = localStorage.getItem('token');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setUserName(storedName);
    }

    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    navigate('/');
  };

  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the window
    setDropdownOpen(!dropdownOpen);
  };

  const handleProfileclick = ()=>{
    const role = localStorage.getItem('role');
    if(role === 'admin')
    {
      navigate('/dashboard')
    }
    else{
      navigate('/profile')
    }
  }

  return (
    /* DESKTOP VIEW */
    <nav className={`bg-[#4B4F52] text-white p-4 shadow-lg z-20 ${isSticky ? 'fixed top-0 left-0 w-full transition-all duration-300' : ''}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div
          className="flex items-center space-x-2 cursor-pointer hover:text-gray-300 transition-colors duration-300"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Mental Balance Logo" className="h-12 w-12 object-cover rounded-full shadow-md" />
          <span className="text-2xl font-bold">Mental Balance</span>
        </div>
        <ul className="hidden font-semibold lg:flex space-x-5 items-center">
          {/* Add your navigation items here */}
          <li className="cursor-pointer hover:text-gray-300 transition-colors duration-300" onClick={() => navigate("/")}>Home</li>
          <li className="cursor-pointer hover:text-gray-300 transition-colors duration-300" onClick={() => navigate("/mentalhealth")}>Mental Health</li>
          <li className="cursor-pointer hover:text-gray-300 transition-colors duration-300" onClick={() => navigate("/healthyliving")}>Healthy Living</li>
          <li className="cursor-pointer hover:text-gray-300 transition-colors duration-300" onClick={() => navigate("/articles")}>Articles</li>
          <li className="cursor-pointer hover:text-gray-300 transition-colors duration-300" onClick={() => navigate("/addarticle")}>Add New Articles</li>
          <li className="cursor-pointer hover:text-gray-300 transition-colors duration-300" onClick={() => navigate("/")}>Forum</li>
          <li className="cursor-pointer hover:text-gray-300 transition-colors duration-300" onClick={() => navigate("/")}>Campaign</li>
          <li className="cursor-pointer hover:text-gray-300 transition-colors duration-300" onClick={() => navigate("/")}>Business Ads</li>
          {!token ? (
            <li className="bg-white font-semibold text-black rounded px-2 cursor-pointer hover:text-gray-600 transition-colors duration-300" onClick={() => navigate("/login")}>Login</li>
          ) : (
            <li className="relative flex items-center">
              <img src={userAvatar} alt="User Avatar" className="h-8 w-8 rounded-full mr-2" />
              <button
                className="flex items-center cursor-pointer hover:text-gray-300 transition-colors duration-300"
                onClick={toggleDropdown}
              >
                {userName || "User"}
                <svg className={`ml-2 w-4 h-4 transition-transform duration-300 ${dropdownOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {dropdownOpen && (
                <ul ref={dropdownRef} className="absolute top-full right-0 left-1 mt-2 bg-gray-600 text-white shadow-lg w-40 rounded-md z-30 transition-opacity duration-300 opacity-100">
                  <li
                    className="cursor-pointer hover:bg-gray-700 px-4 py-2 transition-colors duration-300"
                    onClick={handleProfileclick}
                  >
                    Profile
                  </li>
                  <li
                    className="cursor-pointer hover:bg-gray-700 px-4 py-2 transition-colors duration-300"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              )}
            </li>
          )}
        </ul>

        {/* Mobile Device */}
        <div className="lg:hidden flex items-center">
          <button
            className="text-white text-2xl focus:outline-none"
            onClick={() => document.getElementById('mobile-menu').classList.toggle('hidden')}
          >
            ☰
          </button>
        </div>
      </div>
      <ul id="mobile-menu" className="lg:hidden hidden flex-col font-semibold space-y-4 mt-4 bg-[#4B4F52] text-white p-4 transition-transform duration-300 transform">
        <li className="cursor-pointer hover:text-gray-300 transition-colors duration-300" onClick={() => navigate("/")}>Home</li>
        <li className="cursor-pointer hover:text-gray-300 transition-colors duration-300" onClick={() => navigate("/mentalhealth")}>Mental Health</li>
        <li className="cursor-pointer hover:text-gray-300 transition-colors duration-300" onClick={() => navigate("/healthyliving")}>Healthy Living</li>
        <li className="cursor-pointer hover:text-gray-300 transition-colors duration-300" onClick={() => navigate("/articles")}>Articles</li>
        <li className="cursor-pointer hover:text-gray-300 transition-colors duration-300" onClick={() => navigate("/addarticle")}>Add New Articles</li>
        <li className="cursor-pointer hover:text-gray-300 transition-colors duration-300" onClick={() => navigate("/")}>Forum</li>
        <li className="cursor-pointer hover:text-gray-300 transition-colors duration-300" onClick={() => navigate("/")}>Campaign</li>
        <li className="cursor-pointer hover:text-gray-300 transition-colors duration-300" onClick={() => navigate("/")}>Business Ads</li>

        {!token ? (
          <>
            {/* <li className="underline cursor-pointer hover:text-gray-300 transition-colors duration-300" onClick={() => navigate("/register")}>Register here?</li> */}
            <li className="underline cursor-pointer hover:text-gray-300 transition-colors duration-300" onClick={() => navigate("/login")}>Login </li>
            {/* <li className="bg-white font-semibold text-black rounded px-2 cursor-pointer hover:text-gray-600 transition-colors duration-300" onClick={() => navigate("/login")}>Login</li> */}

          </>
        ) : (
          <>
            <li className="relative flex items-center">
              <img src={userAvatar} alt="User Avatar" className="h-8 w-8 rounded-full mr-2" />
              <button
                className="flex items-center cursor-pointer hover:text-gray-300 transition-colors duration-300"
                onClick={toggleDropdown}
              >
                {userName || "User"}
                <svg className={`ml-2 w-4 h-4 transition-transform duration-300 ${dropdownOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {dropdownOpen && (
                <ul ref={dropdownRef} className="absolute top-full right-0 mt-2 bg-gray-400 text-white shadow-lg w-48 rounded-md z-30 transition-opacity duration-300 opacity-100">
                  <li
                    className="cursor-pointer hover:bg-gray-700 px-4 py-2 transition-colors duration-300"
                    onClick={handleProfileclick}
                  >
                    Profile
                  </li>
                  <li
                    className="cursor-pointer hover:bg-gray-700 px-4 py-2 transition-colors duration-300"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              )}
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
