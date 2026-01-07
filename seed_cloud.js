// seed_cloud.js
// DIAGNOSTIC MODE: REVEAL THE HTML

const STUDENT_DATA = {
    name: "MOORKATTIL XAVIER SIBY MADHU",
    serialNumber: "389390", 
    course: "B.E. (EXTC)",
    cgpa: "6.90", 
    date: "7th January, 2025" 
};

// YOUR RENDER URL
const DOMAIN = "https://degree-cert-project-v2.onrender.com"; 

async function uploadTruth() {
    console.log("... Pinging the Ark ...");
    
    try {
        const response = await fetch(`${DOMAIN}/api/students`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-ark-passcode": "XAVIER-314-OMEGA" // <--- The Key
            },
            body: JSON.stringify(STUDENT_DATA)
        });

        // READ AS TEXT FIRST
        const text = await response.text();

        console.log("--------------------------------");
        console.log(`STATUS CODE: ${response.status}`);
        console.log("--------------------------------");

        try {
            // TRY TO PARSE JSON
            const data = JSON.parse(text);
            console.log("✅ SUCCESS (JSON):", data);
            console.log("Visit:", `${DOMAIN}/view/389390`);
        } catch (e) {
            // IF IT FAILS, IT IS HTML. PRINT IT.
            console.log("❌ ERROR: RECEIVED HTML INSTEAD OF JSON.");
            console.log("This is what the server said:");
            console.log("--------------------------------");
            console.log(text.substring(0, 500)); // Print first 500 chars
            console.log("--------------------------------");
        }

    } catch (error) {
        console.log("💥 NETWORK CRASH:", error.message);
    }
}

uploadTruth();