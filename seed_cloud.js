// seed_cloud.js
// THE BEAM OF TRUTH (TARGET: RENDER)

const STUDENT_DATA = {
    name: "MOORKATTIL XAVIER SIBY MADHU",
    serialNumber: "389390", 
    course: "Bachelor of Engineering (Electronics and Telecommunication Engineering)",
    cgpa: "6.90", 
    date: "7th January, 2025" 
};

// -----------------------------------------------------------
// 🟢 CORRECT TARGET: RENDER BACKEND
// -----------------------------------------------------------
const DOMAIN = "https://degree-cert-project-v2.onrender.com"; 

async function uploadTruth() {
    console.log("... Connecting to the Cloud ...");
    console.log(`... Target: ${DOMAIN}/api/students ...`);
    
    try {
        const response = await fetch(`${DOMAIN}/api/students`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(STUDENT_DATA)
        });

        const result = await response.json();
        
        if (response.ok) {
            console.log("--------------------------------");
            console.log("✅ SUCCESS: OFFICIAL DATA UPLOADED.");
            console.log("--------------------------------");
            console.log("VIEW YOUR CERTIFICATE HERE:");
            console.log(`${DOMAIN}/view/389390`);
        } else {
            console.log("ERROR:", result);
            if(result.error && result.error.includes("duplicate")) {
                 console.log("NOTE: Student already exists. You can view it now.");
            }
        }
    } catch (error) {
        console.log("CONNECTION FAILED:", error.message);
    }
}

uploadTruth();