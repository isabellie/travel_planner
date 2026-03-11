import { Router } from "express";
import { validateTripInput } from "../utils/validateTripInput.js";
import { generateTravelPlan } from "../services/openai.js";

const router = Router();

router.post("/", async (req, res) => {
  const validation = validateTripInput(req.body);

  if (!validation.valid) {
    return res.status(400).json({
      error: "Invalid request body",
      details: validation.errors
    });
  }

  try {
    const result = await generateTravelPlan(validation.value);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Failed to generate plan", error);
    return res.status(500).json({
      error: "Failed to generate travel plan"
    });
  }
});

export default router;
