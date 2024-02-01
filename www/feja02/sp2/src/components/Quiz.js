import React, {useEffect, useState} from 'react';

const Quiz = ({goToMenu, questions, selectedCategory, selectedDifficulty}) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [lives, setLives] = useState(3);

    useEffect(() => {
        if (quizCompleted) {
            const score = userAnswers.filter(Boolean).length;
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
    }, [quizCompleted, userAnswers, selectedCategory, selectedDifficulty, lives]);

    const handleAnswerSelect = (isCorrect) => {
        const newUserAnswers = [...userAnswers, isCorrect];
        setUserAnswers(newUserAnswers);

        if (!isCorrect) {
            const newLives = lives - 1;
            setLives(newLives);

            if (newLives <= 0) {
                setQuizCompleted(true);
                return;
            }
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizCompleted(true);
        }
    };

    const renderQuestion = () => {
        const question = questions[currentQuestionIndex];
        const answers = Object.entries(question.answers)
            .filter(([key, value]) => value !== null)
            .map(([key, value]) => ({
                text: value,
                isCorrect: question.correct_answers[`${key}_correct`] === "true",
            }));

        return (
            <div>
                <h3>{question.question}</h3>
                {answers.map((answer, index) => (
                    <button key={index} className="btn btn-outline-primary m-1"
                            onClick={() => handleAnswerSelect(answer.isCorrect)}>
                        {answer.text}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div id="quiz" className="d-flex flex-column flex-grow-1 align-items-center justify-content-center">
            <h2>Quiz - {selectedCategory}<br/>Difficulty: {selectedDifficulty}</h2>
            <p>Lives left: {lives}</p>
            {!quizCompleted ? (
                renderQuestion()
            ) : (
                <div>
                    <p>Your score: {userAnswers.filter(Boolean).length} out of {questions.length}</p>
                    <p>{lives > 0 ? "Well done!" : "Out of lives!"}</p>
                    <button className="btn btn-primary" onClick={goToMenu}>Main menu</button>
                </div>
            )}
        </div>
    );
};

export default Quiz;
