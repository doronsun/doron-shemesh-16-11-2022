import React from "react";
import { useNavigate } from "react-router-dom";
import "./favorites.css";

export default function Favorites(props) {
  const navigate = useNavigate();

  const handleClick = (cityName) => {
    props.getCity(cityName);
    navigate("/");
  };

  return (
    <div>
      <h1>favorites</h1>
      <div className="favorites">
        {props.favorites.map((value, index) => {
          return (
            <div
              onClick={() => handleClick(value.name)}
              className="favorite"
              key={index}
            >
              <h2>{value.name}</h2>
              <h3>{value.temp} C</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
