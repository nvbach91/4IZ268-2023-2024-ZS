import React from 'react';
import BackToMenuButton from "./BackToMenuButton";

const QuizHistory = ({goToMenu, beginLoading, doneLoading}) => {

    const historyData = JSON.parse(localStorage.getItem("quizHistory")) || [];

    if (historyData.length === 0) {
        return (
            <div id="quiz-history" className="d-flex flex-column flex-grow-1 align-items-center justify-content-center">
                <h2>Quiz History</h2>
                <p>No historical data available.</p>
                <BackToMenuButton goToMenu={goToMenu}/>
            </div>
        );
    }

    return (
        <div id="quiz-history" className="d-flex flex-column flex-grow-1 align-items-center justify-content-center">
            <h2>Quiz History</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Date and Time</th>
                    <th>Score</th>
                    <th>Category</th>
                    <th>Difficulty</th>
                    <th>Lives</th>
                </tr>
                </thead>
                <tbody>
                {historyData.map((item, index) => (
                    <tr key={index}>
                        <td>{new Date(item.datetime).toLocaleString()}</td>
                        <td>{item.score}</td>
                        <td>{item.category}</td>
                        <td>{item.difficulty}</td>
                        <td>{item.livesRemaining}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <BackToMenuButton goToMenu={goToMenu}/>
        </div>
    );
}

export default QuizHistory;
