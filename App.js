import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem("omdbApiKey") || ""); // ✅ fixed

  // Function to search movies
  const searchMovies = async () => {
    if (!apiKey) {
      alert("Please enter OMDb API Key in settings ⚙️");
      return;
    }
    if (!query) {
      alert("Please type something to search 🎬");
      return;
    }
    setLoading(true);
    const res = await fetch(
      `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`
    );
    const data = await res.json();
    setMovies(data.Search || []);
    setLoading(false);
  };

  // Function to save API key
  const handleSaveKey = () => {
    const key = prompt("Enter your OMDb API Key:");
    if (key) {
      setApiKey(key);
      localStorage.setItem("omdbApiKey", key); // ✅ saving correctly
      alert("API Key saved successfully ✅");
    }
  };

  return (
    <div className="app">
      <header>
        <h1>🎬 Movie Search</h1>
        <button onClick={handleSaveKey}>⚙️ Settings</button>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchMovies()}
        />
        <button onClick={searchMovies}>Search</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={movie.Title}
              />
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
