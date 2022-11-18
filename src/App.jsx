import "./App.css";
import Home from "./component/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./component/NavBar/NavBar";
import Favorites from "./component/Favorites";
import { useEffect, useState } from "react";
import { getCityData, getWeatherData } from "./services/weather-service";

function App() {
  // [{ name: 'Tel Aviv', temp: 30 }]
  const [favorites, setFavorites] = useState([]);
  // data about the city we get from the API - get the "Key" of the city
  const [cityData, setCityData] = useState();
  // here we save the weather data of the requested city key
  const [weatherData, setWeatherData] = useState();
  // connencted to the autocomplete input
  const [city, setCity] = useState("Tel Aviv");

  useEffect(() => {
    // start with getting data of tel aviv
    getCity(city);
    // run only once when the component mount
  }, []);

  const getCity = async (cityName) => {
    // ask the api about the city name -> we get city data including city "Key"
    getCityData(cityName)
      .then((res) => res.json())
      .then((data) => {
        // data is an array of results
        console.log(data);
        // t-> [tokyo, tel aviv, tel mond]
        setCityData(data[0]);
        const cityKey = data[0].Key; // 123451
        getWeatherData(cityKey)
          .then((res) => res.json())
          .then((weatherData) => {
            console.log(weatherData);
            setWeatherData(weatherData);
          });
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  return (
    <div className="App">
      {/* Added basename for this to work when deployed on github */}
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <NavBar />
        <hr />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setFavorites={setFavorites}
                favorites={favorites}
                cityData={cityData}
                setCityData={setCityData}
                weatherData={weatherData}
                setWeatherData={setWeatherData}
                city={city}
                setCity={setCity}
                getCity={getCity}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                setFavorites={setFavorites}
                getCity={getCity}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
