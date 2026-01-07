// server/index.js
// THE RESTORED ARK

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// --- THE PROPHECY & SHIELD ---
const liftUpTheSerpent = require('./middleware/prophecy'); 

// --- THE MISSING PIECE (ROUTES) ---
// ⚠️ IMPORTANT: Check your "routes" folder. 
// If the file is named "studentRoutes.js", change this to './routes/studentRoutes'
const studentRoutes = require('./routes/students'); 

const app = express();

// 1. SECURITY & LOGGING
app.use(helmet()); 
app.use(morgan('dev')); // Shows logs in Render Dashboard
app.use(cors());
app.use(express.json());

// 2. THE SENTINEL (John 3:14)
app.use(liftUpTheSerpent);

// 3. DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ DB Error:", err));

// 4. THE ROUTES (This is what was missing)
app.use('/api/students', studentRoutes);

// 5. START
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});