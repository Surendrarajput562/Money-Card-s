const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());
app.use(cors()); // Frontend se API call ke liye

const CASHFREE_CLIENT_ID = "906949a30216436dacb45dac95949609";
const CASHFREE_SECRET_KEY = "cfsk_ma_prod_e67aa984930fe02f49fb2a5dea6b08a5_1edc5eec";
const CASHFREE_URL = "https://api.cashfree.com/pg/orders"; // Live ke liye URL change karna

app.post("/create-payment", async (req, res) => {
    try {
        const { amount, name, email, phone } = req.body;

        const response = await fetch(CASHFREE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-client-id": CASHFREE_CLIENT_ID,
                "x-client-secret": CASHFREE_SECRET_KEY,
                "x-api-version": "2022-09-01"
            },
            body: JSON.stringify({
                order_amount: amount,
                order_currency: "INR",
                customer_details: {
                    customer_id: "12345",
                    customer_name: name,
                    customer_email: email,
                    customer_phone: phone
                }
            })
        });

        const data = await response.json();
        res.json({ success: true, payment_link: data.payment_link });
    } catch (error) {
        res.status(500).json({ success: false, error: "Payment link generation failed" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
