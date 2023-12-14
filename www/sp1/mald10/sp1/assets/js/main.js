//vlozeni javascript tridy pro kontrolu ze je zapnuty js
document.body.className += 'javascript';

//funkce pro nalezeni aktualniho roku
const currentYear = () => {
    const year = new Date().getFullYear();
    return year;
}

//prirazeni roku do textu v paticce
document.querySelector("#copyright").textContent += currentYear();


//dropdown menu pro mobilni telefony
const navButton = document.querySelector("#nav-button");
const menuUl = document.querySelector(".nav-ul");

navButton.addEventListener("click", () => {
    if(menuUl.style.display == "flex"){
        menuUl.style.display = "none";
    }
    else {
        menuUl.style.display = "flex";
    }
  });