// server/models/Student.js
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    // Unique Identifiers
    serialNumber: { type: String, required: true, unique: true }, // e.g., "389390"
    registrationNumber: { type: String, required: true },       // e.g., "24-BECET..."

    // Personal Details (Bilingual)
    studentName: {
        english: { type: String, required: true }, // "MOORKATTIL XAVIER..."
        marathi: { type: String, required: true }  // "मूरकट्टील झेवियर..."
    },

    // Academic Details
    collegeName: {
        english: { type: String, required: true }, // "Xavier Institute..."
        marathi: { type: String, required: true }  // "झेवियर इन्स्टिट्यूट..."
    },

    branch: {
        english: { type: String, required: true }, // "Electronics and Telecommunication..."
        marathi: { type: String, required: true }  // "इलेक्ट्रॉनिक्स आणि..."
    },

    // Performance
    cgpi: { type: Number, required: true },      // 6.90
    totalCgpi: { type: Number, default: 10.00 }, // 10.00

    // Dates
    examMonthYear: {
        english: { type: String, required: true }, // "December 2023"
        marathi: { type: String, required: true }  // "डिसेंबर २०२३"
    },
    convocationDate: {
        english: { type: String, required: true }, // "7th January, 2025"
        marathi: { type: String, required: true }  // "७ जानेवारी, २०२५"
    }
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);