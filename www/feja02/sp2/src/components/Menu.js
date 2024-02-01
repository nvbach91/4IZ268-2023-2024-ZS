import MenuButton from "./MenuButton";

const Menu = ({goToSelection, goToQuizHistory, goToAbout}) => {
    return (
        <div id="main-menu" className="d-flex flex-column flex-grow-1 align-items-center justify-content-center">
            <MenuButton text="Play" onClick={goToSelection}/>
            <MenuButton text="Quiz History" onClick={goToQuizHistory}/>
            <MenuButton text="About" onClick={goToAbout}/>
        </div>
    )
}

export default Menu