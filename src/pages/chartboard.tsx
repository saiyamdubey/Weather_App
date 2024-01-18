import React, { useState, useEffect } from "react";
import axios from "axios";
import "@/styles/chartboard.scss";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler,
  BarElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  BarElement,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

type salesData = {
  time: string;
  temperature_2m: string;
};

function BarChart() {
  const [salesData, setSalesData] = useState<salesData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.open-meteo.com/v1/forecast?latitude=26.4652&longitude=80.3498&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m"
        );
        setSalesData(response.data.hourly);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!salesData || salesData.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  const data = {
    labels: salesData.time.slice(0, 10), // Include only the first 10 elements
    datasets: [
      {
        label: "Temperature",
        data: salesData.temperature_2m.slice(0, 10), // Include only the first 10 elements
        backgroundColor: "#cb0c9f",
        borderWidth: 1,
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(255, 159, 64)",
          "rgba(255, 205, 86)",
          "rgba(75, 192, 192)",
          "rgba(54, 162, 235)",
          "rgba(153, 102, 255)",
          "rgba(201, 203, 207)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
    responsive: true,
    scales: {
      y: {
        ticks: {
          font: {
            size: 15,
          },
        },
        title: {
          display: true,
          text: "Temperature",
          padding: {
            bottom: 10,
          },
          font: {
            size: 20,
          },
        },
      },
      x: {
        type: "category",
        ticks: {
          font: {
            size: 17,
            weight: "bold",
          },
        },
        title: {
          display: true,
          text: "Time",
          padding: {
            top: 10,
          },
          font: {
            size: 30,
            style: "italic",
            family: "Arial",
          },
        },
      },
    },
  };

  return (
    <div>
      <h1 className="chartarea">Bar Chart</h1>
      <div className="chart">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default BarChart;
