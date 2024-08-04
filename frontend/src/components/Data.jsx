import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
