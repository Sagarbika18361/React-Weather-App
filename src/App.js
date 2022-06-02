import "./App.css";
import SearchField from "react-search-field";
import FeatherIcon from "feather-icons-react";
import axios from "axios"
import { useState } from "react";
import { useEffect } from "react";


function App() {

  //2nd step set value of city by using setstate
  const [city,setCity]=useState("delhi");
  const [temp,setTemp]=useState("");
  const [wind,setWind]=useState("");
  const [humidity,setHumidity]=useState("");
  const [search,setSearch]=useState("delhi");
  const [pressure,setPressure]=useState("");

  //3rd step ,adding dynamically value to api 

  useEffect(()=>{
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=da2a1c0ce64968140189311cc36760b0`)
    .then((resp) =>{
      console.log(resp)
      setTemp(resp.data.main.temp)
      setWind(resp.data.wind.speed)
      setHumidity(resp.data.main.humidity)
      setPressure(resp.data.main.pressure)
      setCity(resp.data.name)
    })
  },[search])

  return (
    <>
      <div className="weather-box">
        <div className="innerbox">
          <div className="weather-header">
            <h1> Weather APP</h1>
          </div>
          <div className="weatherSearch">
           {/* this is first step  */}
            <SearchField
              placeholder="Search..."
              onSearchClick={(value) => {
                setSearch(value);
              }}
              searchText={search}
              classNames="weather-input w-75 mb-2"
            />
            <div className="weather-cloud mb-3">
              <FeatherIcon icon="cloud-rain" size="60px" color="white" />
            </div>
            <div className="weatherCity">
              <p className="text-white fw-bold">{city}</p>
            </div>
            <div className="weather-row row mb-4">
              <div className="weather-column col-6">
              <FeatherIcon icon="sun"  color="white" size="40px" />
               {/* <p className="text-white fw-bold" > Temp : { Math.floor(temp -273.15)} °C </p> */}
               <p className="text-white fw-bold" > Temp : { (temp - 273.15).toFixed(2)} °C </p>
              </div>
              <div className="weather-column col-6">
              <FeatherIcon icon="command" color="white" size="40px" />
              <p className="text-white fw-bold" > Pressure:{pressure} mmHg </p>
              </div>
              <div className="weather-column col-6">
              <FeatherIcon icon="cloud"  color="white"  size="40px"/>
               <p className="text-white fw-bold" > Humidity : {humidity} % </p>
              </div>
              <div className="weather-column col-6">
              <FeatherIcon icon="wind" color="white" size="40px"/>
              <p className="text-white fw-bold" > wind : {wind} mps </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default App;
