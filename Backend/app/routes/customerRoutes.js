const express = require('express');
const { getCustomer, createCustomer } = require('../controllers/customerController');

const router = express.Router();

// Route to get customer details by ID
router.get('/customer/:id', getCustomer);

// Route to create a new customer
router.post('/customer', createCustomer);

module.exports = router;
