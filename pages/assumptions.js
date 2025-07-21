import { useState, useEffect } from 'react';

export default function AssumptionsPage() {
  const [assumptions, setAssumptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    fetch('/api/assumptions', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ summary: {/* summary JSON */}, model: {/* model JSON */} })
    })
      .then(res => res.ok?res.json():Promise.reject(res.statusText))
      .then(data => setAssumptions(data.assumptions))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Loading assumptions…</p>;
  if (error)   return <p className="p-4 text-red-600">Error: {error}</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Underwriting Assumptions</h1>
      <ul className="list-disc list-inside space-y-2">
        {assumptions.map((a,i)=>(
          <li key={i}>
            <span className="font-semibold">{a.name}:</span> {a.value ?? '—'}
          </li>
        ))}
      </ul>
    </div>
  );
}
