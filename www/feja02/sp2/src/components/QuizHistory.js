import React, {useEffect, useState} from 'react';
import BackToMenuButton from "./BackToMenuButton";
import PropTypes from "prop-types";

const QuizHistory = ({goToMenu}) => {

    const [historyData, setHistoryData] = useState(JSON.parse(localStorage.getItem("quizHistory")) || []);

    useEffect(() => {
        // Update local storage when historyData changes
        localStorage.setItem("quizHistory", JSON.stringify(historyData));
    }, [historyData]);

    const deleteHistoricalQuizByIndex = (index) => {
        const newHistoryData = [...historyData]
        newHistoryData.splice(index, 1)
        setHistoryData(newHistoryData)
    }

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
        <div id="quiz-history"
             className="d-flex flex-column flex-grow-1 align-items-center justify-content-center text-center">
            <h2>Quiz History</h2>
            <table className="table table-striped">
                <thead className="align-middle">
                <tr>
                    <th>Date and Time</th>
                    <th>Score</th>
                    <th>Category</th>
                    <th>Difficulty</th>
                    <th>Lives</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody className="align-middle">
                {historyData
                    .sort((x, y) => new Date(y.datetime) - new Date(x.datetime))
                    .map((item, index) => (
                        <tr key={index}>
                            <td>{new Date(item.datetime).toLocaleString()}</td>
                            <td>{item.score}</td>
                            <td>{item.category}</td>
                            <td>{item.difficulty}</td>
                            <td>{item.livesRemaining}</td>
                            <td>
                                <button type="button" className="btn btn-danger"
                                        onClick={() => deleteHistoricalQuizByIndex(index)}>X
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <BackToMenuButton goToMenu={goToMenu}/>
        </div>
    );
}

QuizHistory.propTypes = {
    goToMenu: PropTypes.func.isRequired,
}

export default QuizHistory;
