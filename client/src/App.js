import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ViewCertificate from './pages/ViewCertificate';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Route 1: The Search Page */}
                    <Route path="/" element={<Home />} />

                    {/* Route 2: The Certificate Page (Dynamic Serial Number) */}
                    <Route path="/view/:serialNumber" element={<ViewCertificate />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;