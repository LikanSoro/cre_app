export default function DashboardCard({ title, value, icon }) {
  return (
    <div className="bg-surface p-6 rounded-2xl shadow-card hover:shadow-lg transition">
      <div className="flex items-center">
        <div className="p-3 bg-secondary/20 rounded-full text-secondary">{icon}</div>
        <div className="ml-4">
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-primary">{value}</p>
        </div>
      </div>
    </div>
  );
}