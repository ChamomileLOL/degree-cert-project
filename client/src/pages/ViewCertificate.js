import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Certificate from '../components/Certificate'; // <--- NOW IT WILL BE USED

function ViewCertificate() {
    const { serialNumber } = useParams();
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCertificate = async () => {
            try {
                // Ensure this matches your Server Port (5000)
                const baseURL = 'http://localhost:5000'; 
                const response = await axios.get(`${baseURL}/api/students/search/${serialNumber}`);
                const dbData = response.data;

                // Transform DB data for the Component
                const formattedData = {
                    name: dbData.studentName.english,
                    nameMr: dbData.studentName.marathi,
                    college: dbData.collegeName.english,
                    degree: "BACHELOR OF ENGINEERING",
                    branch: dbData.branch.english,
                    cgpi: dbData.cgpi.toFixed(2),
                    examDate: dbData.examMonthYear.english,
                    convocationDate: dbData.convocationDate.english,
                    seatNumber: dbData.registrationNumber.split('-').pop(),
                    fullSeatNo: dbData.registrationNumber, 
                    serialNo: dbData.serialNumber,
                    pi_seal: dbData.pi_seal 
                };

                setStudentData(formattedData); // <--- ASSIGNING THE VALUE
                setLoading(false);
            } catch (err) {
                console.error(err);
                
                // --- THE SENTINEL INTERCEPTION (BIOLOGICAL PI) ---
                if (err.response && err.response.status === 403) {
                    setError("TERMINATED"); // <--- ACTIVATING THE TRAP
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

    // 4. THE SUCCESS STATE (THE DEGREE)
    return (
        <div style={{ background: '#f0f0f0', padding: '20px', minHeight: '100vh' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button onClick={() => window.print()} style={{ padding: '10px 20px', cursor: 'pointer', fontSize: '16px' }}>
                    🖨️ Print to PDF
                </button>
            </div>

            {/* PASSING THE DATA TO THE COMPONENT */}
            <Certificate student={studentData} /> 
        </div>
    );
}

export default ViewCertificate;