function showHideForm() {
    let popup = document.getElementById('popup-all');
    let pop = document.getElementById('popup');
    if (popup.style.display == 'block') {
        popup.style.display = 'none';
        pop.style.display = 'none';
        document.getElementById('add-form').reset();
        removePoint();
    }
    else {
        popup.style.display = 'block';
        pop.style.display = 'block';
    }
}

function hideInfo() {
    let infoM = document.getElementById('information-allM');
    let popup2 = document.getElementById('popup-all2');
    infoM.style.display = 'none';
    popup2.style.display = 'none';
}

function showHideLogin() {
    let popup3 = document.getElementById('popup-all3');
    let pop = document.getElementById('popup2');
    if (popup3.style.display == 'block') {
        popup3.style.display = 'none';
        pop.style.display = 'none';
        removePoint();
        add_button.style.display = 'none';
        signin_button.style.display = 'inline-block';
    }
    else {
        popup3.style.display = 'block';
        pop.style.display = 'block';
    }
}

function showHideSignout() {
    let popup4 = document.getElementById('popup-all4');
    let pop = document.getElementById('popup3');
    if (popup4.style.display == 'block') {
        popup4.style.display = 'none';
        pop.style.display = 'none';
        removePoint();
    }
    else {
        popup4.style.display = 'block';
        pop.style.display = 'block';
    }
}

function showHideHelp() {
    let popup5 = document.getElementById('popup-all5');
    let pop = document.getElementById('popup4');
    if (popup5.style.display == 'block') {
        popup5.style.display = 'none';
        pop.style.display = 'none';
        removePoint();
    }
    else {
        popup5.style.display = 'block';
        pop.style.display = 'block';
    }
}

/*REDIRECT*/
if(document.getElementById('button-enter') !== null){
    document.getElementById('button-enter').onclick = function () {
        location.href = 'main';
    };
}