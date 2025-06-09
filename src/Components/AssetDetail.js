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
    <div className="bg-yellow-100 border border-yellow-300 rounded p-4">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold">📄 {asset.name} (Detail View)</h2>
        <button onClick={onClose} className="text-red-500 hover:underline">✖ Close</button>
      </div>
      <div className="mt-2 text-sm">
        <p>Category: <strong>{asset.category}</strong></p>
        <p>Quantity: {asset.quantity}</p>
        <p>Buy Price: ₹{asset.buy}</p>
        <p>Current Price: ₹{asset.current}</p>
        <p>Value: ₹{value}</p>
        <p className={gain >= 0 ? "text-green-600" : "text-red-600"}>Gain/Loss: ₹{gain}</p>
        <p className="mt-2">📊 Estimated Risk: <strong>{risk}</strong></p>
        <p>💡 Suggestion: {suggestion}</p>
      </div>
    </div>
  );
}
