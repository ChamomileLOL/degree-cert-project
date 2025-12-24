// client/src/pages/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [inputSerial, setInputSerial] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (inputSerial.trim()) {
            // Navigate to the view page with the entered number
            navigate(`/view/${inputSerial}`);
        } else {
            alert("Please enter a Serial Number");
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f4f4f4',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                background: 'white',
                padding: '40px',
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                textAlign: 'center',
                maxWidth: '400px',
                width: '90%'
            }}>
                {/* University Logo Placeholder */}
                <h1 style={{ color: '#800000', marginBottom: '10px' }}>University of Mumbai</h1>
                <h3 style={{ color: '#333', marginBottom: '30px' }}>Degree Verification Portal</h3>

                <input
                    type="text"
                    placeholder="Enter Serial Number (e.g. 389390)"
                    value={inputSerial}
                    onChange={(e) => setInputSerial(e.target.value)}
                    style={{
                        padding: '12px',
                        width: '80%',
                        marginBottom: '20px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        fontSize: '16px'
                    }}
                />
                <br />
                <button
                    onClick={handleSearch}
                    style={{
                        padding: '12px 30px',
                        background: '#800000',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold'
                    }}
                >
                    Verify Degree
                </button>

                <p style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
                    Try entering: <strong>389390</strong>
                </p>
            </div>
        </div>
    );
}

export default Home;