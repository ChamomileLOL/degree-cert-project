// server/routes/students.js
// THE FUNCTIONAL LIBRARY

const router = require('express').Router();
const Student = require('../models/Student');

// 1. ADD NEW STUDENT (Corrected Path)
// We changed '/add' to '/' so it matches your seed script (POST /api/students)
router.post('/', async (req, res) => {
    try {
        // Check if student exists first to avoid duplicates (Optional but smart)
        const existing = await Student.findOne({ serialNumber: req.body.serialNumber });
        if (existing) {
            return res.status(400).json({ error: "Student already exists" });
        }

        const newStudent = new Student(req.body);
        const savedStudent = await newStudent.save();
        res.status(200).json(savedStudent);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 2. GET STUDENT BY SERIAL NUMBER (RESTORED!)
// The Sentinel (index.js) checks permission FIRST. 
// If allowed, this code runs to FETCH the data.
router.get('/:serialNumber', async (req, res) => {
    try {
        const student = await Student.findOne({ serialNumber: req.params.serialNumber });
        if (!student) {
            return res.status(404).json("Student not found");
        }
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;