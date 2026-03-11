export function validateTripInput(payload) {
  const errors = [];

  if (!payload || typeof payload !== "object") {
    return { valid: false, errors: ["Body must be a JSON object"] };
  }

  const destination = typeof payload.destination === "string" ? payload.destination.trim() : "";
  const interests = Array.isArray(payload.interests)
    ? payload.interests.filter((item) => typeof item === "string" && item.trim().length > 0)
    : [];
  const budget = typeof payload.budget === "string" ? payload.budget.trim() : "";
  const days = Number(payload.days);

  if (!destination) errors.push("destination is required");
  if (!Number.isInteger(days) || days < 1 || days > 30) {
    errors.push("days must be an integer between 1 and 30");
  }
  if (!interests.length) errors.push("at least one interest is required");
  if (!budget) errors.push("budget is required");

  if (errors.length) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    value: {
      destination,
      days,
      interests,
      budget
    }
  };
}
