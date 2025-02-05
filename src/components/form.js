import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import axios from "axios";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaCity } from "react-icons/fa";

export default function WeatherForm() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = async () => {
        if (!city) {
            setError("Please enter a city.");
            return;
        }

        const apiKey = "140b3acac46d0af5eb3ee189a312f55e"; 
        const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            setError(null); // Clear previous errors
            setLoading(true); // Show loading state
            const response = await axios.get(baseURL);
            setWeatherData(response.data);
        } catch (err) {
            setError("City Not Found or API Error!");
        } finally {
            setLoading(false); // Hide loading state
        }
    };

    return (
        <div className="container mt-4">
            <h1 style={{color:"#fe8810"}}>Weather Forecast <span><TiWeatherPartlySunny /></span></h1>
            <form onSubmit={(e) => { e.preventDefault(); handleChange(); }}>
                <div className="mb-3">
                    <input
                        onChange={(e) => setCity(e.target.value)}
                        className="form-control"
                        type="text"
                        placeholder="Enter The City"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Get The Data</button>
            </form>

            {error && <p className="text-danger mt-3">{error}</p>}
            {loading && <p className="text-dark mt-3">Loading...</p>}

            {weatherData && (
                <div className="mt-4 p-3 border rounded bg-light">
                    <h2 style={{color:"#009c00"}}>{weatherData.name}<span> <FaCity /></span></h2>
                    <p style={{fontWeight:"bold"}}>Temperature:<span style={{color:"red"}}>{weatherData.main.temp}°C</span> </p>
                    <p style={{fontWeight:"bold"}}>Weather: <span style={{color:"red"}}>{weatherData.weather[0].description}</span></p>
                </div>
            )}
        </div>
    );
}
