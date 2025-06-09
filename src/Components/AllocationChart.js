import { forwardRef } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const AllocationChart = forwardRef(({ categoryStats }, ref) => {
  const labels = Object.keys(categoryStats);
  const data = Object.values(categoryStats);

  return (
    <div ref={ref} className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-2">📈 Asset Allocation</h2>
      <Pie
        data={{
          labels,
          datasets: [{ data, backgroundColor: ["#60a5fa", "#34d399", "#fbbf24"] }],
        }}
      />
    </div>
  );
});

export default AllocationChart;
