import { forwardRef } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const AllocationChart = forwardRef(({ categoryStats }, ref) => {
  const labels = Object.keys(categoryStats);
  const data = Object.values(categoryStats);
  return (
    <div ref={ref} className="bg-white dark:bg-slate-800 shadow-lg rounded-lg p-6 border border-gray-100 dark:border-slate-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
        <span className="text-[#D4A017]">📈</span> Asset Allocation
      </h2>
      <div className="relative">
        <Pie
          data={{
            labels,
            datasets: [{ 
              data, 
              backgroundColor: ["#1A3C34", "#4B5EAA", "#D4A017"],
              borderColor: "white",
              borderWidth: 2,
            }],
          }}
          options={{
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  usePointStyle: true,
                  padding: 20,
                  color: '#4B5EAA',
                  font: {
                    size: 12,
                    family: "'Geist', sans-serif"
                  }
                }
              }
            },
            animation: {
              animateScale: true,
              animateRotate: true
            },
            maintainAspectRatio: true,
            responsive: true
          }}
        />
      </div>
    </div>
  );
});

export default AllocationChart;
