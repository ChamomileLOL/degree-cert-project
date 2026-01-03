// server/index.js - THE RESILIENT ARTIFACT
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const redis = require('redis');
require('dotenv').config(); 

const Student = require('./models/Student'); 

// --- 1. SETUP REDIS (FAULT TOLERANT) ---
const client = redis.createClient();
let isRedisActive = false; // Flag to track connection status

(async () => {
    try {
        await client.connect();
        isRedisActive = true;
        console.log("✅ Redis Client Connected (The Shield is Active)");
    } catch (err) {
        console.log("⚠️  Redis Not Found. Running in 'Database-Only' Mode.");
        console.log("   (To fix: Install Redis on your machine to enable caching)");
    }
})();

client.on('error', (err) => {
    // Suppress crash errors if Redis dies
    if (isRedisActive) console.log('❌ Redis Client Error', err);
});

// --- 2. APP SETUP ---
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- 3. THE "BORN AGAIN" ROUTE (SMART SHIELD) ---
app.get('/api/students/search/:serialNumber', async (req, res) => {
    const serialNumber = req.params.serialNumber;
    const cacheKey = `cert:${serialNumber}`;

    try {
        // STEP A: Check Redis (Only if Active)
        if (isRedisActive) {
            try {
                const cachedData = await client.get(cacheKey);
                if (cachedData) {
                    console.log(`⚡ Cache Hit! Serving ${serialNumber} from Memory.`);
                    return res.json(JSON.parse(cachedData));
                }
            } catch (redisErr) {
                console.log("Redis error ignored, falling back to DB");
            }
        }

        // STEP B: Check MongoDB (The Flesh)
        if (isRedisActive) console.log(`🐢 Cache Miss... Searching Database for ${serialNumber}...`);
        else console.log(`🔍 Database Search (No Cache) for ${serialNumber}...`);

        const student = await Student.findOne({ serialNumber: serialNumber });

        if (student) {
            // STEP C: Save to Redis (The Sustaining)
            if (isRedisActive) {
                await client.setEx(cacheKey, 3600, JSON.stringify(student));
            }
            return res.json(student);
        } else {
            return res.status(404).json({ message: "Certificate not found" });
        }

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// --- 4. OTHER ROUTES & START ---
const studentRoutes = require('./routes/students');
app.use('/api/students', studentRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});