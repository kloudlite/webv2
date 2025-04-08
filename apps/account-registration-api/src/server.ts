// server.ts
import express from "express";
import { registerDomain } from "@repo/cf-domain-management";

const app = express();
const PORT = 4000;

app.use(express.json());

const cfConfig = {
  CLOUDFLARE_API_KEY: process.env.CLOUDFLARE_API_KEY || "",
  CLOUDFLARE_EMAIL: process.env.CLOUDFLARE_API_KEY || "",
  CLOUDFLARE_ZONE_ID: process.env.CLOUDFLARE_API_KEY || "",
};

app.post("/register-domain", async (req, res) => {
  try {
    const { reservationToken, nsRecords } = req.body;
    await registerDomain(cfConfig, reservationToken, nsRecords);
    res
      .status(200)
      .json({ success: true, message: "Domain registered successfully." });
  } catch (error: any) {
    console.error("Error:", error);
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});