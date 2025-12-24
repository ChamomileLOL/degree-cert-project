// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRoutes = require('./routes/students');
require('dotenv').config(); // This loads the .env file

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/students', studentRoutes);

// --- SECURE CONNECTION ---
// Now we use process.env.MONGO_URI instead of the hardcoded string
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

app.get('/', (req, res) => {
    res.send('Server is connected to Database!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});