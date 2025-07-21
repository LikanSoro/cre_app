// components/NewDealForm.js
import { useState } from 'react';
import Papa from 'papaparse';

export default function NewDealForm() {
  const [address, setAddress]           = useState('');
  const [assetClass, setAssetClass]     = useState('');
  const [t12File, setT12File]           = useState(null);
  const [rentRollFile, setRentRollFile] = useState(null);
  const [step, setStep]                 = useState(1);
  const [dealId, setDealId]             = useState(null);
  const [summary, setSummary]           = useState(null);
  const [model, setModel]               = useState(null);
  const [assumptions, setAssumptions]   = useState(null);
  const [crimeData, setCrimeData]       = useState(null);
  const [evaluation, setEvaluation]     = useState(null);
  const [criteria, setCriteria]         = useState({ irr:0.12, capRate:0.08, coc:0.10 });
  const [purchasePrice, setPurchasePrice]         = useState(0);
  const [initialInvestment, setInitialInvestment] = useState(0);
  const [error, setError]               = useState('');

  const API = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

  const parseCsv = file =>
    new Promise((res, rej) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: results => res(results.data),
        error: err => rej(err),
      });
    });

  const step1 = async () => {
    if (!address || !t12File || !rentRollFile) {
      setError('Address + both CSVs required');
      return;
    }
    setError('');
    setStep(2);

    // parse CSVs
    const [t12, rentRoll] = await Promise.all([
      parseCsv(t12File),
      parseCsv(rentRollFile),
    ]);

    // 1) /insights: create deal & summary
    const res1 = await fetch(`${API}/insights`, {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ address, assetClass, t12, rentRoll })
    });
    const j1 = await res1.json();
    if (!res1.ok) { setError(j1.error||'insights error'); return; }
    setDealId(j1.dealId);
    setSummary(j1.summary);
    setStep(3);
  };

  const step2 = async () => {
    // 2) /mapping
    const res2 = await fetch(`${API}/mapping`, {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ dealId, t12:summary.t12, rentRoll:summary.rentRoll, assetClass })
    });
    const j2 = await res2.json();
    if (!res2.ok) { setError(j2.error||'mapping error'); return; }
    setModel(j2.model);
    setStep(4);
  };

  const step3 = async () => {
    // 3) /assumptions
    const res3 = await fetch(`${API}/assumptions`, {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ dealId, summary, model })
    });
    const j3 = await res3.json();
    if (!res3.ok) { setError(j3.error||'assumptions error'); return; }
    setAssumptions(j3.assumptions);
    setStep(5);
  };

  const step4 = async () => {
    // 4) /crime-rate
    const res4 = await fetch(`${API}/crime-rate`, {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ dealId, address })
    });
    const j4 = await res4.json();
    if (!res4.ok) { setError(j4.error||'crime-rate error'); return; }
    setCrimeData(j4.crimeData);
    setStep(6);
  };

  const step5 = async () => {
    // 5) /evaluate
    const res5 = await fetch(`${API}/evaluate`, {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({
        dealId,
        dealData: { address, assetClass, summary, model, assumptions, crimeData, purchasePrice, initialInvestment },
        criteria
      })
    });
    const j5 = await res5.json();
    if (!res5.ok) { setError(j5.error||'evaluate error'); return; }
    setEvaluation(j5.evaluation);
    setStep(7);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-6 bg-white rounded shadow">
      {error && <p className="text-red-600">{error}</p>}

      {step === 1 && (
        <>
          <h2 className="text-xl font-semibold">Step 1: Upload Data</h2>
          <input placeholder="Address" value={address} onChange={e=>setAddress(e.target.value)} className="w-full border rounded p-2" />
          <input type="text" placeholder="Asset Class" value={assetClass} onChange={e=>setAssetClass(e.target.value)} className="w-full border rounded p-2" />
          <input type="file" accept=".csv" onChange={e=>setT12File(e.target.files[0])} />
          <input type="file" accept=".csv" onChange={e=>setRentRollFile(e.target.files[0])} />
          <button onClick={step1} className="btn-primary">Create Deal & Summary</button>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-xl font-semibold">Step 2: Financial Model</h2>
          <pre className="overflow-auto bg-gray-100 p-2">{JSON.stringify(summary, null,2)}</pre>
          <button onClick={step2} className="btn-primary">Generate Model</button>
        </>
      )}

      {step === 3 && (
        <>
          <h2 className="text-xl font-semibold">Step 3: Assumptions</h2>
          <pre className="overflow-auto bg-gray-100 p-2">{JSON.stringify(model, null,2)}</pre>
          <button onClick={step3} className="btn-primary">Generate Assumptions</button>
        </>
      )}

      {step === 4 && (
        <>
          <h2 className="text-xl font-semibold">Step 4: Crime Rate</h2>
          <pre className="overflow-auto bg-gray-100 p-2">{JSON.stringify(assumptions, null,2)}</pre>
          <button onClick={step4} className="btn-primary">Fetch Crime Rate</button>
        </>
      )}

      {step === 5 && (
        <>
          <h2 className="text-xl font-semibold">Step 5: Evaluate Deal</h2>
          <pre className="overflow-auto bg-gray-100 p-2">{JSON.stringify(crimeData, null,2)}</pre>
          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Purchase Price" value={purchasePrice} onChange={e=>setPurchasePrice(+e.target.value)} className="border rounded p-2" />
            <input type="number" placeholder="Initial Investment" value={initialInvestment} onChange={e=>setInitialInvestment(+e.target.value)} className="border rounded p-2" />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-2">
            <input type="number" placeholder="IRR (%)"     value={criteria.irr*100}      onChange={e=>setCriteria(c=>({...c,irr:+e.target.value/100}))} className="border rounded p-2" />
            <input type="number" placeholder="Cap Rate (%)"value={criteria.capRate*100}  onChange={e=>setCriteria(c=>({...c,capRate:+e.target.value/100}))} className="border rounded p-2" />
            <input type="number" placeholder="CoC (%)"     value={criteria.coc*100}      onChange={e=>setCriteria(c=>({...c,coc:+e.target.value/100}))} className="border rounded p-2" />
          </div>
          <button onClick={step5} className="btn-primary mt-4">Evaluate</button>
        </>
      )}

      {step === 6 && (
        <>
          <h2 className="text-xl font-semibold">Results</h2>
          <pre className="overflow-auto bg-gray-100 p-2">{JSON.stringify(evaluation, null,2)}</pre>
        </>
      )}
    </div>
  );
}
