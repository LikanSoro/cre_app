export default function ActivityFeed() {
  const activities=['Tyler updated vacancy rate','Maria uploaded new T12','John approved deal'];
  return (
    <ul className="space-y-1">
      {activities.map((a,i)=><li key={i} className="text-gray-700">• {a}</li>)}
    </ul>
  );
}