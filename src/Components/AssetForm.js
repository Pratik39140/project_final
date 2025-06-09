
// === components/AssetForm.js ===
import { useState } from "react";

export default function AssetForm({ addAsset }) {
  const [form, setForm] = useState({ name: "", category: "Stock", quantity: "", buy: "", current: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = name === "quantity" || name === "buy" || name === "current"
      ? value.replace(/^0+(?=\d)/, '')
      : value;
    setForm({ ...form, [name]: sanitizedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAsset({
      ...form,
      quantity: Number(form.quantity),
      buy: Number(form.buy),
      current: Number(form.current)
    });
    setForm({ name: "", category: "Stock", quantity: "", buy: "", current: "" });
  };
  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-5 gap-4 border border-gray-100 dark:border-slate-700">
      <input 
        name="name" 
        value={form.name} 
        onChange={handleChange} 
        required 
        placeholder="Asset Name" 
        className="border border-gray-200 dark:border-slate-600 p-3 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-[#D4A017] focus:border-transparent outline-none transition-all duration-200" 
      />
      <select 
        name="category" 
        value={form.category} 
        onChange={handleChange} 
        className="border border-gray-200 dark:border-slate-600 p-3 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#D4A017] focus:border-transparent outline-none transition-all duration-200"
      >
        <option>Stock</option>
        <option>Bond</option>
        <option>Savings</option>
      </select>
      <input 
        name="quantity" 
        type="number" 
        value={form.quantity} 
        onChange={handleChange} 
        placeholder="Qty" 
        className="border border-gray-200 dark:border-slate-600 p-3 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-[#D4A017] focus:border-transparent outline-none transition-all duration-200" 
      />
      <input 
        name="buy" 
        type="number" 
        value={form.buy} 
        onChange={handleChange} 
        placeholder="Buy ₹" 
        className="border border-gray-200 dark:border-slate-600 p-3 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-[#D4A017] focus:border-transparent outline-none transition-all duration-200" 
      />
      <input 
        name="current" 
        type="number" 
        value={form.current} 
        onChange={handleChange} 
        placeholder="Current ₹" 
        className="border border-gray-200 dark:border-slate-600 p-3 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-[#D4A017] focus:border-transparent outline-none transition-all duration-200" 
      />
      <button 
        type="submit" 
        className="col-span-1 md:col-span-5 bg-[#1A3C34] text-white py-3 px-6 rounded-lg hover:bg-[#1A3C34]/90 font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow focus:ring-2 focus:ring-[#D4A017] focus:ring-offset-2 dark:focus:ring-offset-slate-800"
      >
        <span className="text-[#D4A017]">+</span> Add Asset
      </button>
    </form>
  );
}
