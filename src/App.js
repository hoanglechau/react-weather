import React, { useState, useEffect } from "react";

const api = {
  key: "9b3a58bdc2cf3c717ad4d0a602d4a7f8",
  baseURL: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      setLoading((prevLoading) => true);
      try {
        const url = `${api.baseURL}weather?q=${searchCity}&appid=${api.key}&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok) {
          setWeatherInfo(
            (prevWeatherInfo) => `
              City: ${data.name},
              Country: ${data.sys.country},
              Weather: ${data.weather[0].description},
              Temperature: ${data.main.temp}
              `
          );
          setErrorMessage((prevErrorMessage) => "");
        } else {
          setErrorMessage((prevErrorMessage) => data.message);
        }
      } catch (error) {
        setErrorMessage((prevErrorMessage) => error.message);
      }
      setLoading((prevLoading) => false);
    };
    fetchWeatherData();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity((prevSearchCity) => searchInput);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="City"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button>Search</button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {errorMessage ? (
            <div style={{ color: "red" }}>{errorMessage}</div>
          ) : (
            <div>{weatherInfo}</div>
          )}
        </>
      )}
    </>
  );
}

export default App;
