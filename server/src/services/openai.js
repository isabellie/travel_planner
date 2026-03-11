import OpenAI from "openai";
import { buildTravelPlannerPrompt } from "../prompts/travelPlannerPrompt.js";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateTravelPlan(input) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing");
  }

  const prompt = buildTravelPlannerPrompt(input);

  const completion = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    response_format: { type: "json_object" },
    temperature: 0.6,
    messages: [
      {
        role: "system",
        content: "Du lager strukturerte reiseplaner. Returner kun JSON, og skriv alle tekstfelter paa norsk bokmal."
      },
      {
        role: "user",
        content: prompt
      }
    ]
  });

  const content = completion.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("No content returned from OpenAI");
  }

  return JSON.parse(content);
}
