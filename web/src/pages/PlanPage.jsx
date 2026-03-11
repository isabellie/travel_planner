import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PlanContent from "../components/PlanContent.jsx";

export default function PlanPage() {
  const navigate = useNavigate();

  const plan = useMemo(() => {
    const rawPlan = sessionStorage.getItem("travelPlan");
    if (!rawPlan) {
      return null;
    }

    try {
      return JSON.parse(rawPlan);
    } catch {
      return null;
    }
  }, []);

  return (
    <main className="layout">
      <section className="card">
        <div className="header-row">
          <h1>Din reiseplan</h1>
          <button type="button" className="back-link-button" onClick={() => navigate("/")}>
            Ny plan
          </button>
        </div>

        {!plan ? (
          <p className="muted">Ingen plan funnet. Gå tilbake og lag en ny plan.</p>
        ) : (
          <div className="result-content">
            <p className="muted">Reiseplan klar.</p>
            <PlanContent plan={plan} />
          </div>
        )}
      </section>
    </main>
  );
}
