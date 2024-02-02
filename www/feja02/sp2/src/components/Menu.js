import React from 'react';
import MenuButton from "./MenuButton";
import PropTypes from "prop-types";

const Menu = ({goToSelection, goToQuizHistory, goToAbout}) => {
    return (
        <div id="main-menu" className="d-flex flex-column flex-grow-1 align-items-center justify-content-center">
            <MenuButton text="Play" onClick={goToSelection}/>
            <MenuButton text="Quiz History" onClick={goToQuizHistory}/>
            <MenuButton text="About" onClick={goToAbout}/>
        </div>
    )
}

Menu.propTypes = {
    goToSelection: PropTypes.func.isRequired,
    goToQuizHistory: PropTypes.func.isRequired,
    goToAbout: PropTypes.func.isRequired,
}

export default Menu