// === components/RiskMeter.js ===
export default function RiskMeter({ riskLevel }) {
  const colors = {
    Low: "bg-green-400",
    Moderate: "bg-yellow-400",
    High: "bg-red-500",
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-2">🔥 Risk Meter</h2>
      <div className={`text-xl font-bold p-2 rounded ${colors[riskLevel]}`}>{riskLevel} Risk</div>
    </div>
  );
}
