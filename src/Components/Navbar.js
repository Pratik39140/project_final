// === components/Navbar.js ===
import Link from "next/link";

export default function Navbar() {  return (
    <nav className="bg-[#1A3C34] text-white p-4 shadow-lg mb-4 border-b border-[#D4A017]/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        <div className="text-xl font-bold tracking-tight flex items-center gap-2">
          <span className="text-[#D4A017]">💼</span> Portfolio Tracker
        </div>
        <div className="space-x-6 text-sm font-medium">
          <Link href="/" className="hover:text-[#D4A017] transition-colors duration-200 flex items-center gap-2">
            <span className="text-[#D4A017]">📊</span> Dashboard
          </Link>
          <button disabled className="text-gray-400 cursor-not-allowed opacity-50">
            <span className="flex items-center gap-2">
              <span>📈</span> Live Price Tracker
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
