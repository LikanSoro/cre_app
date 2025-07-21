import Navbar from '../components/Navbar';
import ScoringBadge from '../components/ScoringBadge';
export default function Scoring() {
  return (
    <div><Navbar/><main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Deal Scoring Engine</h1>
      <ScoringBadge score="A+"/>
    </main></div>
  );
}