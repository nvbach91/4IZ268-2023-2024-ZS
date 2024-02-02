import React from 'react';
import BackToMenuButton from "./BackToMenuButton";
import PropTypes from "prop-types";

const About = ({goToMenu}) => {
    return (
        <div id="about" className="d-flex flex-column flex-grow-1 align-items-center justify-content-center">
            <h2>About</h2>
            <p>This app was created for the class Web Technologies 4IZ268.</p>
            <BackToMenuButton goToMenu={goToMenu}/>
        </div>
    )
}

About.propTypes = {
    goToMenu: PropTypes.func.isRequired,
}

export default About