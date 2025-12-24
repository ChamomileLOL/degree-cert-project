import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [serial, setSerial] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (serial) navigate(`/view/${serial}`);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>University Degree Verification</h1>
            <input
                type="text"
                placeholder="Enter Serial Number (e.g. 389390)"
                value={serial}
                onChange={(e) => setSerial(e.target.value)}
                style={{ padding: '10px', width: '300px' }}
            />
            <button onClick={handleSearch} style={{ padding: '10px 20px', marginLeft: '10px' }}>
                Verify
            </button>
        </div>
    );
}

export default Home;