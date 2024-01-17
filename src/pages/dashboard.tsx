import Navbar from "@/components/navbar";
import "../styles/dashboard.scss";
import Weathersection from "@/components/weathersection";
import Chartboard from "../pages/chartboard";

const Dashboard = () => {
  
  return (
    <>
      <div className="main">
        <div className="container">
          <Navbar />
          <Weathersection />
          <Chartboard />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
