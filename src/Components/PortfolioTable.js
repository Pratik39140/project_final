import { useState } from "react";

export default function PortfolioTable({ data, totalValue, totalGainLoss, onSelect, onDelete }) {
  const [search, setSearch] = useState("");

  // Dynamically filter as user types
  const filteredData = search
    ? data.filter(
        (a) =>
          a.name.toLowerCase().includes(search.toLowerCase()) ||
          a.category.toLowerCase().includes(search.toLowerCase())
      )
    : data;
  return (
    <div className="overflow-x-auto bg-white dark:bg-slate-800 shadow-lg rounded-lg p-6 border border-gray-100 dark:border-slate-700">
      <div className="flex gap-2 mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search by asset name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 dark:border-slate-600 p-3 pl-10 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-[#D4A017] focus:border-transparent outline-none transition-all duration-200"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        </div>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-slate-600">
            <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Asset</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Category</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300">Qty</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300">Buy</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300">Current</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300">Value</th>
            <th className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300">G/L</th>
            <th className="px-4 py-3 text-center font-semibold text-gray-700 dark:text-gray-300">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-slate-600">
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center py-8 text-gray-500 dark:text-gray-400">
                No assets found.
              </td>
            </tr>
          ) : (
            filteredData.map((a, i) => {
              const value = a.quantity * a.current;
              const gain = (a.current - a.buy) * a.quantity;
              return (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors duration-150">
                  <td className="px-4 py-3 cursor-pointer font-medium text-[#4B5EAA] dark:text-[#D4A017]" onClick={() => onSelect(a)}>{a.name}</td>
                  <td className="px-4 py-3">{a.category}</td>
                  <td className="px-4 py-3 text-right">{a.quantity}</td>
                  <td className="px-4 py-3 text-right">₹{a.buy}</td>
                  <td className="px-4 py-3 text-right">₹{a.current}</td>
                  <td className="px-4 py-3 text-right font-medium">₹{value}</td>
                  <td className={`px-4 py-3 text-right font-medium ${gain >= 0 ? "text-[#1A3C34]" : "text-[#B91C1C]"}`}>
                    {gain >= 0 ? "+" : ""}₹{gain}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button 
                      onClick={() => onDelete(i)} 
                      className="text-[#B91C1C] hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1 rounded-md transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
        <tfoot>
          <tr className="border-t border-gray-200 dark:border-slate-600 font-bold">
            <td colSpan="5" className="px-4 py-4">Total</td>
            <td className="px-4 py-4 text-right">₹{totalValue}</td>
            <td className={`px-4 py-4 text-right ${totalGainLoss >= 0 ? "text-[#1A3C34]" : "text-[#B91C1C]"}`}>
              {totalGainLoss >= 0 ? "+" : ""}₹{totalGainLoss}
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}