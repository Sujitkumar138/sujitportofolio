const axios = require('axios');

const sendEmailController = async (req, res) => {
  try {
    const { name, email, msg } = req.body;

    // Check if the environment variable is loaded correctly
    console.log('Web3 API Key:', process.env.WEB3_FORM_API_KEY); // This should print the API key

    // Validation
    if (!name || !email || !msg) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields.",
      });
    }

    // Web3 Forms API endpoint
    const url = "https://api.web3forms.com/submit";

    // Prepare data to send in the request
    const data = {
      name,
      email,
      message: msg,
      access_key: process.env.WEB3_FORM_API_KEY, // Use your Web3 Forms API key
    };

    // Send email using Web3 Forms API
    const response = await axios.post(url, data);

    // Log the response from Web3 Forms API to see if it succeeds or fails
    console.log('Web3 Forms API Response:', response.data);

    // Check response and send appropriate response to client
    if (response.data.success) {
      return res.status(200).send({
        success: true,
        message: "Your message has been sent successfully.",
      });
    } else {
      // If the response is not successful, log the error details
      return res.status(500).send({
        success: false,
        message: "There was an error sending your message.",
        error: response.data, // Include error details from Web3 Forms API response
      });
    }
  } catch (error) {
    // Log any unexpected errors
    console.error('Error sending email:', error);
    return res.status(500).send({
      success: false,
      message: "Email sending failed.",
      error,
    });
  }
};

module.exports = { sendEmailController };
