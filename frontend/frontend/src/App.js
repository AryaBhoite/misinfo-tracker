// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch articles from our Python backend
    axios.get('http://127.0.0.1:5001/api/articles')
      .then(response => {
        setArticles(response.data.articles);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching articles:", error);
        setError("Failed to load articles. Is the backend server running?");
        setLoading(false);
      });
  }, []); // Empty array ensures this runs only once on component mount

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Misinfo-Tracker</h1>
        <p>Crisis-Related News Feed</p>
      </header>
      <div className="article-container">
        {articles.map((article, index) => (
          <div key={index} className="article-card">
            <h2>{article.title}</h2>
            <p><strong>Source:</strong> {article.source.name}</p>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read Full Article</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;