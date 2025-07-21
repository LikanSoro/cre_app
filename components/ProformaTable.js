export default function ProformaTable() {
  return (
    <table className="min-w-full bg-white">
      <thead><tr><th>Year</th><th>Income</th><th>Expenses</th><th>Net</th></tr></thead>
      <tbody>
        {[1,2,3,4,5].map(y=>(
          <tr key={y}><td className="border px-2">{y}</td><td className="border px-2">$100k</td><td className="border px-2">$50k</td><td className="border px-2">$50k</td></tr>
        ))}
      </tbody>
    </table>
  );
}