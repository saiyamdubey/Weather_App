"use client"

import Navbar from "@/components/navbar";
import "../styles/dashboard.scss";
import Weathersection from "@/components/weathersection";
import Chartboard from "../pages/chartboard";
import { useState } from "react";

const Dashboard: React.FC = () => {
  const [toggle, settoggle] = useState(true);

  const toggleComponent = (): void => {
    settoggle(!toggle);
  };

  return (
    <>
      <div className="main">
        <div className="container">
          <Navbar toggleComponent={toggleComponent} />
          {toggle ? <Weathersection /> : <Chartboard />}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
