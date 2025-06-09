import { useEffect, useState } from "react";
import { calculateTotal, calculateRiskLevel, getSuggestions, getCategoryStats } from "../lib/PortfolioUtils";

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("portfolio");
    if (stored) setPortfolio(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
  }, [portfolio]);

  const addAsset = (asset) => setPortfolio([...portfolio, asset]);

  const totalValue = calculateTotal(portfolio);
  const totalGainLoss = portfolio.reduce((acc, a) => acc + (a.current - a.buy) * a.quantity, 0);
  const categoryStats = getCategoryStats(portfolio);
  const riskLevel = calculateRiskLevel(categoryStats);
  const suggestions = getSuggestions(riskLevel, categoryStats);

  const deleteAsset = (index) => {
  const updated = [...portfolio];
  updated.splice(index, 1);
  setPortfolio(updated);
};

  return { portfolio, addAsset, totalValue,deleteAsset, totalGainLoss, categoryStats, riskLevel, suggestions };
}
