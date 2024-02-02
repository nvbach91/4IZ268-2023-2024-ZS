import React, {useState} from 'react';

import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import About from "./components/About";
import Loading from "./components/Loading";
import Selection from "./components/Selection";
import QuizHistory from "./components/QuizHistory";
import Quiz from "./components/Quiz";

const App = () => {
    const [currentView, setCurrentView] = useState("menu");
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const [questions, setQuestions] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const goToSelection = () => setCurrentView("selection");
    const goToQuizHistory = () => setCurrentView("history");
    const goToAbout = () => setCurrentView("about");
    const goToMenu = () => setCurrentView("menu");
    const beginLoading = () => setLoading(true);
    const doneLoading = () => setLoading(false);

    const apiKey = "apikey"

    const fetchQuestions = async (category, difficulty) => {
        beginLoading();
        let statusCode = 404;
        try {
            let url = `https://quizapi.io/api/v1/questions?apiKey=${apiKey}&limit=10`;

            const categoryLower = category.toLowerCase();
            const difficultyLower = difficulty.toLowerCase();

            if (categoryLower !== "random") {
                url += `&category=${encodeURIComponent(category)}`;
            }
            if (difficultyLower !== "random") {
                url += `&difficulty=${encodeURIComponent(difficultyLower)}`;
            }

            const response = await fetch(url);
            statusCode = response.status
            if (!response.ok) {
                if (statusCode === 401) {
                    setErrorMessage("Error: invalid or missing API key")
                } else if (statusCode === 404) {
                    setErrorMessage("Error: no questions found")
                } else {
                    setErrorMessage("An unknown error occured")
                }
                setQuestions([])
            } else {
                setErrorMessage("")

                const rawQuestions = await response.json()

                const transformedQuestions = rawQuestions.map(q => {
                    const answers = Object.entries(q.answers)
                        .filter(([key, value]) => value !== null)
                        .map(([key, value]) => ({
                            answerText: value,
                            isCorrect: q.correct_answers[`${key}_correct`] === "true",
                        }));
                    return {
                        question: q.question,
                        answers: answers,
                        category: q.category,
                        difficulty: q.difficulty
                    }
                })

                setQuestions(transformedQuestions);
            }
        } catch (error) {
            console.error("Failed to fetch questions:", error);
        } finally {
            doneLoading();
        }
        return statusCode;
    };

    const handleSelectionComplete = async (category, difficulty) => {
        const statusCode = await fetchQuestions(category, difficulty);
        setSelectedCategory(category);
        setSelectedDifficulty(difficulty);
        if (statusCode === 200) {
            setCurrentView("quiz")
        } else {
            setCurrentView("selection");
        }
    };

    return (
        <div className="main-container d-flex flex-column flex-grow-1 border border-4 border-primary m-3 p-3">
            <Header/>
            <main className="d-flex flex-column flex-grow-1">
                {loading && (<Loading/>)}
                {!loading && currentView === "menu" &&
                    <Menu goToSelection={goToSelection} goToQuizHistory={goToQuizHistory} goToAbout={goToAbout}/>}
                {!loading && currentView === "selection" &&
                    <Selection goToMenu={goToMenu} beginLoading={beginLoading} doneLoading={doneLoading}
                               onSelectionComplete={handleSelectionComplete} errorMessage={errorMessage}/>}
                {!loading && currentView === "quiz" &&
                    <Quiz goToMenu={goToMenu} questions={questions} selectedCategory={selectedCategory}
                          selectedDifficulty={selectedDifficulty}/>}
                {!loading && currentView === "history" &&
                    <QuizHistory goToMenu={goToMenu} beginLoading={beginLoading} doneLoading={doneLoading}/>}
                {!loading && currentView === "about" && <About goToMenu={goToMenu}/>}
            </main>
            <Footer/>
        </div>
    );
};

export default App;
