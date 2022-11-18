import React, { useState } from "react";
import { getCityAutocomplete } from "../services/weather-service";

export default function Autocomplete(props) {
  const [availableCities, setAvailableCities] = useState([]);

  const handleChange = (e) => {
    if (e.target.value === "" && !/^[A-Za-z0-9]+$/i.test(e.target.value)) {
      return;
    }

    props.setCity(e.target.value);
    if (e.target.value.length) {
      getCityAutocomplete(props.city)
        .then((res) => res.json())
        .then((data) => {
          setAvailableCities(data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <div>
      <label htmlFor="enter city">Enter City: </label>
      <input
        type="text"
        name="city"
        id="city"
        pattern="[A-Za-z0-9]"
        required
        placeholder="city"
        value={props.city}
        onChange={handleChange}
      />
      <div>
        <select
          onChange={(e) => {
            props.setCity(e.target.value);
            props.getCity(e.target.value);
          }}
          style={{ minWidth: "200px" }}
          name="citySelect"
          id="citySelect"
        >
          {availableCities &&
            availableCities.map((city) => {
              return <option key={city.Key}>{city.LocalizedName}</option>;
            })}
        </select>
      </div>
    </div>
  );
}
