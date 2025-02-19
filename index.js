const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// **Cashfree API Keys (Production)**
const APP_ID = "906949a30216436dacb45dac95949609";  // Cashfree se le
const SECRET_KEY = "cfsk_ma_prod_e67aa984930fe02f49fb2a5dea6b08a5_1edc5eec"; // Cashfree se le
const API_URL = "https://api.cashfree.com/pg/orders"; // Production URL

// **Route: Create Order & Get Payment Page**
app.post("/create-order", async (req, res) => {
    try {
        const { amount, customer_phone } = req.body;

        const orderData = {
            order_amount: amount,
            order_currency: "INR",
            customer_details: {
                customer_id: "user_" + Date.now(),
                customer_phone,
            }
        };

        const response = await axios.post(API_URL, orderData, {
            headers: {
                "Content-Type": "application/json",
                "x-api-version": "2023-08-01",
                "x-client-id": APP_ID,
                "x-client-secret": SECRET_KEY
            }
        });

        res.json({ payment_link: response.data.payment_link });
    } catch (error) {
        console.error("Cashfree Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Payment creation failed" });
    }
});

// **Start Server**
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
