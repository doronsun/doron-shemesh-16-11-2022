import React, { useEffect, useState } from "react";
import Autocomplete from "./Autocomplete";
import "./home.css";

const fToC = (F) => ((5 / 9) * (F - 32)).toFixed(1);

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
    if (
      props.favorites.find((city) => city.name === props.cityData.EnglishName)
    ) {
      return (
        <button
          onClick={() => {
            const newFavorites = props.favorites.filter(
              (name) => name !== props.cityData.EnglishName
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
            props.setFavorites([
              ...props.favorites,
              {
                name: props.cityData.EnglishName,
                temp: fToC(
                  props.weatherData.DailyForecasts[0].Temperature.Maximum.Value
                ),
              },
            ]);
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
            <div>{props.cityData.EnglishName}</div>
            <div>
              {fToC(
                props.weatherData.DailyForecasts[0].Temperature.Maximum.Value
              )}
              C
            </div>
          </div>
          <div>{getFavoriteButton()}</div>

          <h1>{props.weatherData.Headline.Text}</h1>
          <div className="forcast">
            {props.weatherData.DailyForecasts.map((day, index) => {
              return (
                <div key={index} className="day-forcast">
                  <h3>{weekdays[new Date(day.Date).getDay().toString()]}</h3>
                  <div>
                    <h2>{fToC(day.Temperature.Maximum.Value)} C</h2>
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
