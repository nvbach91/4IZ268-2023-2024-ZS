console.log('js loaded')

// Text
const dataInput = document.querySelector('#data');

// Barvy
const mainColor = document.querySelector('#barva');
const backgroundColor = document.querySelector('#bg-barva');

const mainColorValue = document.querySelector('#barva-value');
const backgroundColorValue = document.querySelector('#bg-barva-value');

//update barvy po vybrani
const updateColor = (e) => {
    const value = e.target.value;
    mainColorValue.innerText = value;
};

const updateBackgroundColor = (e) => {
    const value = e.target.value;
    backgroundColorValue.innerText = value;
};

const addColorEventListener = () => {
    mainColor.addEventListener('change', updateColor);
    backgroundColor.addEventListener('change', updateBackgroundColor);
};

addColorEventListener();

// Velikost a okraje

const velikostSlider = document.querySelector('#velikost');
const velikostValue = document.querySelector('#velikost-value');

const okrajeSlider = document.querySelector('#okraje');
const okrajeValue = document.querySelector('#okraje-value');

const updateVelikost = e => {
    const value = e.target.value;
    velikostValue.innerText = `${value} x ${value}`;
};

const updateOkraje = e => {
    const value = e.target.value;
    okrajeValue.innerText = `${value} px`;
};

const addSliderEventListeners = () => {
    velikostSlider.addEventListener('change', updateVelikost);
    okrajeSlider.addEventListener('change', updateOkraje);
};

addSliderEventListeners();

const submitButton = document.querySelector('#cta');

const showInputError = () => {
    dataInput.classList.add('error');
};

const addDataInputEventListener = () => {
    dataInput.addEventListener('change', (e)=> {
        if (e.target.value !== '') {
            dataInput.classList.remove('error');
            submitButton.removeAttribute('disabled');
        } else {
            dataInput.classList.add('error');
            submitButton.setAttribute('disabled', true);
        }
    });
};

addDataInputEventListener();

//Volání parametrů
const prepareParameters = params => ({
    data: params.data,
    size: `${params.size}x${params.size}`,
    color: params.color.replace('#', ''),
    bgcolor: params.bgcolor.replace('#', ''),
    qzone: params.qzone,
});

const settingsContainer = document.querySelector('#qr-nastaveni')
const resultsContainer = document.querySelector('#qr-ukazat')
const qrCodeImage = document.querySelector('#qr-kod-image')

const displayQrCode = imgUrl => {
    settingsContainer.classList.add('flipped')
    resultsContainer.classList.add('flipped')

    qrCodeImage.setAttribute('src', imgUrl);
}

//ziskani qr
const getQrCode = parameters => {
    const urlParameters = new URLSearchParams(parameters).toString();
    const url = 'http://api.qrserver.com/v1/create-qr-code/';

    const fullUrl = `${url}?${urlParameters}`

    fetch(fullUrl).then(response => {
        if(response.status === 200) {
            displayQrCode(fullUrl);
        }
    });
};

const onSubmit = () => {
    console.log('clicked');

    const data = dataInput.value;

    if (!data.length) {
        return showInputError();
    }

    const color = mainColor.value;
    const bgcolor = backgroundColor.value;
    const size = velikostSlider.value;
    const qzone = okrajeSlider.value;

    const parameters = prepareParameters({ data, color, bgcolor, size, qzone });

    getQrCode(parameters)
};

const addSubmitEventListener = () => {
    submitButton.addEventListener('click', onSubmit);
};

addSubmitEventListener();

const editButton = document.querySelector('#edit')

const onEdit = () => {
    settingsContainer.classList.remove('flipped');
    resultsContainer.classList.remove('flipped');
}

const addEditButtonEventListener = () => {
    editButton.addEventListener('click', onEdit);
};

addEditButtonEventListener();