
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
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow grid grid-cols-1 md:grid-cols-5 gap-2">
      <input name="name" value={form.name} onChange={handleChange} required placeholder="Asset Name" className="border p-2 rounded" />
      <select name="category" value={form.category} onChange={handleChange} className="border p-2 rounded">
        <option>Stock</option>
        <option>Bond</option>
        <option>Savings</option>
      </select>
      <input name="quantity" type="number" value={form.quantity} onChange={handleChange} placeholder="Qty" className="border p-2 rounded" />
      <input name="buy" type="number" value={form.buy} onChange={handleChange} placeholder="Buy ₹" className="border p-2 rounded" />
      <input name="current" type="number" value={form.current} onChange={handleChange} placeholder="Current ₹" className="border p-2 rounded" />
      <button type="submit" className="col-span-1 md:col-span-5 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">+ Add Asset</button>
    </form>
  );
}
