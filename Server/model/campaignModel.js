const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const campaignSchema = new Schema({

    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'completed'],
      default: 'inactive'
    },
    articles: [{
      type: Schema.Types.ObjectId,
      ref: 'Article' // Reference to the Article model
    }],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;  