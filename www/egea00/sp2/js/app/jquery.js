function createAppLoadingScreen() {
    $('<div>', {id: 'appLoadingScreen', class: 'app-loading-screen', css: {display: 'flex'}})
        .append($('<div>', {class: 'spinner'}))
        .appendTo('body');
}

function showAppLoadingScreen() {
    $('#appLoadingScreen').show();
}

function hideAppLoadingScreen() {
    setTimeout(() => {
        $('#appLoadingScreen').hide();
    }, 500);
}

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    let ca = document.cookie.split(';');
    let caLen = ca.length;
    let cookieName = `${name}=`;
    let c;

    for (let i = 0; i < caLen; i += 1) {
        c = ca[i].trim();
        if (c.indexOf(cookieName) == 0) {
            return c.substring(cookieName.length, c.length);
        }
    }
    return '';
}