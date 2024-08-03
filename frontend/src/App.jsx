import React from "react";
import { useState } from "react";

function App() {
  const [fomrData, setFormData] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="app">
      <div className="app-container">
        <div className="title">
          Spelling Checker and Auto Aomplete App
        </div>
          <input type="text" value={fomrData} onChange={(e) => setFormData(e.target.value)} />
          <button onClick={handleSubmit}>Check</button>
      </div>
    </div>
  );
}

export default App;