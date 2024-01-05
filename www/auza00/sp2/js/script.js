let popup = document.getElementById('popup-all');
let pop = document.getElementById('popup');

let infoM = document.getElementById('information-allM');
let popup2 = document.getElementById('popup-all2');

let popup3 = document.getElementById('popup-all3');
let pop2 = document.getElementById('popup2');

let popup4 = document.getElementById('popup-all4');
let pop3 = document.getElementById('popup3');

let popup5 = document.getElementById('popup-all5');
let pop4 = document.getElementById('popup4');

function showHideForm() {
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
    infoM.style.display = 'none';
    popup2.style.display = 'none';
}

function showHideLogin() {
    if (popup3.style.display == 'block') {
        popup3.style.display = 'none';
        pop2.style.display = 'none';
        removePoint();
        add_button.style.display = 'none';
        signin_button.style.display = 'inline-block';
    }
    else {
        popup3.style.display = 'block';
        pop2.style.display = 'block';
    }
}

function showHideSignout() {
    if (popup4.style.display == 'block') {
        popup4.style.display = 'none';
        pop3.style.display = 'none';
        removePoint();
    }
    else {
        popup4.style.display = 'block';
        pop3.style.display = 'block';
    }
}

function showHideHelp() {
    if (popup5.style.display == 'block') {
        popup5.style.display = 'none';
        pop4.style.display = 'none';
        removePoint();
    }
    else {
        popup5.style.display = 'block';
        pop4.style.display = 'block';
    }
}

/*REDIRECT*/
const buttonEnter = document.getElementById('button-enter');
if(buttonEnter !== null){
    buttonEnter.onclick = function () {
        location.href = 'main';
    };
}
/*BUTTONS*/
$('#index-login-button').on('click', function(){
    handleAuthClick();
});
$('#info-button').on('click', function(){
    showHideHelp();
});
$('#button-remove').on('click', function(){
    removePoint();
});
$('#button-add-third').on('click', function(){
    showHideLogin();
});
$('#button-add-first').on('click', function(){
    addPoint();
});
$('#button-add-second').on('click', function(){
    showHideForm();
});
$('#button-logout').on('click', function(){
    showHideSignout();
});

$('#popup-all').on('click', function(){
    showHideForm();
});
$('#popup-all2').on('click', function(){
    hideInfo();
});
$('#popup-all3').on('click', function(){
    showHideLogin();
});
$('#popup-all4').on('click', function(){
    showHideSignout();
});
$('#popup-all5').on('click', function(){
    showHideHelp();
});

$('#main-button-login').on('click', function(){
    handleAuthClick();
});
$('#main-button-signout').on('click', function(){
    handleSignoutClick();
});
/*SPINNER*/
if($('#loader-all') !== null){
    $(window).on('load',function () {
        $('#loader-all').hide();
    });
}
