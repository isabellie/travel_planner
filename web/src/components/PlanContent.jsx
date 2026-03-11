import { useState } from "react";
import DailyPlanSection from "./DailyPlanSection.jsx";
import ResultSection from "./ResultSection.jsx";

export default function PlanContent({ plan }) {
  const tabs = [
    {
      id: "dailyPlan",
      label: "Dagsplan",
      title: "Dagsplan"
    },
    {
      id: "activities",
      label: "Aktiviteter",
      title: "Aktiviteter",
      field: "activities",
      emptyText: "Ingen aktiviteter mottatt."
    },
    {
      id: "restaurants",
      label: "Restauranter",
      title: "Restauranter",
      field: "restaurants",
      emptyText: "Ingen restaurantforslag mottatt."
    },
    {
      id: "hiddenGems",
      label: "Skjulte perler",
      title: "Skjulte perler",
      field: "hiddenGems",
      emptyText: "Ingen skjulte perler mottatt."
    },
    {
      id: "packingList",
      label: "Pakkeliste",
      title: "Pakkeliste",
      field: "packingList",
      emptyText: "Ingen pakkeliste mottatt."
    }
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const selectedTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  return (
    <>
      <div className="tabs-row" role="tablist" aria-label="Plan-seksjoner">
        {tabs.map((tab) => {
          const isActive = tab.id === selectedTab.id;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`tab-button ${isActive ? "active" : ""}`.trim()}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="result-meta">
        <span className="meta-chip">{`Reisemal: ${plan.destination || "Ukjent"}`}</span>
        <span className="meta-chip">{`Antall dager: ${plan.days || "-"}`}</span>
      </div>

      <div className="tab-panel" role="tabpanel" aria-label={selectedTab.title}>
        {selectedTab.id === "dailyPlan" ? (
          <DailyPlanSection days={plan.dailyPlan} />
        ) : (
          <ResultSection
            title={selectedTab.title}
            items={plan[selectedTab.field]}
            emptyText={selectedTab.emptyText}
          />
        )}
      </div>
    </>
  );
}
