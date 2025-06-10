// tracking-firebase-logs/index.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// Lấy các key này từ Firebase project settings
const MEASUREMENT_ID = "G-2SVTXFTHQJ";
const API_SECRET = "1234567890";

app.post("/log", async (req, res) => {
  try {
    const { eventName, params, client_id } = req.body;
    console.log("Received event:", eventName, params, client_id);
    if (!eventName || !params || !client_id) {
      return res.status(400).json({ error: "Missing eventName, params, or client_id" });
    }

    // Gửi event lên GA4 qua Measurement Protocol
    const url = `https://www.google-analytics.com/mp/collect?measureme_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`;
    const body = {
      client_id,
      events: [
        {
          name: eventName,
          params,
        },
      ],
    };

    const response = await axios.post(url, body);
    console.log(body, "response");
    console.log("GA4 response status:", response.status, response.data);

    if (response.status !== 204) { // GA4 trả về 204 No Content nếu thành công
      return res.status(500).json({ error: "Failed to log event to GA4" });
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Tracking server running on port ${PORT}`);
});