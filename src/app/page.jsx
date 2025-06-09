// === app/page.js ===
"use client";
import AssetForm
  from "../Components/AssetForm"
import PortfolioTable from "@/Components/PortfolioTable";
import AllocationChart from "../Components/AllocationChart"
import RiskMeter from "../Components/RiskMeter"
import Suggestions from "../Components/Suggestions";
import { usePortfolio } from "../hooks/usePortfolio";
import AssetDetail from "@/Components/AssetDetail";
import { useState } from "react";
import ExportPDF from "../Components/ExportPDF";
import { useRef } from "react";
import Navbar from "../Components/Navbar";


export default function HomePage() {
  const {
    portfolio,
    addAsset,
    deleteAsset,
    totalValue,
    totalGainLoss,
    categoryStats,
    riskLevel,
    suggestions,
  } = usePortfolio();

  const [selectedAsset, setSelectedAsset] = useState(null);
  const chartRef = useRef(null);

  const handleDeleteAsset = (index) => {
    deleteAsset(index);
    if (selectedAsset && portfolio[index]?.name === selectedAsset.name) {
      setSelectedAsset(null);
    }
  };

  return (
    <main className="p-4 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">📊 Mini Portfolio Tracker</h1>
      <AssetForm addAsset={addAsset} />
      <ExportPDF data={portfolio} suggestions={suggestions} chartRef={chartRef} />
      <PortfolioTable
        data={portfolio}
        totalValue={totalValue}
        totalGainLoss={totalGainLoss}
        onSelect={setSelectedAsset}
        onDelete={handleDeleteAsset}
      />
      {selectedAsset && (
        <AssetDetail asset={selectedAsset} onClose={() => setSelectedAsset(null)} />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AllocationChart ref={chartRef} categoryStats={categoryStats} />
        <RiskMeter riskLevel={riskLevel} />
      </div>
      <Suggestions suggestions={suggestions} />
    </main>
  );
}
