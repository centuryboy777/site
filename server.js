require('dotenv').config();
const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(express.json());

// ENHANCED CORS: Allow all origins including 'null' for file:// access
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl) or null (file://)
        if (!origin || origin === 'null') return callback(null, true);
        return callback(null, true);
    },
    credentials: true
}));

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(__dirname));

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_PUBLIC_KEY = process.env.PAYSTACK_PUBLIC_KEY;

if (!PAYSTACK_SECRET_KEY || PAYSTACK_SECRET_KEY.length < 10) {
    console.error("FATAL ERROR: PAYSTACK_SECRET_KEY is missing or invalid in .env!");
}

// EMAIL SETUP (Optional but recommended)
let transporter;
try {
    const nodemailer = require('nodemailer');
    transporter = nodemailer.createTransport({
        service: 'gmail', // or your SMTP provider
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
} catch (e) {
    console.warn("Nodemailer not installed or configured. Emails will be skipped.");
}

async function sendReceiptEmail(to, orderData) {
    if (!transporter || !process.env.EMAIL_USER) return;

    const mailOptions = {
        from: `"Centuryboy's Hub" <${process.env.EMAIL_USER}>`,
        to: to,
        subject: `Your Receipt from Centuryboy's Hub - ${orderData.reference}`,
        html: `
            <h1>Thank you for your purchase!</h1>
            <p>We've received your payment of <b>GHS ${orderData.amount / 100}</b>.</p>
            <p><b>Order Reference:</b> ${orderData.reference}</p>
            <p>Your order is now being processed and will be delivered shortly.</p>
            <br>
            <p>Best regards,<br>Centuryboy's Hub Team</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Receipt email sent to:", to);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

// 0. CONFIG / INITIALIZE ENDPOINT
app.get('/paystack/initialize', (req, res) => {
    res.json({
        publicKey: PAYSTACK_PUBLIC_KEY,
        currency: 'GHS'
    });
});

// Alias for old /config path (backward compatibility)
app.get('/config', (req, res) => res.redirect('/paystack/initialize'));

// HEALTH CHECK
app.get('/health', (req, res) => res.status(200).send('OK'));

// 1. VERIFY TRANSACTION ENDPOINT
app.post('/paystack/verify', async (req, res) => {
    const reference = req.body.reference?.trim(); // Trim whitespace

    if (!reference) {
        console.error("Verification Request Error: No reference provided");
        return res.status(400).json({ success: false, message: "No reference provided" });
    }

    console.log(`Attempting to verify transaction: ${reference}...`);

    try {
        const response = await axios.get(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                'Cache-Control': 'no-cache'
            }
        });

        const { status, data } = response.data;

        if (status && data.status === 'success') {
            console.log(`Payment Verified Successfully: ${reference} (GHS ${data.amount / 100})`);
            // SUCCESS: Transaction is valid. 

            // Send Email Receipt
            if (data.customer && data.customer.email) {
                sendReceiptEmail(data.customer.email, data).catch(console.error);
            }

            return res.json({
                success: true,
                message: "Payment verified successfully",
                data: data
            });
        }

        console.warn(`Payment Verification Failed for ${reference}:`, data.status);
        return res.status(400).json({ success: false, message: "Payment verification failed: " + data.status });

    } catch (error) {
        const errorData = error.response?.data || error.message;
        console.error("Paystack API Error:", errorData);
        res.status(500).json({
            success: false,
            message: "Internal server error during verification",
            detail: errorData.message || "Unknown error"
        });
    }
});

// 2. WEBHOOK ENDPOINT
// Paystack will send POST requests here for major events (e.g. charge.success)
// This ensures you get paid even if the user closes their browser
app.post('/webhook', (req, res) => {
    // Validate the event origin (security best practice)
    const hash = crypto.createHmac('sha512', PAYSTACK_SECRET_KEY)
        .update(JSON.stringify(req.body))
        .digest('hex');

    if (hash !== req.headers['x-paystack-signature']) {
        return res.status(401).send('Invalid signature');
    }

    const event = req.body;
    console.log("Paystack Webhook Received:", event.event);

    if (event.event === 'charge.success') {
        // Handle successful payment
        const { reference, customer, amount } = event.data;
        console.log(`Payment confirmed for customer ${customer.email}. Ref: ${reference}, Amount: ${amount}`);

        // Update your order records here
    }

    // Always respond with 200 OK to Paystack
    res.sendStatus(200);
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Centuryboy's Hub Server is LIVE on port ${PORT}`);
    });
}

module.exports = app;
