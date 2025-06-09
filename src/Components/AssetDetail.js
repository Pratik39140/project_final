export default function AssetDetail({ asset, onClose }) {
  const value = asset.quantity * asset.current;
  const gain = (asset.current - asset.buy) * asset.quantity;
  const risk = asset.category === "Stock" ? "High" : asset.category === "Bond" ? "Moderate" : "Low";
  const suggestion =
    risk === "High"
      ? "This asset is stock-based and may carry higher risk. Consider adding more bonds or savings."
      : risk === "Moderate"
      ? "This bond offers decent stability."
      : "Savings instruments are great for safety but may offer lower returns.";
  return (
    <div className="bg-[#4B5EAA]/5 dark:bg-slate-800/50 border border-[#4B5EAA]/20 dark:border-slate-700 rounded-lg p-6 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#4B5EAA] dark:text-[#D4A017] flex items-center gap-2">
          <span>📄</span> {asset.name}
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">(Detail View)</span>
        </h2>
        <button 
          onClick={onClose} 
          className="text-gray-500 hover:text-[#B91C1C] p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
        >
          ✖
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="space-y-3">
          <p className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-slate-700">
            <span className="text-gray-500 dark:text-gray-400">Category</span>
            <strong className="text-[#4B5EAA] dark:text-[#D4A017]">{asset.category}</strong>
          </p>
          <p className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-slate-700">
            <span className="text-gray-500 dark:text-gray-400">Quantity</span>
            <strong>{asset.quantity}</strong>
          </p>
          <p className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-slate-700">
            <span className="text-gray-500 dark:text-gray-400">Buy Price</span>
            <strong>₹{asset.buy}</strong>
          </p>
        </div>
        <div className="space-y-3">
          <p className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-slate-700">
            <span className="text-gray-500 dark:text-gray-400">Current Price</span>
            <strong>₹{asset.current}</strong>
          </p>
          <p className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-slate-700">
            <span className="text-gray-500 dark:text-gray-400">Total Value</span>
            <strong className="text-[#1A3C34] dark:text-green-400">₹{value}</strong>
          </p>
          <p className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-slate-700">
            <span className="text-gray-500 dark:text-gray-400">Gain/Loss</span>
            <strong className={gain >= 0 ? "text-[#1A3C34] dark:text-green-400" : "text-[#B91C1C] dark:text-red-400"}>
              {gain >= 0 ? "+" : ""}₹{gain}
            </strong>
          </p>
        </div>
      </div>
      <div className="mt-6 p-4 bg-white dark:bg-slate-700/30 rounded-lg border border-gray-200 dark:border-slate-600">
        <p className="flex items-center gap-2 mb-2 font-semibold">
          <span>📊</span> Risk Assessment
        </p>
        <div className={`
          inline-block px-3 py-1 rounded-full text-sm font-medium mb-3
          ${risk === 'High' ? 'bg-[#B91C1C]/10 text-[#B91C1C] dark:text-red-400' : ''}
          ${risk === 'Moderate' ? 'bg-[#D4A017]/10 text-[#D4A017]' : ''}
          ${risk === 'Low' ? 'bg-[#1A3C34]/10 text-[#1A3C34] dark:text-green-400' : ''}
        `}>
          {risk} Risk
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <span className="text-[#D4A017] mr-2">💡</span>
          {suggestion}
        </p>
      </div>
    </div>
  );
}
