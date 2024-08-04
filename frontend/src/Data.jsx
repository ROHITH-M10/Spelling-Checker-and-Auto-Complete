import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./index.css";

const Data = () => {
    const [words, setWords] = useState([]);

    useEffect(() => {
        // Function to fetch the history data from the Flask API
        const fetchHistory = async () => {
            try {
                const response = await fetch("http://localhost:5000/history");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setWords(data);
            } catch (error) {
                console.error("Error fetching history:", error);
            }
        };

        fetchHistory();
    }, []); // Empty dependency array means this effect runs once on component mount

    return (
        <div className="data">
            <h1>Data</h1>
            <table>
                <thead>
                    <tr>
                        <th>Word</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {words.map((word) => (
                        <tr key={word.hash}>
                            <td>{word.word}</td>
                            <td>{word.count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Data;
