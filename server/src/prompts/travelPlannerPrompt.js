export function buildTravelPlannerPrompt({ destination, days, interests, budget }) {
  return `Du er en reiseplanlegger.
Lag en reiseplan i gyldig JSON.

Brukerinput:
- destination: ${destination}
- days: ${days}
- interests: ${interests.join(", ")}
- budget: ${budget}

Returner denne JSON-strukturen eksakt:
{
  "destination": "string",
  "days": number,
  "dailyPlan": [
    {
      "day": number,
      "title": "string",
      "activities": ["string"]
    }
  ],
  "activities": ["string"],
  "restaurants": ["string"],
  "hiddenGems": ["string"],
  "packingList": ["string"]
}

Regler:
- dailyPlan må ha samme lengde som days.
- Alle tekstfelt i svaret skal være på norsk bokmål.
- Inkluder praktiske og realistiske forslag.
- Ta hensyn til budsjettnivå.
- Ingen markdown. Kun JSON.`;
}
