import { toArray } from "../utils/toArray.js";

export default function ResultSection({ title, items, emptyText }) {
  const values = toArray(items);

  return (
    <section className="result-section">
      <h3 className="section-title">{title}</h3>
      {!values.length ? (
        <p className="muted">{emptyText}</p>
      ) : (
        <ul className="bullet-list">
          {values.map((item, index) => (
            <li key={`${title}-${index}`}>{String(item)}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
