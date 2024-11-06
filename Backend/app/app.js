// app/app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

const leakageRoutes = require("./routes/leakageRoutes");
const auditRoutes = require("./routes/auditRoutes");
const claimRoutes = require("./routes/claimRoutes");
const policyRoutes = require('./routes/policyRoutes');
const customerRoutes = require("./routes/customerRoutes");
const appraisalRoutes = require("./routes/appraisalRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
// app.use(cors()); // Enable CORS for all routes
app.use(cors({
  origin: '*', // Allow requests from all origins
  methods: ['GET', 'POST','PUT','PATCH', 'DELETE' , 'OPTIONS'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type'], // Allow specific headers
}));
app.use(bodyParser.json());

// Routes 
app.use("/api", leakageRoutes);
app.use("/api", auditRoutes);
app.use("/api", claimRoutes);
app.use("/api", policyRoutes);
app.use("/api", customerRoutes);
app.use("/api", appraisalRoutes);

// Starting the server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
