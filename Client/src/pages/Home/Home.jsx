import React, { useEffect, useState } from 'react'
// import Navbar from '../../components/Navbar'
// import Footer from '../../components/Footer'
import HeroSection from '../../components/HeroSection'
import Article from '../../components/Article'
import ReviewBoard from '../../components/ReviewBoard'
import { useNavigate } from 'react-router-dom'


const Home = () => {

  const navigate = useNavigate();


  return (

    <div>

        {/* <Navbar/> */}
        <HeroSection/>
        <Article/>
        <div className='flex justify-center items-center'>

            <button  onClick={()=>navigate('/addarticle')}
            className="bg-blue-500 text-center  text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Post Article
          </button>
        </div>
        <ReviewBoard/>
        {/* <Footer/> */}

    </div>
  )
}

export default Home