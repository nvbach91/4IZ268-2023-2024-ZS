import React, {useState} from 'react';
import BackToMenuButton from "./BackToMenuButton";

const Selection = ({goToMenu, onSelectionComplete, selectedCategory = "Random", selectedDifficulty = "Random", errorMessage = ""}) => {
    const [category, setCategory] = useState('Random');
    const [difficulty, setDifficulty] = useState('Random');

    const categories = [
        "Random",
        "Linux",
        "DevOps",
        "Networking",
        "Programming",
        "Cloud",
        "Docker",
        "Kubernetes",
    ];

    const difficulties = ["Random", "Easy", "Medium", "Hard"];

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleDifficultyChange = (e) => {
        setDifficulty(e.target.value);
    };

    const handleSubmit = () => {
        onSelectionComplete(category, difficulty);
    };

    return (
        <div id="selection" className="d-flex flex-column flex-grow-1 align-items-center justify-content-center">
            <h2>Quiz Selection</h2>
            {errorMessage.length > 0 ? <h3 className="alert-danger">{errorMessage}</h3> : null}
            <select className="custom-select" defaultValue={selectedCategory} onChange={handleCategoryChange}>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
            <select className="custom-select my-2" defaultValue={selectedDifficulty} onChange={handleDifficultyChange}>
                {difficulties.map((diff) => (
                    <option key={diff} value={diff}>{diff}</option>
                ))}
            </select>
            <button className="btn btn-primary" onClick={handleSubmit}>Start Quiz</button>
            <BackToMenuButton goToMenu={goToMenu}/>
        </div>
    );
};

export default Selection;