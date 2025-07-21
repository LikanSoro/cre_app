export default function SensitivitySliders() {
  const sliders=['Rent Growth','Exit Cap Rate','Expense Inflation','Vacancy Rate','Interest Rate'];
  return (
    <div className="space-y-4">
      {sliders.map(s=><div key={s}>
        <label className="block mb-1 font-medium">{s}</label>
        <input type="range" min="0" max="100" className="w-full"/>
      </div>)}
    </div>
  );
}