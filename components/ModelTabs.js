import React, { useState, useEffect } from 'react';

export default function ModelTabs({ dealData, onComplete }) {
  const tabs = ['Summary', 'Financial Model', 'Assumptions', 'Buy Box', 'Crime Rate'];
  const [current, setCurrent] = useState(0);

  // State for showing "loading" on each tab
  const [loading, setLoading] = useState(false);

  // Data storage for each step (null means not yet "fetched")
  const [stepData, setStepData] = useState({
    summary: null,
    model: null,
    assumptions: null,
    crime: null,
    evaluation: null,
  });

  // User inputs for Buy Box
  const [criteria, setCriteria] = useState({ irr: 0.12, capRate: 0.08, coc: 0.10 });
  const [purchasePrice, setPurchasePrice] = useState(18000000);
  const [initialInvestment, setInitialInvestment] = useState(5000000);

  // All mock data (unchanged)
  const MOCK_SUMMARY = {
    address: "12 Lakhtokia, Fancy Bazaar, Guwahati, Assam 781001, India",
    property_type: "Retail + Commercial",
    built_year: 2015,
    total_units: 10,
    occupancy: "100%",
    avg_monthly_rent: "₹15,000",
    highlights: [
      "Prime central business district location",
      "Footfall: 3,000+ daily",
      "Zero vacancy past 2 years"
    ]
  };

  const MOCK_MODEL = [
    { line: "Gross Potential Rent", value: "₹1,80,000" },
    { line: "Actual Collected Rent", value: "₹1,70,000" },
    { line: "Other Income", value: "₹10,000" },
    { line: "Operating Expenses", value: "₹60,000" },
    { line: "NOI", value: "₹1,20,000" },
    { line: "Cap Rate", value: "7.9%" }
  ];

  const MOCK_ASSUMPTIONS = [
    { name: "Vacancy Rate", value: "0%" },
    { name: "Expense Ratio", value: "35%" },
    { name: "Annual Rent Growth", value: "5%" },
    { name: "Annual Expense Growth", value: "4%" }
  ];

  const MOCK_BUYBOX = {
    meetsCriteria: true,
    reasons: [
      "NOI meets minimum threshold",
      "Cap rate within acceptable range",
      "Stable historical occupancy"
    ],
    suggestions: [
      "Negotiate minor rent escalations",
      "Consider small CapEx for façade improvement"
    ]
  };

  const MOCK_CRIME = {
    crime_rate: "Low",
    major_crimes: [
      "Petty theft (rare)",
      "No major violent crimes reported last 3 years"
    ],
    police_station_distance: "500m"
  };

  // Simulated backend delay in milliseconds
  const DELAY = 1200;

  // Effect to "fetch" data per step/tab
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      setStepData(prev => {
        switch (current) {
          case 0: return { ...prev, summary: MOCK_SUMMARY };
          case 1: return { ...prev, model: MOCK_MODEL };
          case 2: return { ...prev, assumptions: MOCK_ASSUMPTIONS };
          case 4: return { ...prev, crime: MOCK_CRIME };
          default: return prev;
        }
      });
    }, DELAY);

    return () => clearTimeout(timer);
  }, [current]);

  // Handle next tab or finish
  const handleNext = () => {
    if (current < tabs.length - 1) {
      setCurrent(c => c + 1);
    } else {
      // Compose deal and call onComplete (parent will handle localStorage and redirect)
      const deal = {
        address: stepData.summary?.address,
        summary: stepData.summary,
        model: stepData.model,
        assumptions: stepData.assumptions,
        buyBox: stepData.evaluation,
        crime: stepData.crime,
        purchasePrice,
        initialInvestment,
        criteria,
        added: new Date().toISOString(),
      };
      onComplete && onComplete(deal);
    }
  };

  // Evaluate Buy Box (simulated processing)
  const handleEvaluate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStepData(prev => ({ ...prev, evaluation: MOCK_BUYBOX }));
    }, DELAY);
  };

  return (
    <div className="space-y-4">
      {/* Tab bar */}
      <div className="flex space-x-4 border-b pb-2">
        {tabs.map((t, i) => (
          <button
            key={i}
            disabled
            className={`px-4 py-2 ${i === current ? 'border-b-2 border-brand text-brand' : 'text-gray-500'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="p-4 bg-card rounded min-h-[200px]">
        {loading && (
          <div className="flex items-center gap-2 text-lg font-semibold text-brand">
            <Loader /> Processing… Please wait
          </div>
        )}

        {/* Summary */}
        {current === 0 && !loading && <SummaryView summary={stepData.summary} />}

        {/* Financial Model */}
        {current === 1 && !loading && (
          <TableView
            title="Financial Model"
            rows={stepData.model?.map((m) => [m.line, m.value]) || []}
          />
        )}

        {/* Assumptions */}
        {current === 2 && !loading && (
          <TableView
            title="Assumptions"
            rows={stepData.assumptions?.map((a) => [a.name, a.value]) || []}
          />
        )}

        {/* Buy Box */}
        {current === 3 && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Purchase Price" value={purchasePrice} onChange={setPurchasePrice} />
              <InputField label="Initial Investment" value={initialInvestment} onChange={setInitialInvestment} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <InputField label="IRR (%)" value={criteria.irr * 100} onChange={(v) => setCriteria((c) => ({ ...c, irr: v / 100 }))} />
              <InputField label="Cap Rate (%)" value={criteria.capRate * 100} onChange={(v) => setCriteria((c) => ({ ...c, capRate: v / 100 }))} />
              <InputField label="CoC (%)" value={criteria.coc * 100} onChange={(v) => setCriteria((c) => ({ ...c, coc: v / 100 }))} />
            </div>
            <button
              onClick={handleEvaluate}
              className="btn-primary w-full mt-2"
              disabled={loading}
            >
              {loading ? 'Evaluating…' : 'Evaluate Deal'}
            </button>
            {stepData.evaluation && !loading && (
              <TableView
                title="Buy Box"
                rows={[
                  ['Meets Criteria', stepData.evaluation.meetsCriteria ? 'Yes' : 'No'],
                  ['Reasons', stepData.evaluation.reasons.join('; ')],
                  ['Suggestions', stepData.evaluation.suggestions.join('; ')]
                ]}
              />
            )}
          </>
        )}

        {/* Crime Rate */}
        {current === 4 && !loading && (
          <TableView
            title="Crime Rate"
            rows={stepData.crime
              ? Object.entries(stepData.crime).map(([k, v]) => [k.replace(/_/g, ' '), Array.isArray(v) ? v.join(', ') : String(v)])
              : []
            }
          />
        )}
      </div>

      {/* Nav button */}
      <button
        onClick={handleNext}
        className="btn-primary w-full"
        disabled={loading || (current === 3 && !stepData.evaluation)}
      >
        {current < tabs.length - 1 ? 'Next' : 'Finish'}
      </button>
    </div>
  );
}

/* ---------- Loader (animated spinner) ---------- */
function Loader() {
  return (
    <svg className="animate-spin h-5 w-5 text-brand" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

/* ---------- helpers ---------- */
function SummaryView({ summary }) {
  if (!summary) return <p>No summary.</p>;
  return (
    <div className="space-y-2">
      {Object.entries(summary).map(([k, v]) =>
        k === 'highlights'
          ? <div key={k}><strong>Highlights:</strong> <ul className="list-disc ml-5">{v.map((h, i) => <li key={i}>{h}</li>)}</ul></div>
          : <div key={k}><strong>{k.replace(/_/g, ' ')}:</strong> {String(v)}</div>
      )}
    </div>
  );
}

function TableView({ title, rows }) {
  if (!rows.length) return <p>No data.</p>;
  return (
    <>
      <h3 className="font-semibold mb-2">{title}</h3>
      <table className="w-full border text-left">
        <thead>
          <tr><th className="border px-2 py-1">Field</th><th className="border px-2 py-1">Value</th></tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
              <td className="border px-2 py-1">{r[0]}</td>
              <td className="border px-2 py-1">{r[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function InputField({ label, value, onChange }) {
  return (
    <div>
      <label className="block font-medium">{label}</label>
      <input
        type="number"
        step="0.1"
        className="w-full border rounded px-2 py-1 mt-1"
        value={value}
        onChange={e => onChange(parseFloat(e.target.value) || 0)}
      />
    </div>
  );
}
