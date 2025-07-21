// components/CriteriaForm.js
export default function CriteriaForm({ dealData, onFinish }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-3 text-center">Final Review & Submit</h2>
      <div className="text-gray-700 text-center mb-4">
        <div><strong>Address:</strong> {dealData.address}</div>
        <div className="mt-2 text-sm text-gray-500">(Mock: your deal will be saved and shown on the dashboard)</div>
      </div>
      <button
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg font-semibold mt-4 transition"
        onClick={() => onFinish({})}
      >
        Finish & Save Deal
      </button>
    </div>
  )
}
