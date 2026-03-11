import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [interests, setInterests] = useState("");
  const [budget, setBudget] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      destination: destination.trim(),
      days: Number(days),
      interests: interests
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      budget
    };

    setIsSubmitting(true);
    setStatus("Lager reiseplan...");

    try {
      const response = await fetch("/api/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("Kunne ikke lage reiseplan. Prøv igjen.");
        return;
      }

      sessionStorage.setItem("travelPlan", JSON.stringify(data));
      navigate("/plan");
    } catch (error) {
      setStatus(`Feil: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="layout">
      <section className="card">
        <h1>Reiseplanlegger</h1>
        <p className="subtitle">Planlegg din perfekte reise på minutter!</p>
        <form onSubmit={handleSubmit}>
          <label>
            Reisemål
            <input
              type="text"
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              placeholder="F.eks. København, Oslo, London, Tokyo..."
              required
            />
          </label>

          <label>
            Antall dager
            <input
              type="number"
              min="1"
              max="30"
              value={days}
              onChange={(event) => setDays(event.target.value)}
              required
            />
          </label>

          <label>
            Interesser
            <input
              type="text"
              value={interests}
              onChange={(event) => setInterests(event.target.value)}
              placeholder="F.eks. mat, kultur, shopping, historie, natur..."
              required
            />
          </label>

          <label>
            Budsjett
            <select value={budget} onChange={(event) => setBudget(event.target.value)} required>
              <option value="">Velg budsjett</option>
              <option value="low">Lavt</option>
              <option value="medium">Middels</option>
              <option value="high">Høyt</option>
            </select>
          </label>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Lager plan..." : "Lag reiseplan"}
          </button>
        </form>

        <p className="muted" aria-live="polite">
          {status}
        </p>
      </section>
    </main>
  );
}
