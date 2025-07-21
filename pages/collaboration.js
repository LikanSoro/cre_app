import Navbar from '../components/Navbar';
import CommentsSection from '../components/CommentsSection';
import ActivityFeed from '../components/ActivityFeed';
export default function Collaboration() {
  return (
    <div><Navbar/><main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Team Collaboration</h1>
      <CommentsSection/>
      <ActivityFeed/>
    </main></div>
  );
}