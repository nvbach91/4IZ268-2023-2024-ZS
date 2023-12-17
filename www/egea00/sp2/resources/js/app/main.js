function createElement(tag, {classes = [], text = '', attributes = {}}) {
    const element = document.createElement(tag);
    classes.forEach(cls => element.classList.add(cls));
    if (text) {
        const textNode = document.createTextNode(text);
        element.appendChild(textNode);
    }
    Object.entries(attributes).forEach(([attr, value]) => element.setAttribute(attr, value));
    return element;
}

function injectStyles() {
    const style = document.createElement('style');
    style.style = 'text/css';
    style.innerHTML = `
    body, html {
      height: 100%;
      margin: 0;
      font-family: 'Arimo', sans-serif;
      background: #f2f2f2;
    }
    .app-container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .app-header, .app-footer {
      background-color: #333;
      color: white;
      padding: 1rem;
      display: flex;
      align-items: center;
      position: relative;
    }
    .app-header {
      justify-content: center;
    }
    .city-navigation {
      display: flex;
      align-items: center;
    }
    .nav-button {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 1rem;
      margin: 0 10px;
    }
    .logo-footer {
      position: absolute;
      left: 1rem;
    }
    .nav-list {
      list-style: none;
      display: flex;
      margin-left: 1rem;
      padding: 0;
      position: absolute;
      right: 1rem;
    }
    .nav-item:not(:last-child) {
      margin-right: 1rem;
    }
    .content {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
    }
    .documentation {
      margin-left: auto;
      padding-left: 1rem;
    }
    .add-city-btn {
      position: absolute;
      left: 1rem;
    }
    .footer-content {
      text-align: center;
      flex-grow: 1;
    }
  `;
    document.head.appendChild(style);
}


function buildWeatherAppStructure() {

    injectStyles();

    const iconPerson = '<i class="bi bi-person-fill"></i>';
    const iconGeo = '<i class="bi bi-geo-fill"></i>';
    const iconEnvelope = '<i class="bi bi-envelope-fill"></i>';
    const iconLink = '<i class="bi bi-link-45deg"></i>';
    const iconPeople = '<i class="bi bi-person-heart"></i>';
    const iconPlus = '<i class="bi bi-plus-circle"></i>';
    const iconLeft = '<i class="bi bi-caret-left-square"></i>';
    const iconRight = '<i class="bi bi-caret-right-square"></i>';


    const appContainer = createElement('div', {classes: ['app-container']});


    const addCityButton = createElement('button', {classes: ['nav-button', 'add-city-btn'], attributes: {'aria-label': 'Add City'}});
    addCityButton.innerHTML = `${iconPlus} Add City`;


    const header = createElement('header', {classes: ['app-header']});
    const cityNavigation = createElement('div', {classes: ['city-navigation']});


    const prevCityButton = createElement('button', {classes: ['nav-button'], attributes: {'aria-label': 'Previous City'}});
    prevCityButton.innerHTML = iconLeft;
    const selectedCityButton = createElement('button', {classes: ['nav-button'], text: 'SELECTED CITY', attributes: {'aria-label': 'Selected City'}});
    const nextCityButton = createElement('button', {classes: ['nav-button'], attributes: {'aria-label': 'Next City'}});
    nextCityButton.innerHTML = iconRight;


    cityNavigation.appendChild(prevCityButton);
    cityNavigation.appendChild(selectedCityButton);
    cityNavigation.appendChild(nextCityButton);

    const navList = createElement('ul', {classes: ['nav-list']});
    ['EVENTS', 'FORECAST', 'CITY INFO'].forEach(item => {
        const li = createElement('li', {classes: ['nav-item']});
        li.appendChild(createElement('button', {text: item}));
        navList.appendChild(li);
    });
    header.appendChild(navList);

    header.appendChild(cityNavigation);
    header.appendChild(addCityButton);

    const mainContent = createElement('main', {classes: ['content'], text: 'CONTENT'});

    const footer = createElement('footer', {classes: ['app-footer']});
    const footerContent = createElement('div', {classes: ['footer-content'], text: 'FOOTER'});
    const logoFooter = createElement('div', {classes: ['logo-footer'], text: 'LOGO'});
    footer.appendChild(logoFooter);
    footer.appendChild(footerContent);
    const documentationButton = createElement('button', {classes: ['documentation'], text: 'DOCUMENTATION etc.'});
    footer.appendChild(documentationButton);

    appContainer.appendChild(header);
    appContainer.appendChild(mainContent);
    appContainer.appendChild(footer);

    document.body.appendChild(appContainer);
}

window.onload = buildWeatherAppStructure;