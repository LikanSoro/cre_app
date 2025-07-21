import { useState } from 'react';

export default function AddressAutocomplete({ onNext }) {
  const [address, setAddress] = useState('');

  return (
    <div className="bg-cardDark p-6 rounded-xl shadow-card">
      <label className="block text-gray-800 mb-2 font-medium">
        Property Address
      </label>
      <input
        type="text"
        value={address}
        onChange={e => setAddress(e.target.value)}
        placeholder="Enter property address"
        className="w-full p-2 mb-4 rounded bg-surfaceDark text-gray-800 border border-gray-600"
      />
      <button
        onClick={() => onNext(address)}
        disabled={!address}
        className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}
