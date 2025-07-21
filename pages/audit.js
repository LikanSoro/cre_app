import Navbar from '../components/Navbar';
import VersionHistory from '../components/VersionHistory';
export default function Audit() {
  return (
    <div><Navbar/><main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Audit Trail & Versioning</h1>
      <VersionHistory/>
    </main></div>
  );
}