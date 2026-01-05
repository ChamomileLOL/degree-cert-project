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
                // 1. Call the Backend API
                // ENSURE THIS URL MATCHES YOUR SERVER (localhost:5000 or Render URL)
                const response = await axios.get(`http://localhost:5000/api/students/search/${serialNumber}`);
                const dbData = response.data;

                // 2. Transform DB data to Component format
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
                    
                    // --- THE CRITICAL FIXES ---
                    fullSeatNo: dbData.registrationNumber, // Ensures 04046076
                    serialNo: dbData.serialNumber,
                    pi_seal: dbData.pi_seal // <--- THIS WAS MISSING. ADD IT.
                };

                setStudentData(formattedData);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Certificate not found! Please check the Serial Number.");
                setLoading(false);
            }
        };

        fetchCertificate();
    }, [serialNumber]);

    if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Generating Certificate...</h2>;
    if (error) return <h2 style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>{error}</h2>;

    return (
        <div style={{ background: '#f0f0f0', padding: '20px', minHeight: '100vh' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button onClick={() => window.print()} style={{ padding: '10px 20px', cursor: 'pointer', fontSize: '16px' }}>
                    🖨️ Print to PDF
                </button>
            </div>

            {/* Pass the real fetched data to the component */}
            <Certificate student={studentData} />
        </div>
    );
}

export default ViewCertificate;