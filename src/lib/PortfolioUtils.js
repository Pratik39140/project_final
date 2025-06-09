
// === lib/portfolioUtils.js ===
export function calculateTotal(data) {
  return data.reduce((acc, a) => acc + a.current * a.quantity, 0);
}

export function getCategoryStats(data) {
  const totals = {};
  const totalValue = calculateTotal(data);
  data.forEach((a) => {
    totals[a.category] = (totals[a.category] || 0) + a.current * a.quantity;
  });
  const result = {};
  for (let k in totals) result[k] = Math.round((totals[k] / totalValue) * 100);
  return result;
}

export function calculateRiskLevel(stats) {
  const stocks = stats.Stock || 0;
  const bonds = stats.Bond || 0;
  const savings = stats.Savings || 0;
  if (stocks > 70) return "High";
  if (stocks + bonds > 70) return "Moderate";
  return "Low";
}

export function getSuggestions(risk, stats) {
  const tips = [];
  if (risk === "High") tips.push("You’re heavily invested in stocks. Diversify with bonds or savings.");
  if ((stats.Savings || 0) < 10) tips.push("Your savings allocation is quite low. Consider adding liquid funds.");
  if ((stats.Bond || 0) < 20) tips.push("Add more bonds for stability.");
  return tips;
}
