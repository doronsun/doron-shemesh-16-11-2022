import "./App.css";
import Home from "./component/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./component/NavBar/NavBar";
import Favorites from "./component/Favorites";
import { useEffect, useState } from "react";
import { getCityData, getWeatherData } from "./services/weather-service";

function App() {
  // ['Tel Aviv']
  // [{ name: 'Tel Aviv', temp: 30 }]
  const [favorites, setFavorites] = useState([]);
  const [cityData, setCityData] = useState();
  const [weatherData, setWeatherData] = useState();
  const [city, setCity] = useState("Tel Aviv");

  useEffect(() => {
    getCity(city);
  }, []);

  const getCity = async (city) => {
    getCityData(city)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCityData(data[0]);
        getWeatherData(data[0].Key)
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
