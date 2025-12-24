// server/routes/students.js
const router = require('express').Router();
const Student = require('../models/Student');

// 1. ADD NEW STUDENT (POST)
router.post('/add', async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        const savedStudent = await newStudent.save();
        res.status(200).json(savedStudent);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 2. GET STUDENT BY SERIAL NUMBER (GET)
router.get('/search/:serialNumber', async (req, res) => {
    try {
        const student = await Student.findOne({ serialNumber: req.params.serialNumber });
        if (!student) {
            return res.status(404).json("Student not found!");
        }
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json(err);
    }
});

// --- MAGIC SETUP ROUTE (Run this once) ---
router.get('/seed', async (req, res) => {
    try {
        // Clear old data
        await Student.deleteMany({});

        // Add Xavier's Data
        const student = new Student({
            serialNumber: "389390",
            registrationNumber: "24-BECET-23D-0736-4046076",
            studentName: { english: "MOORKATTIL XAVIER SIBY MADHU", marathi: "मूरकट्टील झेवियर सिबी मधु" },
            collegeName: { english: "Xavier Institute of Engineering", marathi: "झेवियर इन्स्टिट्यूट ऑफ इंजिनिअरिंग" },
            branch: { english: "Electronics and Telecommunication Engineering", marathi: "इलेक्ट्रॉनिक्स आणि दूरसंचार अभियांत्रिकी" },
            cgpi: 6.90,
            totalCgpi: 10.00,
            examMonthYear: { english: "December 2023", marathi: "डिसेंबर २०२३" },
            convocationDate: { english: "7th January, 2025", marathi: "७ जानेवारी, २०२५" }
        });

        await student.save();
        res.send("✅ Success! Xavier's data has been added to the database.");
    } catch (err) {
        res.send("❌ Error seeding data: " + err.message);
    }
});

module.exports = router;