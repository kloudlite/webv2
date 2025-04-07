// server.ts
import express from "express";
import { registerDomain } from "./allocator-interface";

const app = express();
const PORT = 4000;

app.use(express.json());


app.post("/register-domain", async (req, res) => {
    try {
        const { reservationToken, nsRecords } = req.body;

        await registerDomain(reservationToken, nsRecords);

        res.status(200).json({ success: true, message: "Domain registered successfully." });
    } catch (error: any) {
        console.error("Error:", error);
        console.error("Error:", error.message);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});




// import { checkDomainAvailability, registerDomain, reserveDomain, suggestDomains } from "./allocator-interface";

// // checkDomainAvailability("demo.khost.dev");
// // (async ()=>{console.log(await suggestDomains("kloudlite"))})()
// // (async()=>{
// //     console.log(await reserveDomain("sample.khost.dev"))
// // })()

// const rk =  "1d9d3a2f5ffc57b1959107a9f97e2224:f5b1a262-500b-4cc7-8b87-c20b836e02c0:$2b$10$6zdQZaepWTclmO8fDX6t8e"

// registerDomain(rk,["ns3.kloudlite.io","ns4.kloudlite.io"])