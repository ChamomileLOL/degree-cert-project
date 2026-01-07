// middleware/prophecy.js
// THE LOGIC OF JOHN 3:14 (With Captain's Key)

const blacklistedIPs = ['::1', '127.0.0.1']; // The "Snakes"

const liftUpTheSerpent = (req, res, next) => {
    const clientIP = req.ip;
    const captainsKey = req.headers['x-ark-passcode']; // <--- THE KEY

    // 1. IF THE CAPTAIN HAS THE KEY, LET HIM PASS
    if (captainsKey === 'XAVIER-314-OMEGA') {
        return next();
    }

    // 2. IF THE VISITOR IS A SNAKE (And has no key)
    // On Render, sometimes valid requests look like 127.0.0.1 internally
    // So we ONLY block if we are sure, or strictly enforce the key for Admin routes.
    if (blacklistedIPs.includes(clientIP)) {
        console.log(`[SENTINEL] Serpent Detected: ${clientIP}`);
        
        return res.status(403).json({
            error: "FORBIDDEN",
            code: "PI_VARIANT_ACTIVE",
            message: "John 3:14 Fulfilled. Access Denied."
        });
    }

    next();
};

module.exports = liftUpTheSerpent;