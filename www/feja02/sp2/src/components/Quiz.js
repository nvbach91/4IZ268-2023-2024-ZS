import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";

const Quiz = ({goToMenu, questions, selectedCategory, selectedDifficulty}) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [lives, setLives] = useState(3);
    const [showFeedback, setShowFeedback] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState([]);


    useEffect(() => {
        if (quizCompleted) {
            const datetime = new Date().toISOString();
            const quizHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];

            quizHistory.push({
                datetime,
                score,
                category: selectedCategory,
                difficulty: selectedDifficulty,
                livesRemaining: lives,
            });

            localStorage.setItem('quizHistory', JSON.stringify(quizHistory));
        }
    }, [quizCompleted, score, selectedCategory, selectedDifficulty, lives, selectedAnswers]);

    const handleAnswerSelect = (answerIndex) => {
        let foundIndex = selectedAnswers.indexOf(answerIndex);
        if (foundIndex !== -1) {
            const newSelectedAnswers = [...selectedAnswers];
            newSelectedAnswers.splice(foundIndex, 1);
            setSelectedAnswers(newSelectedAnswers);
        } else {
            const newSelectedAnswers = [...selectedAnswers, answerIndex];
            setSelectedAnswers(newSelectedAnswers);
        }
    };

    const continueButtonHandle = () => {
        if (!showFeedback) {
            let userAnsweredCorrectly = true;
            const currentQuestion = questions[currentQuestionIndex];

            if (selectedAnswers.length === 0) {
                userAnsweredCorrectly = false;
            } else {
                for (let selectedAnswerIndex of selectedAnswers) {
                    if (currentQuestion.answers[selectedAnswerIndex].isCorrect === false) {
                        userAnsweredCorrectly = false;
                        break;
                    }
                }
            }

            if (userAnsweredCorrectly) {
                setScore(score + 1);
            } else {
                const newLives = lives - 1;
                setLives(newLives);
                if (newLives <= 0) {
                    setQuizCompleted(true);
                }
            }

            setShowFeedback(true);
        } else {
            setShowFeedback(false);
            setSelectedAnswers([]);
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                setQuizCompleted(true);
            }
        }
    };

    const renderQuestion = () => {
        const currentQuestion = questions[currentQuestionIndex];
        return (
            <div>
                <h3>{currentQuestion.question}</h3>
                <div>
                    {currentQuestion.answers.map((answer, index) => (
                        <button key={index}
                                className={"btn m-1 " + (showFeedback ? ("disabled " + (answer.isCorrect ? (selectedAnswers.includes(index) ? "btn-success" : "btn-outline-success") : (selectedAnswers.includes(index) ? "btn-danger" : "btn-outline-danger"))) : (selectedAnswers.includes(index)) ? "btn-info" :"btn-outline-primary")}
                                onClick={() => handleAnswerSelect(index)}>
                            {answer.answerText}
                        </button>
                    ))}
                </div>
                <button type={"button"} className={"btn btn-primary m-1"} onClick={continueButtonHandle}>Continue
                </button>
            </div>
        );
    };

    return (
        <div id="quiz" className="d-flex flex-column flex-grow-1 align-items-center justify-content-center text-center">
            <h2>Quiz - {selectedCategory}<br/>Difficulty: {selectedDifficulty}</h2>
            <p>Lives left: {lives}</p>
            {!quizCompleted || showFeedback ? (
                renderQuestion()
            ) : (
                <div>
                    <p>Your score: {score} out of {questions.length}</p>
                    <p>{lives > 0 ? "Well done!" : "Out of lives!"}</p>
                    <button className="btn btn-primary" onClick={goToMenu}>Main menu</button>
                </div>
            )}
        </div>
    );
};

Quiz.propTypes = {
    goToMenu: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired,
    selectedCategory: PropTypes.string.isRequired,
    selectedDifficulty: PropTypes.string.isRequired,
}

export default Quiz;
