// === components/Navbar.js ===
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md mb-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold">💼 Portfolio Tracker</div>
        <div className="space-x-4 text-sm">
          <Link href="/" className="hover:underline">Dashboard</Link>
          <button disabled className="text-gray-400">Live Price Tracker</button>
        </div>
      </div>
    </nav>
  );
}
