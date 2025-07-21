import Navbar from '../components/Navbar';
import CapitalStackChart from '../components/CapitalStackChart';
export default function CapitalStack() {
  return (
    <div><Navbar/><main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Capital Stack Modeling</h1>
      <CapitalStackChart/>
    </main></div>
  );
}