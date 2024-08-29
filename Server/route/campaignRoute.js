const express = require('express');
const router = express.Router();

// Importing controller functions
const { createCampaign, getAllCampaigns, getCampaignById, updateCampaign, deleteCampaign } = require('../controller/campaignController');
const isAuthenticated = require('../middleware/isAuthenticated');
const permitTo = require('../middleware/permitTo');

// Define routes for handling campaigns

// Route to create a new campaign
router.route('/')
  .post(isAuthenticated, permitTo('admin'), createCampaign)  // Only admins can create campaigns
  .get(getAllCampaigns); // Public route to get all campaigns

// Route to get a single campaign by ID
router.route('/:id')
  .get(getCampaignById)  // Public route to get a campaign by ID
  .put(isAuthenticated, permitTo('admin'), updateCampaign)  
  .delete(isAuthenticated, permitTo('admin'), deleteCampaign); 
module.exports = router;
