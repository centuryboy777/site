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

// HEALTH CHECK
app.get('/health', (req, res) => res.status(200).send('OK'));

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Centuryboy's Hub Server is LIVE on port ${PORT}`);
    });
}

module.exports = app;
