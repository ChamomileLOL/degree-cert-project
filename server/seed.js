// server/seed.js - THE EXACT CLONE
const mongoose = require('mongoose');
const Student = require('./models/Student');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected for Cloning...'))
    .catch(err => console.error(err));

const seedData = async () => {
    // 1. Wipe the Slate Clean
    await Student.deleteMany({});

    // 2. Insert The Exact Clone (From PDF)
    const student = new Student({
        serialNumber: "389390", // Bottom Right
        registrationNumber: "24-BECET-23D-0736-04046076", // CORRECTED (Added the '0')
        
        studentName: {
            english: "MOORKATTIL XAVIER SIBY MADHU",
            marathi: "मूरकट्टील झेवियर सिबी मधु"
        },
        collegeName: {
            english: "Xavier Institute of Engineering",
            marathi: "झेवियर इन्स्टिट्यूट ऑफ इंजिनिअरिंग"
        },
        branch: {
            english: "Electronics and Telecommunication Engineering",
            marathi: "इलेक्ट्रॉनिक्स आणि दूरसंचार अभियांत्रिकी"
        },
        
        // The Numbers
        cgpi: 6.90,
        totalCgpi: 10.00,
        
        // The Dates
        examMonthYear: {
            english: "December 2023",
            marathi: "डिसेंबर २०२३"
        },
        convocationDate: {
            english: "7th January, 2025",
            marathi: "७ जानेवारी, २०२५"
        }
    });

    await student.save();
    console.log("✅ Exact Clone Created. Database Updated.");
    process.exit();
};

seedData();