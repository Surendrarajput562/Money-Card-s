const express = require("express");
const cors = require("cors");
const axios = require("axios");


const app = express();
app.use(express.json());
app.use(cors());  // CORS enable kar diya

// ✅ Cashfree Payment Link Generate API
app.post("/create-payment", async (req, res) => {
    try {
        const { amount, name, email, phone } = req.body;

        if (!amount || !name || !email || !phone) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }

        // ✅ Cashfree API Credentials
        const APP_ID = "906949a30216436dacb45dac95949609";
        const SECRET_KEY = "cfsk_ma_prod_e67aa984930fe02f49fb2a5dea6b08a5_1edc5eec";
        const MODE = "PROD"; // "PROD" for live

        // ✅ Cashfree Payment Request Data
        const requestData = {
            customer_details: {
                customer_id: phone,
                customer_name: name,
                customer_email: email,
                customer_phone: phone
            },
            order_id: `ORDER_${Date.now()}`,
            order_amount: amount,
            order_currency: "INR",
            order_note: "Test Payment",
            order_meta: {
                return_url: "https://moneycard-8f457.web.app/success"
            }
        };

        // ✅ Cashfree API Call
        const response = await axios.post(
            `https://api.cashfree.com/pg/orders`,
            requestData,
            {
                headers: {
                    "x-client-id": APP_ID,
                    "x-client-secret": SECRET_KEY,
                    "Content-Type": "application/json"
                }
            }
        );

        // ✅ Payment Link Generate
        if (response.data && response.data.payment_link) {
            return res.json({ success: true, payment_link: response.data.payment_link });
        } else {
            return res.status(500).json({ success: false, message: "Failed to generate payment link" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});

// ✅ Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
