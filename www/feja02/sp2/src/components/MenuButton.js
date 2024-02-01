const MenuButton = ({text, onClick}) => {
    return (
        <button type="button" className="btn btn-primary w-75 h-25 m-2" onClick={onClick}>{text}</button>
    );
};

export default MenuButton;