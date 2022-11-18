const API_KEY = "1her2lvFTi81hTGBPHKzI97OLmPPuXSM";
const domain = "H25RfoEoxyfGCvJgvAjruo46OKoIQARA";

// get city data including Key from the API
export function getCityData(city) {
    // מתאם את הסטרינג של העיר להיות תואם למשהו שנכנס לקישור - למשל רווח
    const encodedCity = encodeURIComponent(city);
    return fetch(
        `${domain}/locations/v1/cities/search?apikey=${API_KEY}&q=${encodedCity}`, {
            headers: {
                "Accept-Encoding": "gzip",
                Host: "dataservice.accuweather.com",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "cross-site",
            },
            // allow communication with another domain
            mode: "cors",
        }
    );
}

// get weather data according to some location key
export function getWeatherData(locationKey) {
    return fetch(
        `${domain}/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`,
        // allow communication with another domain
        { mode: "cors" }
    );
}

// t -> tokyo, tel aviv
export function getCityAutocomplete(userInput) {
    const encoded = encodeURIComponent(userInput);
    return fetch(
        `${domain}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${encoded}`,
        // allow communication with another domain
        { mode: "cors" }
    );
}