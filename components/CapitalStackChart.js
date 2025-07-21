import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
export default function CapitalStackChart() {
  const data=[{name:'Equity',value:40},{name:'Debt',value:50},{name:'Mezz',value:10}];
  const colors=['#3b82f6','#10b981','#f59e0b'];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={100}>
          {data.map((entry,i)=><Cell key={i} fill={colors[i]}/>)}
        </Pie>
        <Tooltip/>
      </PieChart>
    </ResponsiveContainer>
  );
}