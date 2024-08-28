import React from 'react';

const Forum = () => {
  const discussions = [
    { title: "How to manage anxiety?", author: "John Doe", date: "August 25, 2024" },
    { title: "Tips for better sleep", author: "Jane Smith", date: "August 24, 2024" },
    { title: "How to stay positive during tough times?", author: "Mary Johnson", date: "August 23, 2024" },
    { title: "Coping with depression", author: "Chris Lee", date: "August 22, 2024" },
    { title: "Balancing work and mental health", author: "Sarah Connor", date: "August 21, 2024" },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Mental Health Forum</h1>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Latest Discussions</h2>
        <button className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700">Start New Discussion</button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {discussions.map((discussion, index) => (
          <div key={index} className={`p-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}`}>
            <h3 className="text-lg font-bold">{discussion.title}</h3>
            <p className="text-sm text-gray-600">by {discussion.author} on {discussion.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;
