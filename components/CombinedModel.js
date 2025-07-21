// components/CombinedModel.js
import { useEffect, useState } from 'react';
import ModelTabs              from './ModelTabs';

export default function CombinedModel({ dealData, onNext }) {
  const [loading, setLoading] = useState(true);
  const [data, setData]       = useState(null);
  const [error, setError]     = useState('');

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/fetch-data?address=${encodeURIComponent(dealData.address)}`
    )
      .then(async res => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Fetch failed');
        setData(json);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch data');
      })
      .finally(() => setLoading(false));
  }, [dealData.address]);

  if (loading) return <p className="text-gray-600">Loading data…</p>;
  if (error)   return <p className="text-red-500">{error}</p>;

  return <ModelTabs data={data} onContinue={() => onNext(data)} />;
}
