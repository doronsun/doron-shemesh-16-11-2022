import React, { useEffect, useState } from "react";
import Autocomplete from "./Autocomplete";
import "./home.css";

const ferenhyteToCelcius = (F) => ((5 / 9) * (F - 32)).toFixed(1);

const weekdays = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

export default function Home(props) {
  const getFavoriteButton = () => {
    // check if city is in favorites
    const isFavoriteCity = props.favorites.find(
      (city) => city.name === props.cityData.EnglishName
    );

    if (isFavoriteCity) {
      return (
        <button
          onClick={() => {
            const newFavorites = props.favorites.filter(
              (city) => city.name !== props.cityData.EnglishName
            );
            props.setFavorites(newFavorites);
          }}
        >
          Remove from favorites
        </button>
      );
    } else {
      return (
        <button
          onClick={() => {
            const newFavorite = {
              name: props.cityData.EnglishName,
              temp: ferenhyteToCelcius(
                props.weatherData.DailyForecasts[0].Temperature.Maximum.Value
              ),
            };
            props.setFavorites([...props.favorites, newFavorite]);
          }}
        >
          Add to favorites
        </button>
      );
    }
  };

  const show = () => {
    if (props.weatherData && props.cityData) {
      return (
        <div className="city-data">
          <div>
            <h1 style={{ color: "red" }}>{props.cityData.EnglishName}</h1>
            <h2 style={{ color: "red" }}>
              {ferenhyteToCelcius(
                props.weatherData.DailyForecasts[0].Temperature.Maximum.Value
              )}
              C
            </h2>
          </div>
          <div>{getFavoriteButton()}</div>

          <h1 style={{ color: "orange" }}>{props.weatherData.Headline.Text}</h1>
          <div className="forcast">
            {/* 
            DailyForecasts - array of 5 days with weather forcast, starting today
            we get a cube for daily forcast with the name of the day
              and the temperature of the day
             */}
            {props.weatherData.DailyForecasts.map((day, index) => {
              return (
                <div key={index} className="day-forcast">
                  {/* convert date from "'2022-11-22T07:00:00+02:00'" to short day name "Tue" */}
                  <h3>{weekdays[new Date(day.Date).getDay().toString()]}</h3>
                  <div>
                    <h2>
                      {ferenhyteToCelcius(day.Temperature.Maximum.Value)} C
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div id="home">
      <Autocomplete
        city={props.city}
        setCity={props.setCity}
        getCity={props.getCity}
      />

      {show()}
    </div>
  );
}
