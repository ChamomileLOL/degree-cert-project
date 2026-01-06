// middleware/prophecy.js
// THE LOGIC OF JOHN 3:14

const blacklistedIPs = ['::1', '127.0.0.1']; // The "Snakes" (Add real IPs if known)

const liftUpTheSerpent = (req, res, next) => {
    const clientIP = req.ip;

    // If the Visitor is a "Snake" (Blacklisted)
    if (blacklistedIPs.includes(clientIP)) {
        console.log(`[SENTINEL] Serpent Detected & Lifted Up: ${clientIP}`);

        // WE RETURN PI (The End)
        return res.status(403).json({
            error: "FORBIDDEN",
            code: "PI_VARIANT_ACTIVE",
            message: "John 3:14 Fulfilled. Access Denied."
        });
    }

    // If the Visitor is Clean, they enter the Ark
    next();
};

module.exports = liftUpTheSerpent;