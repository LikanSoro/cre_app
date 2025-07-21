import { useState, useEffect } from 'react';

export default function SummaryPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    fetch('/api/insights', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: '123 Main St, Mumbai, India' }),
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
      .then(data => setSummary(data.summary))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Loading summary…</p>;
  if (error)   return <p className="p-4 text-red-600">Error: {error}</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Deal Summary</h1>
      <dl className="grid gap-4">
        {Object.entries(summary).map(([k,v]) => (
          <div key={k}>
            <dt className="font-semibold capitalize">{k.replace(/([A-Z])/g,' $1')}</dt>
            <dd className="ml-4">
              {Array.isArray(v)
                ? <ul className="list-disc list-inside">{v.map((x,i)=><li key={i}>{x}</li>)}</ul>
                : v}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
