import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Certificate from '../components/Certificate';

function ViewCertificate() {
    const { serialNumber } = useParams();
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCertificate = async () => {
            try {
                // 1. POINT TO THE CLOUD (Render)
                const baseURL = 'https://degree-cert-project-v2.onrender.com'; 
                
                // 2. FETCH DATA
                const response = await axios.get(`${baseURL}/api/students/${serialNumber}`);
                const dbData = response.data;

                console.log("RECEIVED DATA:", dbData); // Debugging

                // 3. MAP THE OFFICIAL PDF DATA (Crucial Fix)
                // We handle both the "Flat" structure (New) and "Nested" structure (Old) just in case.
                const formattedData = {
                    // NAME: Matches "MOORKATTIL XAVIER SIBY MADHU"
                    name: dbData.name || (dbData.studentName ? dbData.studentName.english : "Unknown"), 
                    
                    // MARATHI NAME: Hardcoded or DB (Optional)
                    nameMr: "मूरकट्टील झेवियर सिबी मधु", 

                    // COLLEGE: "Xavier Institute of Engineering"
                    college: dbData.college || "Xavier Institute of Engineering",

                    // DEGREE
                    degree: "BACHELOR OF ENGINEERING",

                    // BRANCH: "Electronics and Telecommunication Engineering"
                    branch: "Electronics and Telecommunication Engineering",

                    // CGPA: Matches "6.90"
                    cgpi: dbData.cgpa || (dbData.cgpi ? dbData.cgpi.toString() : "6.90"),

                    // EXAM: "December 2023"
                    examDate: "December 2023",

                    // CONVOCATION: "7th January, 2025"
                    convocationDate: dbData.date || "7th January, 2025",

                    // SEAT/PRN
                    seatNumber: "04046076", 
                    fullSeatNo: "24-BECET-23D-0736-04046076", 
                    
                    // SERIAL
                    serialNo: dbData.serialNumber || serialNumber,
                    
                    // SEAL
                    pi_seal: true 
                };

                setStudentData(formattedData);
                setLoading(false);
            } catch (err) {
                console.error("FETCH ERROR:", err);
                setError("Certificate not found! Please check the Serial Number.");
                setLoading(false);
            }
        };

        fetchCertificate();
    }, [serialNumber]);

    // 1. LOADING STATE
    if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Accessing Secure Ledger...</h2>;

    // 2. ERROR STATE
    if (error) return <h2 style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>{error}</h2>;

    // 3. SUCCESS STATE
    return (
        <div style={{ background: '#f0f0f0', padding: '20px', minHeight: '100vh' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button onClick={() => window.print()} style={{ padding: '10px 20px', cursor: 'pointer', fontSize: '16px' }}>
                    🖨️ Print to PDF
                </button>
            </div>

            <Certificate student={studentData} /> 
        </div>
    );
}

export default ViewCertificate;