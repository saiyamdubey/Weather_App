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

type SalesData = {
  time: string;
  temperature_2m: string;
};

function BarChart() {
  const [salesData, setSalesData] = useState<SalesData[] | null>(null);

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

  const labels = salesData.map((data) => data.time.slice(0, 10));
  const temperatures = salesData.map((data) =>
    data.temperature_2m.slice(0, 10)
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Temperature",
        data: temperatures,
        backgroundColor: [
          "rgba(255, 100, 0)",
          "rgba(255, 159, 64)",
          "rgba(25, 12, 64)",
          "rgba(252, 5, 4)",
          "rgba(25, 159, 254)",
          "rgba(5, 100, 200)",
          "rgba(255, 205, 86)",
          "rgba(75, 192, 192)",
          "rgba(54, 162, 235)",
          "rgba(153, 102, 255)",
          "rgba(201, 203, 207)",
        ],
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#fff',
          font: {
            size: 12
          }
        }
      }
    },
    responsive: true,
    scales: {
      y: {
        ticks: {
          color: '#fff',
          font: {
            size: 15
          }
        },
        title: {
          display: true,
          color: '#fff',
          text: 'Temperature',
          padding: {
            bottom: 2
          },
          font: {
            size: 16
          }
        }
      },
      x: {
        type: 'category',
        ticks: {
          color: '#fff',
          font: {
            size: 10
          }
        },
        title: {
          color: '#fff',
          display: true,
          text: 'Time in Hourly basis',
          padding: {
            top: 15
          },
          font: {
            size: 15
          }
        }
      }
    }
  };
  return (
    <div className="main_chart">
      <h1 className="chartarea">Bar Chart</h1>
      <div className="chart">
        <Bar data={data}/>
      </div>
    </div>
  );
}

export default BarChart;
