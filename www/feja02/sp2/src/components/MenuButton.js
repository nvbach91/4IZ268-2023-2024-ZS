import React from "react";
import PropTypes from "prop-types";

const MenuButton = ({text, onClick}) => {
    return (
        <button type="button" className="btn btn-primary w-75 h-25 m-2" onClick={onClick}>{text}</button>
    );
};

MenuButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default MenuButton;