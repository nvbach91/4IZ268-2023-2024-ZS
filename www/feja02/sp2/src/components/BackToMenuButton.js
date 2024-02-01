import React from 'react';

const BackToMenuButton = ({goToMenu}) => {
    return (
        <button type="button" className="btn btn-secondary m-2" onClick={goToMenu}>Main Menu</button>
    );
};

export default BackToMenuButton;