// server/index.js - THE FINAL ARTIFACT
const morgan = require('morgan');
const sentinel = require('./middleware/sentinel');
const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const redis = require('redis');
const crypto = require('crypto'); // <--- CRITICAL: THE MATH ENGINE
const helmet = require('helmet'); // <--- IMPORT THIS
const liftUpTheSerpent = require('./middleware/prophecy'); // <--- IMPORT PROPHECY
require('dotenv').config();

const Student = require('./models/Student');
const studentRoutes = require('./routes/students'); // Import old routes

// --- 1. SETUP REDIS ---
const client = redis.createClient();
let isRedisActive = false;

(async () => {
    try {
        await client.connect();
        isRedisActive = true;
        console.log("✅ Redis Client Connected (Shield Active)");
    } catch (err) {
        console.log("⚠️ Redis Not Found. Running in Database-Only Mode.");
    }
})();

client.on('error', (err) => {
    if (isRedisActive) console.log('❌ Redis Error', err);
});

// --- 2. APP SETUP ---
const app = express();
const PORT = process.env.PORT || 5000;

// SEAL THE HULL
app.use(helmet()); 

// ACTIVATE THE SENTINEL (The Prophecy)
// Apply this before any routes
app.use(liftUpTheSerpent);

app.use(cors());
app.use(express.json());
// --- CCTV SURVEILLANCE START ---
// Create a write stream (in append mode) to store logs
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'cctv_access.log'), { flags: 'a' });

// Log every request (IP, Date, User-Agent)
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url" :status :user-agent', { stream: accessLogStream }));
// --- CCTV SURVEILLANCE END ---

// --- ACTIVATE SENTINEL FIREWALL ---
app.use(sentinel); 
// ----------------------------------

// --- 3. THE "PI INTEGRITY" ROUTE (MUST BE BEFORE OTHER ROUTES) ---
// This specific route intercepts requests for certificates and applies the Seal.
app.get('/api/students/search/:serialNumber', async (req, res) => {
    const serialNumber = req.params.serialNumber;
    const cacheKey = `cert:${serialNumber}`;

    // HELPER: The Immutable Logic (SHA-256)
    const generatePiSeal = (data) => {
        // We lock Name + Serial + Date
        // If the database changes by 1 pixel, this seal changes completely.
        const rawString = (data.studentName?.english || "") + (data.serialNumber || "") + (data.convocationDate?.english || "");
        return crypto.createHash('sha256').update(rawString).digest('hex');
    };

    try {
        // STEP A: Check Redis (Speed)
        if (isRedisActive) {
            try {
                const cachedData = await client.get(cacheKey);
                if (cachedData) {
                    console.log(`⚡ Cache Hit! Serving ${serialNumber}.`);
                    const studentObj = JSON.parse(cachedData);
                    
                    // ON-THE-FLY SEALING
                    const seal = generatePiSeal(studentObj);
                    return res.json({ ...studentObj, pi_seal: seal });
                }
            } catch (e) { console.log("Redis skip"); }
        }

        // STEP B: Check MongoDB (Database)
        console.log(`🔍 Database Search for ${serialNumber}...`);
        const student = await Student.findOne({ serialNumber: serialNumber });

        if (student) {
            const studentObj = student.toObject();

            // STEP C: Save to Redis
            if (isRedisActive) {
                await client.setEx(cacheKey, 3600, JSON.stringify(studentObj));
            }

            // STEP D: Generate Seal
            const seal = generatePiSeal(studentObj);
            
            // SEND FINAL RESPONSE
            return res.json({ ...studentObj, pi_seal: seal });

        } else {
            return res.status(404).json({ message: "Certificate not found" });
        }

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// --- 4. LOAD OTHER ROUTES ---
// This handles /add, /seed, etc.
app.use('/api/students', studentRoutes);

// --- 5. CONNECT & START ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Error:', err));

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});