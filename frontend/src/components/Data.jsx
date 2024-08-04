import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Chart } from "react-google-charts";
import { Link } from "react-router-dom";
import Home from "./Home";

import "../App.css";

const Data = () => {
    const [words, setWords] = useState([]);

    useEffect(() => {
        // Function to fetch the history data from the Flask API
        fetch ("http://localhost:5000/history").then((response) => 
            response.json().then((data) => {
                setWords(data);
            })
        );
    }, []); // Empty dependency array means this effect runs once on component mount

    const data = [
        ["Word", "Count"],
        ...words.map((word) => [word.word, word.count]),
    ];

    const options = {
        title: "Misspelled Words",
        is3D: true,
        backgroundColor: "white",
        with: 400,
        height: 500,
        };

    return (
            <div className="data">
                <div className="data-nav">
                        <Link to="/home" className="home-nav">
                            Home
                        </Link>
                </div>
                <div className="chart">
                    <Chart
                    chartType="PieChart"
                    data={data}
                    options={options}
                    />
                </div>
            </div>
  );
};

export default Data;
