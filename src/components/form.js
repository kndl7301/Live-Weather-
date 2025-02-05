import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import axios from "axios";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaCity } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Spinner } from "react-bootstrap"; 

export default function WeatherForm() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [countryName, setCountryName] = useState(null);
    const [cityCoordinates, setCityCoordinates] = useState(null); // To store city coordinates
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = () => {
        if (!city) {
            setError("Please enter a city.");
            return;
        }

        const apiKey = "your apikey"; 
        const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        setLoading(true);
        setError(null);

        axios.get(baseURL)
            .then((response) => {
                setWeatherData(response.data);
                const countryCode = response.data.sys.country;
                // Fetch country full name using Restcountries API
                return axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
            })
            .then((response) => {
                setCountryName(response.data[0].name.common); // Get the full country name
                // Get the latitude and longitude of the city for Google Maps link
                setCityCoordinates({
                    lat: weatherData.coord.lat,
                    lon: weatherData.coord.lon,
                });
            })
            .catch((error) => {
                if (error.response) {
                    setError("City not found.");
                } else {
                    setError("Network error. Please try again.");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Function to open the city in Google Maps
    const openInGoogleMaps = () => {
        if (cityCoordinates) {
            const { lat, lon } = cityCoordinates;
            const googleMapsURL = `https://www.google.com/maps?q=${lat},${lon}`;
            window.open(googleMapsURL, "_blank"); // Opens Google Maps in a new tab
        }
    };

    return (
        <div className="container mt-4">
            <h1 style={{ color: "#fe8810" }}>
                Weather Forecast <span><TiWeatherPartlySunny /></span>
            </h1>
            <form onSubmit={(e) => { e.preventDefault(); handleChange(); }}>
                <div className="mb-3">
                    <label htmlFor="cityInput" className="form-label">City Name</label>
                    <input
                        id="cityInput"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="form-control"
                        type="text"
                        placeholder="Enter The City"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Get The Data</button>
            </form>

            {error && <p className="text-danger mt-3">{error}</p>}
            {loading && (
                <div className="mt-3">
                    <Spinner animation="border" variant="info" />
                </div>
            )}

            {weatherData && (
                <div className="mt-4 p-3 border rounded bg-light">
                    <h2 style={{ color: "#009c00" }}>
                        {weatherData.name}, {countryName} <span><FaCity /></span>
                        {cityCoordinates && (
                            <span
                                style={{ cursor: "pointer", marginLeft: "10px" }}
                                onClick={openInGoogleMaps}
                            >
                                <FaMapMarkerAlt size={24} color="#ff0000" />
                            </span>
                        )}
                    </h2>
                    <p style={{ fontWeight: "bold" }}>
                        Temperature: <span style={{ color: "red" }}>{weatherData.main.temp}°C</span>
                    </p>
                    <p style={{ fontWeight: "bold" }}>
                        Weather: <span style={{ color: "red" }}>{weatherData.weather[0].description}</span>
                    </p>
                </div>
            )}
        </div>
    );
}
