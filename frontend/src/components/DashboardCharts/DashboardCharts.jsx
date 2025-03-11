import React from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler  
} from "chart.js";

// Register required components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

const DashboardCharts = ({ stats }) => {
  // Line Chart Data
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Books Borrowed",
        data: [20, 35, 40, 50, 65, 80],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const pieData = {
    labels: ["Fiction", "Non-fiction", "Sci-Fi", "Romance"],
    datasets: [
      {
        label: "Genre Distribution",
        data: [30, 20, 25, 25],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Check-ins",
        data: [5, 10, 15, 20, 25, 30, 35],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  return (
    <div className="p-6">
      {/* Top section with Line and Pie Chart */}
      <div className="flex flex-wrap md:flex-nowrap gap-6 mb-6">
        <div className="flex-1 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-[orange]">Books Borrowed Over Time</h3>
          <Line data={lineData} />
        </div>
        <div className="w-1/3 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-[orange]">Genre Distribution</h3>
          <Pie data={pieData} />
        </div>
      </div>

      {/* Bottom section with Bar Chart and another box */}
      <div className="flex flex-wrap md:flex-nowrap gap-6">
        <div className="flex-1 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-[orange]">Daily Check-ins</h3>
          <Bar data={barData} />
        </div>
        {/* <div className="w-1/3 bg-white p-4 rounded-lg shadow-lg flex items-center justify-center">
          <p className="text-gray-600">Additional Info Here</p>
        </div> */}
      </div>
    </div>
  );
};

export default DashboardCharts;