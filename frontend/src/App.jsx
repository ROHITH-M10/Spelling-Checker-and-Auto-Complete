import React from "react";
import { useState } from "react";
import Data from "./Data";

function App() {
  const [formData, setFormData] = useState("");
  const [receive, setReceive] = useState(false);
  const [result, setResult] = useState({});

  const handleChange = (e) => {
    setFormData(e.target.value);
    setReceive(false);
    setResult({});
  };

  const handleSubmit = () => {
    const url = "http://localhost:5000/check";
    const jsonData = JSON.stringify({ word: formData }); // wrap formData in an object

    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: jsonData,
    })
    .then((response) => response.json())
    .then((response) => {
      setReceive(true);
      setResult(response);
    })
    .catch(() => {
      setReceive(true);
      setResult({ isCorrect: false, suggestions: ["Error fetching prediction"] });
    });
  };

  return (
    <div className="app">
      <div className="info-nav">
        Data
      </div>
      <div className="app-container">
        <div className="title">
          Spelling Checker and Auto Complete App
        </div>
          <input type="text" value={formData} onChange={handleChange} />
          <button onClick={handleSubmit}>
            Check
          </button>
        
      </div>

      <div className="result-box">
        <div className="result-text">
          {
            receive ? (
              result.isCorrect ? (
                <div className="correct">Correct Spelling</div>
              ) : (
                <div className="incorrect">Incorrect Spelling</div>
              )
            ) : (
              <div></div>
            )
          }
        </div>
        <div className="suggestion">
          {
            receive ? (
              result.isCorrect ?(
                <div></div>
              ) : (
                <div className="suggestions-box">
                  <div className="suggestions-text">Suggestions</div>
                  <div className="suggestions">
                  {result.suggestions.map((suggestion, index) => (
                    <div key={index} className="item">{suggestion}</div>
                  ))}
                  </div>
                </div>
              )
            ) :
            (
              <div>Enter a word to check spelling</div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;