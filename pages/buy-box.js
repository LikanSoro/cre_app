import { useState, useEffect } from 'react';

export default function BuyBoxPage() {
  const [evalData, setEvalData] = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    fetch('/api/evaluate', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        dealData: {/* full dealData */},
        criteria: { irr:0.12, capRate:0.08, coc:0.10 }
      })
    })
      .then(res=>res.ok?res.json():Promise.reject(res.statusText))
      .then(data=>setEvalData(data.evaluation))
      .catch(err=>setError(err))
      .finally(()=>setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Evaluating…</p>;
  if (error)   return <p className="p-4 text-red-600">Error: {error}</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Buy‑Box Evaluation</h1>
      <div className="space-y-3">
        <p><span className="font-semibold">Meets Criteria:</span> {evalData.meetsCriteria?'Yes':'No'}</p>
        <p><span className="font-semibold">Reasons:</span> {evalData.reasons.join('; ')}</p>
        <p><span className="font-semibold">Suggestions:</span> {evalData.suggestions.join('; ')}</p>
      </div>
    </div>
  );
}
