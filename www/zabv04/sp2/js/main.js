const CLIENT_ID = '373556495065-56avdsroqgmn83a89fogbeus8nn01h3b.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBrMMSfRs_sJQfPcdInKRzU-OH4tljcx_c';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
const SCOPES = 'https://www.googleapis.com/auth/drive';
const SEPARATOR_CHARACTER = '|';

let tokenClient;
let gapiInited = false;
let gisInited = false;

window.onload = () => {
    gapiLoaded();
    gisLoaded();
    init();
}

function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
    });
    gapiInited = true;
    maybeEnableButtons();
}
 
function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: ''
    });
    gisInited = true;
    maybeEnableButtons();
}

function maybeEnableButtons(isSignedIn) {
    if (gapiInited && gisInited) {
        const signinElement = $('.signin');
        signinElement.css("display", 'block')
    }
}

function handleAuthClick() {
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw (resp);
        }
        const signinElement = $('.signin');
        const signoutElement = $('.signout');
        signinElement.css("display", 'none')
        signoutElement.css("display", 'block')

        showExistingFiles();
        const sortButtonDateElement = $('.sort-button-date')
        sortButtonDateElement.prop('disabled', false);
        const filterElement = $('.filter-files-input');
        filterElement.prop('disabled', false);
        const reloadButtonElement = $('.reload-button');
        reloadButtonElement.prop('disabled', false);
        const inputFileElement = $('#myFile');
        inputFileElement.prop('disabled', false);
    };
 
    if (gapi.client.getToken() === null) {
        tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
        tokenClient.requestAccessToken({ prompt: '' });
    }
}

function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
        
        const signinElement = $('.signin');
        signinElement.css("display", 'block');
        const signoutElement = $('.signout');
        signoutElement.css("display", 'none');
        const filesContainer = $('.files-list');
        filesContainer.empty();
        const sortButtonDateElement = $('.sort-button-date')
        sortButtonDateElement.prop('disabled', true);
        const filterElement = $('.filter-files-input');
        filterElement.prop('disabled', true);
        const reloadButtonElement = $('.reload-button');
        reloadButtonElement.prop('disabled', true);
        const inputFileElement = $('#myFile');
        inputFileElement.prop('disabled', true);
    }
}

function init() {
    setupSiteSceleton();
    setupEvents();
}

function setupSiteSceleton() {
    const mainContainer = $('#mainContainer');

    const authContainer = $('<div>').addClass('auth-buttons');
    const signinElement = $('<button>').addClass('signin').text('Sign In');
    const signoutElement = $('<button>').addClass('signout').text('Sign Out');

    const frameContainer = $('<div>').addClass('frame');

    const topItemsContainer = $('<div>').addClass('top-items');

    // File upload container
    const uploadsContainer = $('<div>').addClass('uploads');
    const fileInfoContainer = $('<div>').addClass('file-info-container');

    const fileNameElement = $('<p>').text('Selected files:');
    const uploadFilesNamesContainer = $('<div>').addClass('files-names-container');
    const uploadFilesNamesListElement = $('<ol>').addClass('files-names-list');

    const uploadButtonsForm = $('<form>').addClass('upload-buttons');
    const labelElement = $('<label>').addClass('chose-file').attr('for', 'myFile').text('Chose files');
    const inputFileElement = $('<input>').attr('type', 'file').attr('id', 'myFile').prop('multiple', true).prop('disabled', true);
    const submitButtonElement = $('<input>').addClass('submit-button').attr('type', 'button').prop('disabled', true).attr('value', 'Upload');

    // Filter container
    const filterContainer = $('<div>').addClass('filter');
    const filterElement = $('<input>').addClass('filter-files-input').attr('type', 'text').attr('placeholder', 'Search...').prop('disabled', true);
    const buttonsContainer = $('<div>').addClass('buttons-container');
    const reloadButtonElement = $('<input>').addClass('reload-button').attr('type', 'button').attr('value', 'Reload files').prop('disabled', true);
    const sortButtonDateElement = $('<input>').addClass('sort-button-date').attr('type', 'button').attr('value', 'Sort date ASC').prop('disabled', true);

    // Files container
    const filesContainer = $('<div>').addClass('files-list');

    // Spinner
    const overlaySpinnerContainer = $('<div>').addClass('overlay');
    const cvspinnerContainer = $('<div>').addClass('cv-spinner');
    const spinnerElement = $('<span>').addClass('spinner');

    cvspinnerContainer.append(spinnerElement);
    overlaySpinnerContainer.append(cvspinnerContainer);
    buttonsContainer.append(reloadButtonElement, sortButtonDateElement)
    filterContainer.append(filterElement, buttonsContainer);
    uploadButtonsForm.append(labelElement, inputFileElement, submitButtonElement);
    uploadFilesNamesContainer.append(uploadFilesNamesListElement);
    fileInfoContainer.append(fileNameElement, uploadFilesNamesContainer);
    uploadsContainer.append(fileInfoContainer, uploadButtonsForm);
    topItemsContainer.append(uploadsContainer, filterContainer);
    frameContainer.append(topItemsContainer, filesContainer);
    authContainer.append(signinElement, signoutElement);
    mainContainer.append(authContainer, frameContainer, overlaySpinnerContainer);
}

function setupEvents() {
    // Events for file upload
    const inputFileElement = $('#myFile');
    const submitButtonElement = $('.submit-button');
    const uploadFilesNamesList = $('.files-names-list');
    $(inputFileElement).on('change', () => {
        const files = inputFileElement.get(0).files;
        uploadFilesNamesList.empty();
        submitButtonElement.prop('disabled', false); // Make upload button active
        const resultListElements = [];
        for (let i = 0; i < files.length; ++i) {
            const file = files[i];
            resultListElements.push($('<li>').text(file.name))
        }
        uploadFilesNamesList.append(...resultListElements);
    });
    $(submitButtonElement).click(async () => {
        await processFiles(inputFileElement);
        uploadFilesNamesList.empty();
        submitButtonElement.prop('disabled', true); // Deactivate upload button
    });

    // Events file sort
    const sortButtonDateElement = $('.sort-button-date')
    $(sortButtonDateElement).click(() => {
        if (sortButtonDateElement.val() === 'Sort date ASC') {
            sortButtonDateElement.attr('value', 'Sort date DESC');
            sortFilesByDate(false); // Sort ASC
        } else {
            sortButtonDateElement.attr('value', 'Sort date ASC')
            sortFilesByDate(true);  // Sort DESC
        }
    });

    // Events for file filter
    const filterElement = $('.filter-files-input');
    $(filterElement).on('input', () => filterFiles(filterElement.val()));

    // Events for file reupload
    const reloadButtonElement = $('.reload-button');
    $(reloadButtonElement).click( () => showExistingFiles());

    // Auth events
    const signinElement = $('.signin');
    signinElement.click(handleAuthClick);
    const signoutElement = $('.signout');
    signoutElement.click(handleSignoutClick);
}

async function showExistingFiles() {
    const spinnerContainer = $(".overlay");
    spinnerContainer.fadeIn(300); // Enable spinner

    const filesContainer = $('.files-list');
    // Return file list
    const filesList = await getFilesListOnDrive();

    filesContainer.empty();
    filesList.forEach(file => addFileToList(filesContainer, file));
    spinnerContainer.fadeOut(300); // Disable spinner
}

async function getFilesListOnDrive() {
    const filesData = await gapi.client.drive.files.list({
        q: `'${await getFolderId()}' in parents and trashed=false` // Query to get files
    })

    // Update files data with original name and date of uploading
    return filesData.result.files.map(file => {
        return {
            ...file,
            originalName: file.name.slice(file.name.indexOf(SEPARATOR_CHARACTER) + 1), // Get right side of file name that saves file original name
            date: file.name.slice(0, file.name.indexOf(SEPARATOR_CHARACTER)), // Get left side of file name that saves file upload date
        }
    });
}

async function getFolderId() {
    const response = await gapi.client.drive.files.list({
        // give name of the folder to check
        q: 'name = "Files Manager Folder"',
    })

    const files = response.result.files;
    if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            const folderId = files[i].id;
            return folderId;
        }
    } else {
        // if folder not available
        return await createFolder();
    }
}

async function createFolder() {
    const request = gapi.client.request({
        'path': 'drive/v2/files',
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + gapi.auth.getToken().access_token,
        },
        'body': {
            'title': 'Files Manager Folder',
            'mimeType': 'application/vnd.google-apps.folder'
        }
    });
    const response = await new Promise(resolve => request.execute((response) => {
        resolve(response);
    }));
    return response.id;
}

async function processFiles(inputFileElement) {
    const spinnerContainer = $(".overlay");
    spinnerContainer.fadeIn(300); // Enable spinner

    const files = inputFileElement.get(0).files;
    await saveFilesOnDrive(files);
    await showExistingFiles();

    spinnerContainer.fadeOut(300); // Disable spinner
    let savedFilesStr = files[0].name;
    for (let i = 1; i < files.length; i++) {
        savedFilesStr += ', ' + files[i].name;
    }
    alert(`Files ${savedFilesStr} saved successfully`);
}

async function saveFilesOnDrive(files) {
    const now = new Date(); // Get date now
    const filesList = await getFilesListOnDrive();
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        let fileExist = filesList.find(driveFile => driveFile.originalName === file.name);
        let newFileName = file.name;
        let j = 1;
        while (fileExist) {
            newFileName = file.name.replace(/\.[^/.]+$/, "") + ` (${j})` + '.' + file.name.split('.').pop();
            fileExist = filesList.find(driveFile => driveFile.originalName === newFileName);
            j++;
        }

        // Set each file metadate
        var metadata = {
            name: `${now.toISOString()}${SEPARATOR_CHARACTER}${newFileName}`,
            parents: [await getFolderId()],
        };

        const formData = new FormData();
        formData.append("metadata", new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        // set file as blob formate
        formData.append("file", file);
        await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
            method: 'POST',
            headers: new Headers({ "Authorization": "Bearer " + gapi.auth.getToken().access_token }),
            body: formData
        })

        await new Promise(r => setTimeout(r, 150)); // wait for 0.15 sec
    }
}

async function deleteFileFromDrive(file) {
    await gapi.client.drive.files.delete({
        // give file id to delete
        'fileId': file.id
    });
}

function addFileToList(filesContainer, file) {
    // File item
    const fileContainer = $('<div>').addClass('file');
    filesContainer.append(fileContainer);

    const imgElement = $('<img>').addClass('icon').attr('src', getIconByMimetype(file.mimeType));
    fileContainer.append(imgElement);

    const fileNameElement = $('<p>').addClass('file-name').text(file.originalName);
    fileContainer.append(fileNameElement);

    const fileDateElement = $('<p>').addClass('file-upload-date').text((new Date(file.date)).toLocaleString());
    fileContainer.append(fileDateElement);

    const fileDeleteButtonElement = $('<input>').addClass('delete-button').attr('type', 'button').attr('value', 'Delete');
    fileContainer.append(fileDeleteButtonElement);

    // Event to delete file
    $(fileDeleteButtonElement).click(async () => {
        if (confirm(`Are you sure you want to delete file ${file.originalName}`) !== true) {
            return;
        }
        const spinnerContainer = $(".overlay");
        spinnerContainer.fadeIn(300);
        await deleteFileFromDrive(file);
        await showExistingFiles();
        fileContainer.remove();
        spinnerContainer.fadeOut(300);
    });
}

function getIconByMimetype(mimeType) {
    if (mimeType.includes('audio/')) {
        return 'images/music.png';
    }
    if (mimeType.includes('image/')) {
        return 'images/picture.png';
    }
    if (mimeType.includes('application/vnd.openxmlformats-officedocument.presentationml.presentation')) {
        return 'images/powerpoint.png';
    }
    if (mimeType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
        return 'images/excel.png';
    }
    if (mimeType.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
        return 'images/word.png';
    }
    if (mimeType.includes('text/plain')) {
        return 'images/txt-file.png';
    }
    if (mimeType.includes('video/')) {
        return 'images/video.png';
    }
    if (mimeType.includes('text/javascript') || mimeType.includes('text/html') || mimeType.includes('text/xml') || mimeType.includes('text/css')) {
        return 'images/code.png';
    }

    return 'images/file.png';
}

function filterFiles(searchStr) {
    const frameContainer = $('.frame');
    const fileContainer = $('.files-list');
    fileContainer.detach();
    let fileContainerList = fileContainer.children();

    for (let i = 0; i < fileContainerList.length; i++) {
        const fileElement = fileContainerList.eq(i);
        if (fileElement.find('.file-name').text().toLocaleLowerCase().includes(searchStr.toLocaleLowerCase())) {
            fileElement.show();
        } else {
            fileElement.hide();
        }
    }
    frameContainer.append(fileContainer)
}

function sortFilesByDate(desc = true) {
    const frameContainer = $('.frame');
    const fileContainer = $('.files-list');
    fileContainer.detach();
    let fileContainerList = fileContainer.children();
    // Bubble sorting
    for (let i = 0; i < fileContainerList.length - 1; i++) {
        for (let j = 0; j < fileContainerList.length - 1 - i; j++) {
            const a = fileContainerList.eq(j);
            const b = fileContainerList.eq(j + 1);
            const dateA = new Date(a.find('.file-upload-date').text())
            const dateB = new Date(b.find('.file-upload-date').text())
            if (desc === true ? dateA < dateB : dateA > dateB) {
                b.swapWith(a); // swap elements
                fileContainerList = fileContainer.children(); // Update file elements places
            }
        }
    }
    frameContainer.append(fileContainer)
}

// Custom jquery function to swap elements, copypast
jQuery.fn.swapWith = function (to) {
    return this.each(function () {
        var copy_to = $(to).clone(true);
        var copy_from = $(this).clone(true);
        $(to).replaceWith(copy_from);
        $(this).replaceWith(copy_to);
    });
};

