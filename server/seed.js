// server/seed.js
const mongoose = require('mongoose');
const Student = require('./models/Student');
require('dotenv').config(); // Load environment variables

mongoose.connect(process.env.MONGO_URI) // Use the variable
    .then(() => console.log('✅ Connected to DB for Seeding'))
    .catch(err => console.error(err));

const seedData = async () => {
    // 1. Delete existing data to avoid duplicates
    await Student.deleteMany({});

    // 2. Create the Student Record
    const student = new Student({
        serialNumber: "389390",
        registrationNumber: "24-BECET-23D-0736-4046076",
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
        cgpi: 6.90,
        totalCgpi: 10.00,
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
    console.log("✅ Student Data Added Successfully!");
    process.exit();
};

seedData();