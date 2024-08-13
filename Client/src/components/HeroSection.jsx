import React from 'react';
import bg from '../assets/image.png'; // Import your background image

const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center text-white min-h-screen flex items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-75 z-0"></div>
      <div className="relative container mx-auto px-6 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-6xl font-extrabold mb-6 leading-tight">
            Discover the Power of Mental Balance
          </h1>
          <p className="text-2xl mb-8">
            Explore insightful articles, expert tips, and resources to enhance your mental well-being and live a balanced life.
          </p>
          <button
            className="bg-[#4B4F52] text-white font-semibold py-3 px-8 rounded-full hover:bg-gray-700 transition duration-300 shadow-lg"
            onClick={() => window.scrollTo({ top: document.getElementById('content').offsetTop, behavior: 'smooth' })}
          >
            Start Reading
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
