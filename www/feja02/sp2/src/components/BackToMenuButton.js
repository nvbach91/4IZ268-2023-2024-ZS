import React from 'react';
import PropTypes from "prop-types";

const BackToMenuButton = ({goToMenu}) => {
    return (
        <button type="button" className="btn btn-secondary m-2" onClick={goToMenu}>Main Menu</button>
    );
};

BackToMenuButton.propTypes = {
    goToMenu: PropTypes.func.isRequired,
}

export default BackToMenuButton;