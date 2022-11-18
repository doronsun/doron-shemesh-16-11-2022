import React, { useState } from "react";
import { getCityAutocomplete } from "../services/weather-service";

export default function Autocomplete(props) {
  const [availableCities, setAvailableCities] = useState([]);

  const handleChange = (e) => {
    // if input new value is empty string, update input and quit function
    if (e.target.value === "") {
      props.setCity(e.target.value);
      return;
    }

    // check english chars, or spaces
    if (e.target.value !== "" && !/^[a-z\s]+$/i.test(e.target.value)) {
      // if we found a char that is not allow, dont update the input and quit
      return;
    }

    props.setCity(e.target.value); // update input

    // get autocomplete list - ask from api to autocomplete according to input
    getCityAutocomplete(e.target.value)
      .then((res) => res.json())
      // result from api
      .then((autocompleteCities) => {
        // save list of autocomplete cities we got in the state
        setAvailableCities(autocompleteCities);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
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
          // when someone click on an option,
          onChange={(e) => {
            // we update the input
            props.setCity(e.target.value);
            //  we get city data
            props.getCity(e.target.value);
          }}
          style={{ minWidth: "200px" }}
          name="citySelect"
          id="citySelect"
        >
          {availableCities.map((city) => {
            return <option key={city.Key}>{city.LocalizedName}</option>;
          })}
        </select>
      </div>
    </div>
  );
}
