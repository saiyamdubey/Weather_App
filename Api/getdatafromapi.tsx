const axios = require("axios");

export interface WeatherfullData {
  location: {
    name: string,
    region: string,
    country: string,
    lat: number,
    lon: number,
    tz_id: string,
    localtime_epoch: number,
    localtime: string,
  };
  current: {
    last_updated_epoch: number,
    last_updated: string,
    temp_c: number,
    temp_f: number,
    is_day: number,
    condition: {
      text: string,
      icon: string,
      code: number,
    },
    wind_mph: number,
    wind_kph: number,
    wind_degree: number,
    wind_dir: string,
    pressure_mb: number,
    pressure_in: number,
    precip_mm: number,
    precip_in: number,
    humidity: number,
    cloud: number,
    feelslike_c: number,
    feelslike_f: number,
    vis_km: number,
    vis_miles: number,
    uv: number,
    gust_mph: number,
    gust_kph: number,
  };
}
const apiKey = process.env.SECRET_API_WEATHER_KEY;
const city = "Kanpur";
const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

// axios
//   .get(apiUrl)
//   .then((response : WeatherfullData) => {
//     const weatherData = response ;
//     console.log("Weather Data:", weatherData);
//   })
//   .catch((error : any) => {
//     console.error("Error fetching weather data:", error.message || error);
//   });

  
  export const fetchdata = (): Promise<WeatherfullData> => {
    return new Promise((resolve, reject) => {
        axios.get("https://api.weatherapi.com/v1/current.json?key=066caad213454ab6b80130212241301&q=Kanpur").then((response : WeatherfullData) => {
            const data = response ;
            console.log("Weather Data:", data);
            resolve(data)
        }).catch((error : any) => {
            console.error("Error fetching weather data:", error.message || error);
            reject({error});
        });
      }
    );
  };
