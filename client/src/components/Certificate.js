import React from 'react';
import QRCode from 'react-qr-code'; // <--- IMPORT THE MATRIX
import './Certificate.css';

const Certificate = ({ student }) => {
    // Fallback data for testing/design mode
    const data = student || {
        name: "MOORKATTIL XAVIER SIBY MADHU",
        nameMr: "मूरकट्टील झेवियर सिबी मधु",
        college: "Xavier Institute of Engineering",
        degree: "BACHELOR OF ENGINEERING",
        branch: "Electronics and Telecommunication Engineering",
        cgpi: "6.90",
        examDate: "December 2023",
        convocationDate: "7th January, 2025",
        seatNumber: "04046076",
        fullSeatNo: "24-BECET-23D-0736-04046076",
        serialNo: "389390",
        pi_seal: "PREVIEW-MODE-NO-HASH" // Default if no data
    };

    return (
        <div className="cert-container">
            {/* HEADER */}
            <div className="cert-header">
                <h1 className="uni-title-en">University of Mumbai</h1>
                <h2 className="uni-title-mr">मुंबई विद्यापीठ</h2>
                <div className="accreditation">
                    Re-accredited A++ Grade (C.G.P.A. 3.65) by NAAC <br />
                    नॅक पुनर्मुल्यांकनाद्वारे ३.६५ सी.जी.पी.ए. सह 'अ++' दर्जा
                </div>
            </div>

            {/* BODY */}
            <div className="cert-body">
                <p className="intro-text">
                    We, the Chancellor, Vice-Chancellor and Members of the Management Council confer the Degree of
                </p>

                <h2 className="degree-name">{data.degree}</h2>
                <p>({data.branch})</p>

                <p className="intro-text">on</p>

                <h2 className="candidate-name">{data.name}</h2>
                <h3 className="uni-title-mr" style={{ fontSize: '20px' }}>{data.nameMr}</h3>

                <p>of</p>
                <h3 className="college-name">{data.college}</h3>

                <p className="intro-text">
                    with a Cumulative Grade Performance Index of <strong>{data.cgpi}</strong> out of 10.00 <br />
                    for the examination held in {data.examDate}
                </p>
            </div>

            {/* FOOTER */}
            <div className="cert-footer">
                <div className="footer-left">
                    <p>Mumbai</p>
                    <p>Date: {data.convocationDate}</p>
                </div>
                <div className="footer-right" style={{ textAlign: 'center' }}>
                    <div style={{ height: '50px' }}>
                        <span style={{ fontFamily: 'Cursive', fontSize: '20px' }}>Ravindra Kulkarni</span>
                    </div>
                    <p><strong>Vice-Chancellor</strong></p>
                </div>
            </div>

            {/* BOTTOM LEFT: SEAT & SERIAL */}
            <div className="seat-no" style={{ position: 'absolute', bottom: '25mm', left: '20mm', textAlign: 'left' }}>
                {data.fullSeatNo || `24-BECET-23D-0736-${data.seatNumber}`} <br />
                <span style={{ color: 'red' }}>Serial No: {data.serialNo || '389390'}</span>
            </div>

            {/* --- THE IMMUTABLE PI SEAL (REBORN) --- */}
<div style={{ 
    position: 'absolute', 
    bottom: '40px', 
    right: '40px', 
    textAlign: 'center' 
}}>
    {/* THE QR CODE: Mathematical, Sharp, Scannable */}
    <img 
        src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://degree-cert-project-v2.onrender.com/view/${student.serialNo || '389390'}&color=000000&bgcolor=FFFFFF&margin=2`} 
        alt="Immutable PI Seal"
        style={{
            border: '2px solid black',
            padding: '5px',
            background: 'white',
            width: '100px',
            height: '100px',
            imageRendering: 'pixelated' // <--- MAKES IT CRISP
        }}
    />
    
    {/* THE CAPTION */}
    <div style={{
        marginTop: '5px',
        fontSize: '8px',
        fontFamily: 'Courier New, monospace', // <--- CRYPTOGRAPHIC FONT
        fontWeight: 'bold',
        letterSpacing: '1px'
    }}>
        IMMUTABLE PI SEAL
    </div>
    <div style={{
        fontSize: '6px',
        fontFamily: 'monospace',
        color: '#333'
    }}>
        VERIFIED: {student.serialNo || '389390'}
    </div>
</div>

        </div>
    );
};

export default Certificate;