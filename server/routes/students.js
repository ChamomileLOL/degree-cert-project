// server/routes/students.js
const router = require('express').Router();
const Student = require('../models/Student');

// 1. ADD NEW STUDENT (Keep this)
router.post('/add', async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        const savedStudent = await newStudent.save();
        res.status(200).json(savedStudent);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 2. GET STUDENT BY SERIAL NUMBER
// ❌ DELETED / COMMENTED OUT ❌
// We removed this because server/index.js now handles this with the PI SEAL.

module.exports = router;