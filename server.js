import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

console.log("OpenAI key loaded:", process.env.OPENAI_API_KEY ? "YES" : "NO");

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/travel-plan", async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const { destination, interests, budget } = req.body;

    const prompt = `
Lag en enkel personlig reiseplan på norsk.

Reisemål: ${destination}
Interesser: ${interests}
Budsjett: ${budget}

Ta med:
- en enkel dagsplan
- 2 restaurantforslag
- 2 skjulte perler
- en kort pakkeliste
`;

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    console.log("OpenAI response received");

    res.json({
      plan: response.output_text || "Ingen tekst mottatt fra OpenAI.",
    });
  } catch (error) {
    console.error("Backend error:", error);
    res.status(500).json({
      error: "Failed to generate plan",
      details: error?.message || "Unknown error",
    });
  }
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});