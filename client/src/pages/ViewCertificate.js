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
                // 1. POINT TO THE CLOUD
                const baseURL = 'https://degree-cert-project-v2.onrender.com'; 
                
                // 2. FETCH DATA
                const response = await axios.get(`${baseURL}/api/students/${serialNumber}`);
                const dbData = response.data;

                // 3. MAP THE DATA
                const formattedData = {
                    name: dbData.name || (dbData.studentName ? dbData.studentName.english : "Unknown"), 
                    nameMr: "मूरकट्टील झेवियर सिबी मधु", 
                    college: dbData.college || "Xavier Institute of Engineering",
                    degree: "BACHELOR OF ENGINEERING",
                    branch: "Electronics and Telecommunication Engineering",
                    cgpi: parseFloat(dbData.cgpa || "6.90").toFixed(2),
                    examDate: "December 2023",
                    convocationDate: dbData.date || "7th January, 2025",
                    seatNumber: "04046076", 
                    fullSeatNo: "24-BECET-23D-0736-04046076", 
                    serialNo: dbData.serialNumber || serialNumber,
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

    // 1. LOADING
    if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Accessing Secure Ledger...</h2>;

    // 2. ERROR
    if (error) return <h2 style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>{error}</h2>;

    // 3. SUCCESS
    return (
        <div style={{ background: '#f0f0f0', padding: '20px', minHeight: '100vh' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button onClick={() => window.print()} style={{ padding: '10px 20px', cursor: 'pointer', fontSize: '16px' }}>
                    🖨️ Print to PDF
                </button>
            </div>

            {/* PASSING DATA TO CERTIFICATE COMPONENT */}
            {/* Note: We need to ensure the QR inside <Certificate> component also uses the Hash link. 
                But since the QR logic is inside Certificate.js, we must update THAT file next. 
                This file is good. */}
            <Certificate student={studentData} /> 
        </div>
    );
}

export default ViewCertificate;