import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.jpg';
import userAvatar from '../assets/user.png'; // Import your user avatar image

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [isSticky, setIsSticky] = useState(false); // State for sticky navbar
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Code to run when component mounts or updates
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setUserName(storedName);
    }

    const handleScroll = () => {
      if (window.scrollY > 450) { // Change 100 to your desired scroll point
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    // sets up a scroll event listener when the component mounts.
    // This listener checks the scroll position to update the navbar’s sticky state.
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup function to remove event listener 
    // if the user navigates from a page that contains your Navbar component to
    // a different page, the Navbar component will unmount.

    return () => {
       // Code to run when component unmounts
       //useEffect hook is removed from the DOM due to navigation, conditional rendering,
       // or other changes in the component tree.
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  //runs the effect code when the component mounts and whenever dependencies change 
  //(Dependency array is empty, so it runs once on mount and once on unmount).

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className={`bg-blue-800 text-white p-4 shadow-lg z-20 ${isSticky ? 'fixed top-0 left-0 w-full' : ''}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div
          className="flex items-center space-x-2 cursor-pointer hover:text-gray-300"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Mental Balance Logo" className="h-12 w-12 object-cover" />
          <span className="text-xl font-bold">Mental Balance</span>
        </div>
        <ul className="hidden lg:flex space-x-6 items-center">
          <li className="cursor-pointer hover:text-gray-300" onClick={() => navigate("/")}>Home</li>
          <li className="cursor-pointer hover:text-gray-300" onClick={() => navigate("/mentalhealth")}>Mental Health</li>
          <li className="cursor-pointer hover:text-gray-300" onClick={() => navigate("/healthyliving")}>Healthy Living</li>
          <li className="cursor-pointer hover:text-gray-300" onClick={() => navigate("/articles")}>Articles</li>
          <li className="cursor-pointer hover:text-gray-300" onClick={() => navigate("/addarticle")}>Add New Articles</li>
          <li className="cursor-pointer hover:text-gray-300" onClick={() => navigate("/forum")}>Forum</li>
          <li className="cursor-pointer hover:text-gray-300" onClick={() => navigate("/events")}>Campaign</li>
          <li className="cursor-pointer hover:text-gray-300" onClick={() => navigate("/resources")}>Business Ads</li>
          
          {!token ? (
            <>
              <li
                className="underline cursor-pointer hover:text-gray-300"
                onClick={() => navigate("/login")}
              >
                Login
              </li>
            </>
          ) : (
            <>
              <li className="relative flex items-center">
                <img src={userAvatar} alt="User Avatar" className="h-8 w-8 rounded-full mr-2" /> {/* User Avatar */}
                <button
                  className="cursor-pointer hover:text-gray-300"
                  onClick={toggleDropdown}
                >
                  {userName || "User"} {/* Display user name or 'User' if name is not available */}
                </button>
                {dropdownOpen && (
                  <ul className="absolute right-0 mt-2 bg-blue-900 text-white shadow-lg w-48 rounded-md z-30">
                    <li
                      className="cursor-pointer hover:text-gray-300 px-4 py-2"
                      onClick={() => navigate("/user-profile")}
                    >
                      Profile
                    </li>
                    <li
                      className="cursor-pointer hover:text-gray-300 px-4 py-2"
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

        <div className="lg:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => document.getElementById('mobile-menu').classList.toggle('hidden')}
          >
            ☰
          </button>
        </div>
      </div>
      <ul id="mobile-menu" className="lg:hidden hidden flex-col space-y-4 mt-4 bg-blue-800 text-white p-4">
        <li className="cursor-pointer hover:text-gray-300" onClick={() => navigate("/")}>Home</li>
        <li className="cursor-pointer hover:text-gray-300" onClick={() => navigate("/mental-health")}>Mental Health</li>
        <li className="cursor-pointer hover:text-gray-300" onClick={() => navigate("/healthy-living")}>Healthy Living</li>
        <li className="cursor-pointer hover:text-gray-300" onClick={() => navigate("/blog")}>Blog</li>
        <li className="cursor-pointer hover:text-gray-300" onClick={() => navigate("/forum")}>Forum</li>
        <li className="cursor-pointer hover:text-gray-300" onClick={() => navigate("/events")}>Events</li>
        <li className="cursor-pointer hover:text-gray-300" onClick={() => navigate("/resources")}>Resources</li>
        <li className="cursor-pointer hover:text-gray-300" onClick={() => navigate("/about")}>About Us</li>
        <li className="cursor-pointer hover:text-gray-300" onClick={() => navigate("/contact")}>Contact Us</li>

        {!token ? (
          <>
            <li
              className="underline cursor-pointer hover:text-gray-300"
              onClick={() => navigate("/register")}
            >
              Register here?
            </li>
            <li
              className="underline cursor-pointer hover:text-gray-300"
              onClick={() => navigate("/login")}
            >
              Login
            </li>
          </>
        ) : (
          <>
            <li className="relative flex items-center">
              <img src={userAvatar} alt="User Avatar" className="h-8 w-8 rounded-full mr-2" /> {/* User Avatar */}
              <button
                className="cursor-pointer hover:text-gray-300"
                onClick={toggleDropdown}
              >
                {userName || "User"} {/* Display user name or 'User' if name is not available */}
              </button>
              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 bg-blue-900 text-white shadow-lg w-48 rounded-md z-30">
                  <li
                    className="cursor-pointer hover:text-gray-300 px-4 py-2"
                    onClick={() => navigate("/user-profile")}
                  >
                    Profile
                  </li>
                  <li
                    className="cursor-pointer hover:text-gray-300 px-4 py-2"
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
