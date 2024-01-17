"use client";

import dotenv from "dotenv";
dotenv.config();
import Image from "next/image";
import "./styles/weathersection.scss";
import sun from "../../public/images/sun4rb.png";
import { FaWind, FaTemperatureThreeQuarters } from "react-icons/fa6";
import { CgDanger } from "react-icons/cg";
import { IoMdSearch } from "react-icons/io";
import { IoRainy } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { WeatherfullData } from "../../Api/getdatafromapi";
import axios from "axios";
import citydata from "../../public/city.json";
import { newcityname } from "../../utilities/capitalizeFirstLetter";

type icontype = {
  color: string;
  fontSize: string;
};

const Weathersection = () => {
  let iconStyles: icontype = { color: "white", fontSize: "1.5em" };

  const [searchdata, setsearchdata] = useState<string>("Kanpur");
  const [data, setdata] = useState<WeatherfullData>();
  const [datacity, setdatacity] = useState<string>(searchdata);

  const apiKey: string = process.env.SECRET_API_WEATHER_KEY!;
  const city: string = datacity;
  // 066caad213454ab6b80130212241301 dont try to use it in your system
  // make it on your own from the weatherapi.com site

  const apiUrl: string =
    `https://api.weatherapi.com/v1/current.json?key=066caad213454ab6b80130212241301&q=` +
    city;

  useEffect(() => {
    const getdata = async (): Promise<void> => {
      try {
        const response = await axios.get(apiUrl);
        setdata(response.data);
      } catch (error: any) {
        console.error("Error getting data:", error.message);
      }
    };
    getdata();
  }, [apiUrl, datacity]);

  return (
    <>
      <div className="currentweather">
        <div className="section1">
          <div className="search">
            <input
              type="text"
              title="search"
              value={searchdata}
              placeholder=" Search for cities"
              onChange={(e) => {
                setsearchdata(e.target.value);
              }}
            />
            <div className="linkcity">
              <ul className="city">
                {searchdata == "Kanpur" || searchdata == ""
                  ? ""
                  : citydata
                      .filter((city) => {
                        return city.cityName
                          .toLowerCase()
                          .includes(searchdata.toLowerCase());
                      })
                      .map((city, index) => (
                        <li
                          onClick={() => {
                            setsearchdata(city.cityName);
                          }}
                          className="maincitylink"
                          key={index}
                        >
                          {newcityname(city.cityName)}
                        </li>
                      ))}
              </ul>
            </div>
            <IoMdSearch
              className="searchicon"
              onClick={() => {
                setdatacity(searchdata);
                setsearchdata("");
              }}
              style={iconStyles}
            />
          </div>
          <h1>{data === undefined ? "" : data?.location.name}</h1>
          <h4>
            {data === undefined ? "" : data?.location.region},
            {data === undefined ? "" : data?.location.country}
          </h4>
          <h1 className="mainicon">
            <img
              src={data === undefined ? " " : data?.current.condition.icon}
              title="."
              className="realicon"
            />
          </h1>
          <h1 className="temperature">
            {data === undefined ? "" : data?.current.temp_c} <sub>°C</sub>
          </h1>
          <p className="fehrenheit">
            {data === undefined ? "" : data?.current.temp_f} <sup>°F</sup>
          </p>
          <p className="date">
            {data === undefined
              ? ""
              : new Date().toJSON().slice(0, 10).replace(/-/g, " : ")}
          </p>
          <Image src={sun} alt="" priority className="icon" />
          <div className="moredetails">
            <p className="heading">Today`s Forecast</p>
            <div className="grid-container">
              <div className="rectangle">
                <div className="tmpicon">
                  <FaTemperatureThreeQuarters
                    className="icon1"
                    style={iconStyles}
                  />
                </div>
                <div className="something">
                  <h3>Humidity</h3>
                  <h2>{data === undefined ? "" : data?.current.humidity} %</h2>
                </div>
              </div>
              <div className="rectangle">
                <div className="tmpicon">
                  <FaWind className="icon1" style={iconStyles} />
                </div>
                <div className="something">
                  <h3>Wind</h3>
                  <h2>
                    {data === undefined ? "" : data?.current.wind_kph} km/h
                  </h2>
                </div>
              </div>
              <div className="rectangle">
                <div className="tmpicon">
                  <IoRainy className="icon1" style={iconStyles} />
                </div>
                <div className="something">
                  <h3>Chance of Rain</h3>
                  <h2>{data === undefined ? "" : data?.current.precip_mm} %</h2>
                </div>
              </div>
              <div className="rectangle">
                <div className="tmpicon">
                  <CgDanger className="icon1" style={iconStyles} />
                </div>
                <div className="something">
                  <h3>UV Index</h3>
                  <h2>{data === undefined ? "" : data?.current.uv}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weathersection;
