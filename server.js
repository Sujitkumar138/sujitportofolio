// Import necessary modules
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path= require('path')
// Load environment variables from .env file
dotenv.config();

// Verify that the environment variable is loaded correctly
console.log("Web3 API Key:", process.env.WEB3_FORM_API_KEY); // Should print your API key

// Rest of your code...

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
//static file access
app.use(express.static(path.join(--dirname,"./client/build")))

// Import routes
app.use("/api/v1/portfolio", require("./routes/portfolioRoute"));
app.get('*', function(req, res) {
  res.sendFile(path. join(--dirname,'/client/build/index.html'));
});


// Define port (use PORT from .env or default to 8080)
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Server Running On PORT ${PORT}`);
});
