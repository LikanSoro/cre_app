import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
export default function ChartWrapper() {
  const data=[{name:'Jan',value:400},{name:'Feb',value:300},{name:'Mar',value:500}];
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}><XAxis dataKey="name"/><YAxis/><Tooltip/><Line type="monotone" dataKey="value" stroke="#3b82f6"/></LineChart>
      </ResponsiveContainer>
    </div>
  );
}