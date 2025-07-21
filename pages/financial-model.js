import { useState, useEffect } from 'react';

export default function FinancialModelPage() {
  const [model, setModel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    fetch('/api/mapping', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        t12:{/* your parsed T12 JSON */},
        rentRoll:{/* your parsed RentRoll JSON */},
        assetClass:'Multifamily'
      })
    })
      .then(res => res.ok?res.json():Promise.reject(res.statusText))
      .then(data => setModel(data.model))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Loading model…</p>;
  if (error)   return <p className="p-4 text-red-600">Error: {error}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Financial Model</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2 text-left">Line Item</th>
            <th className="border px-3 py-2 text-left">Value</th>
          </tr>
        </thead>
        <tbody>
          {model.map((r,i)=>(
            <tr key={i} className={i%2?'':'bg-gray-50'}>
              <td className="border px-3 py-2">{r.line}</td>
              <td className="border px-3 py-2">{r.value ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
