// middleware/prophecy.js
// THE FULFILLED PROPHECY (The Sentinel is Retired)

const liftUpTheSerpent = (req, res, next) => {
    // We log the visit for your records
    // On Render, the "real" IP is often in 'x-forwarded-for' header
    const realIP = req.headers['x-forwarded-for'] || req.ip;
    
    console.log(`[VISITOR ALLOWED] IP: ${realIP} | Path: ${req.path}`);

    // THE GATES ARE OPEN. NO BLOCKING.
    next();
};

module.exports = liftUpTheSerpent;