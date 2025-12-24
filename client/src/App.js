import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewCertificate from './pages/ViewCertificate';
import Home from './pages/Home'; // <--- Import this

function App() {
    return (
        <Router>
            <Routes>
                {/* Default Route shows the Search Page */}
                <Route path="/" element={<Home />} />

                {/* View Route shows the Certificate */}
                <Route path="/view/:serialNumber" element={<ViewCertificate />} />
            </Routes>
        </Router>
    );
}

export default App;