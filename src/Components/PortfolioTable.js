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
    <div className="overflow-x-auto bg-white shadow rounded p-4">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by asset name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full max-w-md"
        />
      </div>
      <table className="w-full text-sm text-left">
        <thead>
          <tr>
            <th>Asset</th>
            <th>Category</th>
            <th>Qty</th>
            <th>Buy</th>
            <th>Current</th>
            <th>Value</th>
            <th>G/L</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center py-4">
                No assets found.
              </td>
            </tr>
          ) : (
            filteredData.map((a, i) => {
              const value = a.quantity * a.current;
              const gain = (a.current - a.buy) * a.quantity;
              return (
                <tr key={i} className="border-t hover:bg-blue-50">
                  <td onClick={() => onSelect(a)} className="cursor-pointer">{a.name}</td>
                  <td>{a.category}</td>
                  <td>{a.quantity}</td>
                  <td>₹{a.buy}</td>
                  <td>₹{a.current}</td>
                  <td>₹{value}</td>
                  <td className={gain >= 0 ? "text-green-600" : "text-red-600"}>₹{gain}</td>
                  <td>
                    <button onClick={() => onDelete(i)} className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
        <tfoot>
          <tr className="font-bold">
            <td colSpan="5">Total</td>
            <td>₹{totalValue}</td>
            <td className={totalGainLoss >= 0 ? "text-green-600" : "text-red-600"}>₹{totalGainLoss}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}