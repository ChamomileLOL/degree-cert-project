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
                // 1. THE CORRECT COORDINATE (Render Backend)
                // Do not use localhost. Use the Cloud.
                const baseURL = 'https://degree-cert-project-v2.onrender.com'; 
                
                // 2. THE CORRECT PATH
                // We removed "/search" because your backend route is just "/:serialNumber"
                const response = await axios.get(`${baseURL}/api/students/${serialNumber}`);
                
                const dbData = response.data;

                // Transform DB data for the Component
                // (Using safe checks in case some fields are missing)
                const formattedData = {
                    name: dbData.name || "Unknown", // Updated to match your Schema
                    nameMr: dbData.nameMr || "",
                    college: dbData.college || "Xavier Institute of Engineering",
                    degree: dbData.course || "BACHELOR OF ENGINEERING",
                    branch: "Electronics and Telecommunication Engineering", // Hardcoded per your PDF
                    cgpi: dbData.cgpa || "0.00",
                    examDate: "December 2023", // Per PDF
                    convocationDate: dbData.date || "7th January, 2025",
                    seatNumber: "04046076", // Per PDF
                    fullSeatNo: "24-BECET-23D-0736-04046076", 
                    serialNo: dbData.serialNumber,
                    pi_seal: true 
                };

                setStudentData(formattedData);
                setLoading(false);
            } catch (err) {
                console.error("FETCH ERROR:", err);
                
                // --- THE SENTINEL INTERCEPTION ---
                if (err.response && err.response.status === 403) {
                    setError("TERMINATED");
                } else {
                    setError("Certificate not found! Please check the Serial Number.");
                }
                setLoading(false);
            }
        };

        fetchCertificate();
    }, [serialNumber]);

    // 1. LOADING STATE
    if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Accessing Secure Ledger...</h2>;

    // 2. THE BLACK SCREEN (SENTINEL BLOCK)
    if (error === "TERMINATED") {
        return (
            <div style={{ backgroundColor: 'black', color: '#ff3333', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: 'Courier New', textAlign: 'center' }}>
                <h1 style={{fontSize: '3rem', border: '3px solid red', padding: '20px'}}>ACCESS DENIED</h1>
                <h2>ERROR 403: SENTINEL ACTIVE</h2>
                <p style={{marginTop: '20px', fontSize: '1.2rem'}}>IDENTITY VERIFICATION FAILED.</p>
                <p>The entity attempting access is blacklisted.</p>
                <p style={{opacity: 0.6, fontSize: '12px', marginTop: '50px'}}>REF: ITE_ITE2_MERGED.PDF</p>
            </div>
        );
    }

    // 3. GENERIC ERROR
    if (error) return <h2 style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>{error}</h2>;

    // 4. THE SUCCESS STATE
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