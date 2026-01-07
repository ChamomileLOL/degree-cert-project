import React from 'react';
// 1. CHANGE THIS IMPORT (Use HashRouter)
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; 

import ViewCertificate from './pages/ViewCertificate';
import Home from './pages/Home';

function App() {
    return (
        // 2. USE THE HASH ROUTER
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/view/:serialNumber" element={<ViewCertificate />} />
            </Routes>
        </Router>
    );
}

export default App;