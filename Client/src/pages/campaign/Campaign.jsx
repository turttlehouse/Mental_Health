import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/campaigns'; // Adjust the API URL accordingly

const Campaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(API_URL);
        setCampaigns(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch campaigns');
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) return <div className="text-center text-xl font-medium">Loading...</div>;
  if (error) return <div className="text-center text-xl font-medium text-red-600">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Campaigns List</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Start Date</th>
              <th className="p-4 text-left">End Date</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign._id} className="border-b hover:bg-gray-50">
                <td className="p-4">{campaign.title}</td>
                <td className="p-4">{campaign.description}</td>
                <td className="p-4">{new Date(campaign.startDate).toLocaleDateString()}</td>
                <td className="p-4">{new Date(campaign.endDate).toLocaleDateString()}</td>
                <td className="p-4">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      campaign.status === 'active'
                        ? 'bg-green-200 text-green-800'
                        : campaign.status === 'inactive'
                        ? 'bg-yellow-200 text-yellow-800'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {campaign.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Campaign;
