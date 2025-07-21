export default function VersionHistory() {
  const versions=['v1 - initial upload','v2 - updated rents','v3 - adjusted cap rate'];
  return (
    <ul className="space-y-1 text-gray-700">
      {versions.map((v,i)=><li key={i}>{v}</li>)}
    </ul>
  );
}