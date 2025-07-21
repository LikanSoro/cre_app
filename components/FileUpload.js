import { useState } from 'react';

export default function FileUpload({ onNext }) {
  const [t12, setT12]           = useState(null);
  const [rentRoll, setRentRoll] = useState(null);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleUploadAndNext = async () => {
    setError('');
    setLoading(true);

    const form = new FormData();
    form.append('t12',      t12);
    form.append('rentRoll', rentRoll);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/parse`,
        {
          method: 'POST',
          body: form,
        }
      );

      // Read and parse response text
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`Unexpected response: ${text}`);
      }

      if (!res.ok) {
        throw new Error(data.error || `Status ${res.status}`);
      }

      // Advance to the next step with the parsed result
      onNext({ t12: data.t12, rentRoll: data.rentRoll });
    } catch (e) {
      console.error(e);
      setError(`Parsing failed: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const canUpload = t12 && rentRoll && !loading;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-gray-800 font-medium mb-1">
          T12 Excel/PDF
        </label>
        <input
          type="file"
          onChange={(e) => {
            setError('');
            setT12(e.target.files[0]);
          }}
          className="block w-full border border-gray-300 rounded p-2"
        />
      </div>

      <div>
        <label className="block text-gray-800 font-medium mb-1">
          Rent Roll Excel/PDF
        </label>
        <input
          type="file"
          onChange={(e) => {
            setError('');
            setRentRoll(e.target.files[0]);
          }}
          className="block w-full border border-gray-300 rounded p-2"
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleUploadAndNext}
        disabled={!canUpload}
        className={`btn-primary w-full justify-center ${
          !canUpload ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Parsing & Sending…' : 'Upload & Continue'}
      </button>
    </div>
  );
}
