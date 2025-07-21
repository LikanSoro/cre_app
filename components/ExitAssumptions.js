export default function ExitAssumptions() {
  return (
    <div className="space-y-4">
      <div><label>Hold Period (yrs)</label><input type="number" defaultValue={5} className="border p-2 rounded"/></div>
      <div><label>Exit Cap Rate</label><input type="text" defaultValue="6%" className="border p-2 rounded"/></div>
    </div>
  );
}