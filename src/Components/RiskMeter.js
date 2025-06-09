// === components/RiskMeter.js ===
export default function RiskMeter({ riskLevel }) {
  const colors = {
    Low: "bg-green-400",
    Moderate: "bg-yellow-400",
    High: "bg-red-500",
  };
  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-lg p-6 border border-gray-100 dark:border-slate-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
        <span className="text-[#D4A017]">🔥</span> Risk Meter
      </h2>
      <div className={`
        text-xl font-bold p-4 rounded-lg text-center transition-colors duration-200
        ${riskLevel === 'Low' ? 'bg-[#1A3C34]/10 text-[#1A3C34] dark:bg-[#1A3C34]/20 dark:text-green-400' : ''}
        ${riskLevel === 'Moderate' ? 'bg-[#D4A017]/10 text-[#D4A017] dark:bg-[#D4A017]/20' : ''}
        ${riskLevel === 'High' ? 'bg-[#B91C1C]/10 text-[#B91C1C] dark:bg-[#B91C1C]/20 dark:text-red-400' : ''}
      `}>
        {riskLevel} Risk Level
      </div>
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        {riskLevel === 'Low' && 'Your portfolio has a conservative risk profile.'}
        {riskLevel === 'Moderate' && 'Your portfolio has a balanced risk profile.'}
        {riskLevel === 'High' && 'Your portfolio has an aggressive risk profile.'}
      </div>
    </div>
  );
}
