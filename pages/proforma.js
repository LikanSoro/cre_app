import Navbar from '../components/Navbar';
import ProformaTable from '../components/ProformaTable';
export default function Proforma() {
  return (
    <div><Navbar/><main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Operating Pro Forma</h1>
      <ProformaTable/>
    </main></div>
  );
}