const cron = require("cron");

const URL = "https://expense-gql-p8yo.onrender.com/api/health-check";

const job = new cron.CronJob("*/1 * * * *", async function () { 
    console.log("Job started")
    console.log("Sending GET request to:", URL);
    try {
        const response = await fetch(URL);
        if (response.ok) {
            console.log("GET request sent successfully");
            console.log("Response:", await response.json());
        } else {
            console.warn("GET request failed with status:", response.status);

        }
    } catch (error) {
        console.error("Error while sending request:", error);
    }
});

module.exports=job;
