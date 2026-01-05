import React from 'react';
import './Certificate.css';

const Certificate = ({ student }) => {
    // Fallback data if no student is passed (for testing/design mode)
    const data = student || {
        name: "MOORKATTIL XAVIER SIBY MADHU",
        nameMr: "मूरकट्टील झेवियर सिबी मधु",
        college: "Xavier Institute of Engineering",
        degree: "BACHELOR OF ENGINEERING",
        branch: "Electronics and Telecommunication Engineering",
        cgpi: "6.90",
        examDate: "December 2023",
        convocationDate: "7th January, 2025",
        seatNumber: "04046076", // CORRECTED: Added leading Zero
        fullSeatNo: "24-BECET-23D-0736-04046076", // CORRECTED: Full ID
        serialNo: "389390",
        pi_seal: "PREVIEW-MODE-NO-HASH-GENERATED"
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
                        {/* Signature Placeholder */}
                        <span style={{ fontFamily: 'Cursive', fontSize: '20px' }}>Ravindra Kulkarni</span>
                    </div>
                    <p><strong>Vice-Chancellor</strong></p>
                </div>
            </div>

            {/* BOTTOM CODES */}
            <div className="seat-no">
                {/* Use the full registration number from DB if available, else fallback */}
                {data.fullSeatNo || `24-BECET-23D-0736-${data.seatNumber}`} <br />
                <span style={{ color: 'red' }}>Serial No: {data.serialNo || '389390'}</span>
            </div>

            {/* PI INTEGRITY SEAL */}
            <div className="pi-seal-section" style={{ 
                position: 'absolute', 
                bottom: '5mm', 
                left: '0', 
                right: '0', 
                textAlign: 'center',
                borderTop: '1px solid #ccc',
                paddingTop: '5px',
                width: '80%',
                margin: '0 auto'
            }}>
                <p style={{ fontSize: '10px', color: '#666', margin: '0', textTransform: 'uppercase', letterSpacing: '2px' }}>
                    Cryptographic Integrity Seal (Immutable Pi)
                </p>
                <code style={{ 
                    fontFamily: 'Courier New', 
                    fontSize: '9px', 
                    color: '#333', 
                    display: 'block', 
                    marginTop: '2px',
                    wordBreak: 'break-all'
                }}>
                    {data.pi_seal || "VERIFYING INTEGRITY..."}
                </code>
            </div>

        </div> /* <--- THIS WAS MISSING. I HAVE RESTORED IT. */
    );
};

export default Certificate;