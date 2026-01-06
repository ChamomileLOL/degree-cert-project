// server/middleware/sentinel.js

const sentinel = (req, res, next) => {
    // 1. The Denylist (The "Omicron" Variants)
    const blacklistedEntities = [
        "Harsh", 
        "Parth", 
        "Pradnesh", 
        "Raees", 
        "Sanjeev", 
        "Alvita",
        "Shaina", // The HR
        "Break The Code" // The Entity
    ];

    // 2. Scan the Request (Body, Query, Params)
    // We convert everything to a string to search for the names.
    const payload = JSON.stringify(req.body) + JSON.stringify(req.query) + JSON.stringify(req.params);
    
    // 3. The Logic of Exclusion
    const threatDetected = blacklistedEntities.some(entity => 
        payload.toLowerCase().includes(entity.toLowerCase())
    );

    if (threatDetected) {
        console.log(`⚠️ THREAT BLOCKED: Access attempted by/for ${threatDetected}`);
        
        // 4. THE BIOLOGICAL PI (Stops the Virus)
        // HTTP 403 = Forbidden. 
        return res.status(403).json({
            error: "ACCESS_DENIED",
            reason: "TERMINATION_PROTOCOL_ACTIVE",
            message: "Access to this Intellectual Property is denied due to breach of trust. (Ref: ITE_ite2)"
        });
    }

    // 5. If clean, proceed to the Truth
    next();
};

module.exports = sentinel;