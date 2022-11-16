const API_KEY = "ZRbGSj3lvdo0kTm5GY7GdBH64uN8d6Xz";
const domain = "http://dataservice.accuweather.com";
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
                "X-Forwarded-For": "80.230.8.20",
                "X-Forwarded-Port": "443",
                "X-Forwarded-Proto": "https",
            },
        }
    );
}

export function getWeatherData(locationKey) {
    return fetch(
        `${domain}/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`
    );
}

export function getCityAutocomplete(userInput) {
    const encoded = encodeURIComponent(userInput);
    return fetch(
        `${domain}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${encoded}`
    );
}