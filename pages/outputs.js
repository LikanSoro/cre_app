import Navbar from '../components/Navbar';
import ExportButtons from '../components/ExportButtons';
export default function Outputs() {
  return (
    <div><Navbar/><main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Auto­Generated Outputs</h1>
      <ExportButtons/>
    </main></div>
  );
}