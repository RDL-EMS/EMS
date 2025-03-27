import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ({ punctual, late, total }) => {
  const data = {
    labels: ["Punctual", "Late"],
    datasets: [
      {
        data: [punctual, late],
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
