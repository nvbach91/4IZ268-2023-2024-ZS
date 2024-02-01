import BackToMenuButton from "./BackToMenuButton";

const About = ({goToMenu}) => {
    return (
        <div id="about" className="d-flex flex-column flex-grow-1 align-items-center justify-content-center">
            <h2>About</h2>
            <p>This app was created for the class Web Technologies 4IZ268.</p>
            <BackToMenuButton goToMenu={goToMenu}/>
        </div>
    )
}

export default About