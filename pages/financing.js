import Navbar from '../components/Navbar';
import FinancingTools from '../components/FinancingTools';
export default function Financing() {
  return (
    <div><Navbar/><main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Financing Tools</h1>
      <FinancingTools/>
    </main></div>
  );
}