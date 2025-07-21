import Navbar from '../components/Navbar';
import CompsMap from '../components/CompsMap';
export default function Comps() {
  return (
    <div><Navbar/><main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Comps & Market Analytics</h1>
      <CompsMap/>
    </main></div>
  );
}