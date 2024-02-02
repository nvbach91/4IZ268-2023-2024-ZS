async function limitedFunction() {
    let isRunning = true;
    let timeoutReached = false;

    const timer = setTimeout(() => {
        timeoutReached = true;
        if (!isRunning) {
            limitedFunction();
        }
    }, 10000);

    try {
        await getAndSendEmails();
    } catch (error) {
        console.error("Error in getAndSendEmails:", error);
    } finally {
        isRunning = false;
        if (timeoutReached) {
            clearTimeout(timer);
            limitedFunction();
        }
    }
}

async function getAndSendEmails() {
    //změnit let na const a upravit  storage = storage.filter(item => item.id !== email.id);
    let storage = JSON.parse(localStorage.getItem('UNSENT_EMAIL')) || [];
    for (const email of storage) {
        try {
            await sendEmail(email);
            storage = storage.filter(item => item.id !== email.id);
        } catch (error) {
            console.error("Error sending email:", error);
        }
    }
    localStorage.setItem('UNSENT_EMAIL', JSON.stringify(storage));
}

const sendEmail = (emailObject, index) => {
    const formData = new FormData();
    formData.set('to', emailObject.to);
    formData.set('cc', emailObject.cc);
    formData.set('subject', emailObject.subject);
    formData.set('body', emailObject.body);
    return $.ajax({
        url: "/api/sendEmail",
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        type: 'POST',
        beforeSend: function (request) {
            const apiKey = JSON.parse(localStorage.getItem("API_KEY"))
            request.setRequestHeader("Api-Key", apiKey);
        },
        success: function () {
            console.log("SUCCESS!");
        },
        error: function () {
            console.log("ERROR!");
        }
    });
}

limitedFunction();

//send-email
const localStorageKey = 'UNSENT_EMAIL';
const form = document.querySelector("#emailForm");
function initializeForm() {
    // Tuto část kódu přesuneme z globálního prostoru do této funkce
    $("#emailForm").off('submit').on('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this); // Použijeme 'this' pro odkaz na aktuální formulář
        $.ajax({
            url: "/api/sendEmail",
            type: 'POST',
            data: formData,
            cache: false,
            processData: false,
            contentType: false,
            beforeSend: function (request) {
                const apiKey = JSON.parse(localStorage.getItem("API_KEY"))
                request.setRequestHeader("Api-Key", apiKey);
                Swal.fire({
                    icon: "info",
                    title: "sending...",
                    showConfirmButton: false,
                });
            },
            success: function () {
                console.log("SUCCESS!");
                Swal.fire({
                    icon: "success",
                    title: "Email sent!",
                    showConfirmButton: false,
                    timer: 2500
                });
            },
            error: function (xhr) {
                if (xhr.status === 403) {
                    Swal.fire({
                        icon: "error",
                        title: "Wrong API key",
                        showConfirmButton: false,
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Email was not sent, inserting into local storage",
                        showConfirmButton: false,
                    });
                    const emailData = {
                        id: Date.now().toString(),
                        to: formData.get("to"),
                        cc: formData.get("cc"),
                        subject: formData.get("subject"),
                        body: formData.get("body"),
                    };
                    const storage = JSON.parse(localStorage.getItem(localStorageKey)) || [];
                    storage.push(emailData);
                    localStorage.setItem(localStorageKey, JSON.stringify(storage));
                }
            }
        });
    });
}


const initializeSendEmailButton = () => {
    $("#emailBtn").on('click', () => {
        renderSendEmail();     
    });
};

const initializeLocalStorageButton = () => {
    $("#localStorageBtn").on('click', () => {
        renderLocalStorage();     
    });
};

const initializeApiButton = () => {
    $("#apiBtn").on('click', () => {
        renderApiKey();     
    });
};
//local-storage
const displayEmailsFromLocalStorage = () => {
    const storage = JSON.parse(localStorage.getItem('UNSENT_EMAIL')) || [];
    let emailItemsHtml = '';
    storage.forEach((email) => {
        emailItemsHtml += `
            <div class="email-item list-group-item" data-email-id="${email.id}">
                <div class="row">
                    <div class="col">ID: ${email.id}</div>
                    <div class="col">Komu: ${email.to}</div>
                    <div class="col">CC: ${email.cc}</div>
                    <div class="col">Předmět: ${email.subject}</div>
                    <div class="col">Zpráva: ${email.body}</div>
                </div>
            </div>`;
    });
    $("#emailList").html(emailItemsHtml);
};


//api-key
const initializeApiKeyButton = () => {
    $("#verifyButton").off('click').on('click', () => {
        const apiKey = $("#apiKeyInput").val();
        if (apiKey) { // Zkontrolujte, zda byla hodnota zadána
            localStorage.setItem("API_KEY", JSON.stringify(apiKey));
            Swal.fire({
                icon: "success",
                title: "API key entered",
                showConfirmButton: false,
            });
        }
    });
};


//rendering
const container = $("#container");
const renderApiKey = () => {
    container.empty();
    window.history.pushState(null, 'API Key page', '/');
    $("#container").append(`
            <div id="api-logo">
                <h1>LOGO</h1>
            </div>
            <label for="apiKeyInput">Vložte API klíč</label>
            <div class="input-group mb-3">
                <input type="text" class="form-control" id="apiKeyInput" placeholder="input field" aria-label="API Key" aria-describedby="basic-addon2">
            </div>
            <button id="verifyButton" class="btn btn-primary" type="button">Potvrdit</button>
            `);
    initializeApiKeyButton();

}

const renderLocalStorage = () => {
    container.empty();
    window.history.pushState(null, 'Index page', '/');
    $("#container").append(`
        <div class="container mt-5">
            <div class="text-center">
                <h1>LOGO</h1>
            </div>
            <h2 class="text-center mt-3">Mails saved in local storage</h2>
            <div id="emailList" class="list-group">
            </div>
        </div>
        `);

    displayEmailsFromLocalStorage();
}

const renderSendEmail = () => {
    container.empty();
    window.history.pushState(null, 'Index page', '/');
    $("#container").append(`
        <div class="container mt-5">
            <h2>Create New Email</h2>

            <form id="emailForm">
                <div class="form-group">
                    <label for="subject">Subject:</label>
                    <input type="text" class="form-control" id="subject" name="subject" required>
                </div>
                <div class="form-group">
                    <label for="to">Recipient:</label>
                    <input type="email" class="form-control" id="to" name="to" required>
                </div>
                <div class="form-group">
                    <label for="cc">CC:</label>
                    <input type="email" class="form-control" id="cc" name="cc">
                </div>
                <div class="form-group">
                    <label for="body">Body:</label>
                    <textarea class="form-control" id="body" rows="4" name="body" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Send Email</button>
            </form>
        </div>
        `);

    initializeForm();
}

const renderIndex = () => {
    container.empty();
    window.history.pushState(null, 'Index page', '/');
    $("#container").append(`
            <div id="header">
                <div id="logo">
                    <H1>Best email messaging app ever</H1>
                </div>
            </div>
            <div id="welcomeSection" class="p-3">
                <p>Welcome text</p>
            </div>
            <div class="action-buttons">
                <button id="emailBtn" class="btn btn-primary">Create New Email</button>
                <button id="localStorageBtn" class="btn btn-secondary">Emails Saved in Local Storage</button>
                <button id="apiBtn" class="btn btn-secondary">Enter the API key</button>
            </div>
        `);
        initializeSendEmailButton();
        initializeLocalStorageButton();
        initializeApiButton();
}

renderIndex();



$('#navHome').click(renderIndex);

$('#navBrand').click(function (event) {
    event.preventDefault();
    renderIndex();
});

$('#navLocalStorage').click(function (event) {
    event.preventDefault();
    renderLocalStorage();
});

$('#navSendEmail').click(function (event) {
    event.preventDefault();
    renderSendEmail();
});

$('#navApiKey').click(function (event) {
    event.preventDefault();
    renderApiKey();
});