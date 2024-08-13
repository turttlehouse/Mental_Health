import React from 'react'

const Postarticle = () => {
  return (
    <div className='flex justify-center items-center'>

            <button  onClick={()=>navigate('/addarticle')}
            className="bg-blue-500 text-center  text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Post Article
          </button>
        </div>
  )
}

export default Postarticle
