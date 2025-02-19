const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 🔥 Cashfree LIVE API Keys
const CASHFREE_APP_ID = "906949a30216436dacb45dac95949609";  // 👈 Yahan apni LIVE App ID daalo
const CASHFREE_SECRET_KEY = "cfsk_ma_prod_e67aa984930fe02f49fb2a5dea6b08a5_1edc5eec"; // 👈 Yahan apna LIVE Secret Key daalo
const CASHFREE_API_URL = "https://api.cashfree.com/pg/orders";  // 👈 Production URL

// ✅ Create Order API
app.post("/create-order", async (req, res) => {
    try {
        const { amount, customer_phone } = req.body;

        const orderData = {
            order_amount: amount,
            order_currency: "INR",
            customer_details: {
                customer_phone: customer_phone
            }
        };

        const response = await axios.post(CASHFREE_API_URL, orderData, {
            headers: {
                "Content-Type": "application/json",
                "x-api-version": "2023-08-01",
                "x-client-id": CASHFREE_APP_ID,
                "x-client-secret": CASHFREE_SECRET_KEY
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.response ? error.response.data : "Server Error" });
    }
});

// ✅ Server Start
app.listen(3000, () => {
    console.log("🔥 Server running on port 3000");
});
