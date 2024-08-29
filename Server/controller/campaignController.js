const Campaign = require("../model/campaignModel");

// Create a new campaign
exports.createCampaign = async (req, res) => {
  try {
    const { title, description, startDate, endDate, status, articles, createdBy } = req.body;

    const newCampaign = new Campaign({
      title,
      description,
      startDate,
      endDate,
      status,
      articles,
      createdBy
    });

    await newCampaign.save();
    res.status(201).json(newCampaign);
  } catch (error) {
    res.status(500).json({ message: 'Error creating campaign', error });
  }
};

// Get all campaigns
exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate('articles').populate('createdBy');
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaigns', error });
  }
};

// Get a single campaign by ID
exports.getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate('articles').populate('createdBy');
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaign', error });
  }
};

// Update a campaign by ID
exports.updateCampaign = async (req, res) => {
  try {
    const updates = req.body;
    const campaign = await Campaign.findByIdAndUpdate(req.params.id, updates, { new: true }).populate('articles').populate('createdBy');
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ message: 'Error updating campaign', error });
  }
};

// Delete a campaign by ID
exports.deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.status(200).json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting campaign', error });
  }
};
