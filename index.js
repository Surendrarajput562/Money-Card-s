const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const CASHFREE_CLIENT_ID = "906949a30216436dacb45dac95949609";
const CASHFREE_CLIENT_SECRET = "cfsk_ma_prod_e67aa984930fe02f49fb2a5dea6b08a5_1edc5eec";

app.post("/create-order", async (req, res) => {
    try {
        const { amount, currency, customer_id, customer_email, customer_phone } = req.body;

        const response = await axios.post("https://api.cashfree.com/pg/orders", {
            order_amount: amount,
            order_currency: currency,
            customer_details: {
                customer_id: customer_id,
                customer_email: customer_email,
                customer_phone: customer_phone
            }
        }, {
            headers: {
                "Content-Type": "application/json",
                "x-client-id": CASHFREE_CLIENT_ID,
                "x-client-secret": CASHFREE_CLIENT_SECRET
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.response.data });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
