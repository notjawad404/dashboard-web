const mongoose = require('mongoose');

const appraisalSchema = new mongoose.Schema({
    claimId: {
        type: String,
        required: true
    },
    appraisalDate: {
        type: Date,
        required: true
    },
    appraiserName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    vat: {
        type: String,
        required: true
    },
    estimatedRepair: {
        type: String,
        required: true
    },
    damageDetails: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    internalTags: [String]
});

module.exports = mongoose.model('Appraisal', appraisalSchema);