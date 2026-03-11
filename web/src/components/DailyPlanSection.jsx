import { toArray } from "../utils/toArray.js";

export default function DailyPlanSection({ days }) {
  const plan = toArray(days);

  return (
    <section className="result-section">
      <h3 className="section-title">Dagsplan</h3>
      {!plan.length ? (
        <p className="muted">Ingen dagsplan mottatt.</p>
      ) : (
        <div className="day-grid">
          {plan.map((item, index) => {
            const dayNumber = Number(item?.day) || index + 1;
            const dayTitle = item?.title ? String(item.title) : "Plan";

            return (
              <article className="day-card" key={`day-${dayNumber}-${index}`}>
                <h4>{`Dag ${dayNumber}: ${dayTitle}`}</h4>
                <ul className="bullet-list">
                  {toArray(item?.activities).map((activity, activityIndex) => (
                    <li key={`day-${dayNumber}-activity-${activityIndex}`}>{String(activity)}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
