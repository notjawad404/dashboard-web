const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  idCard: String,
  address: String,
  email: String,
  phone: String,
  vat: String,
  occupation: String,
  loyaltyStatus: String,
  riskProfile: String,
  creditScore: Number,
  socialMedia: {
    linkedin: String,
    facebook: String,
    twitter: String
  },
  previousInteractions: [
    {
      date: Date,
      description: String
    }
  ],
  otherPolicies: [
    {
      policyId: String,
      type: String
    }
  ]
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;