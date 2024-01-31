function init() {
    setupSiteSceleton();
    setupEvents();
    $(".overlay").fadeIn(300); // Enable spinner
    showExistingFiles();
    $(".overlay").fadeOut(300); // Disable spinner
}

function setupSiteSceleton() {
    const mainContainer = $('#mainContainer');

    const frameContainer = $('<div>').addClass('frame');
    mainContainer.append(frameContainer);

    const topItemsContainer = $('<div>').addClass('top-items');
    frameContainer.append(topItemsContainer);

    // File upload container
    const uploadsContainer = $('<div>').addClass('uploads');
    topItemsContainer.append(uploadsContainer);

    const fileInfoContainer = $('<div>').addClass('file-info-container');
    uploadsContainer.append(fileInfoContainer);

    const fileNameElement = $('<p>').text('Selected files:');
    const uploadFilesNamesContainer = $('<div>').addClass('files-names-container');
    fileInfoContainer.append(fileNameElement, uploadFilesNamesContainer);

    const uploadFilesNamesList = $('<ol>').addClass('files-names-list');
    uploadFilesNamesContainer.append(uploadFilesNamesList);

    const uploadButtonsForm = $('<form>').addClass('upload-buttons');
    uploadsContainer.append(uploadButtonsForm);

    const labelComponent = $('<label>').addClass('chose-file').attr('for', 'myFile').text('Chose files');
    const inputFileElement = $('<input>').attr('type', 'file').attr('id', 'myFile').prop('multiple', true);
    const submitButtonElement = $('<input>').addClass('submit-button').attr('type', 'button').prop('disabled', true).attr('value', 'Upload');
    uploadButtonsForm.append(labelComponent, inputFileElement, submitButtonElement);

    // Filter container
    const filterContainer = $('<div>').addClass('filter');
    topItemsContainer.append(filterContainer);

    const filterElement = $('<input>').addClass('filter-files-input').attr('type', 'text').attr('placeholder', 'Search...');
    const sortButtonDateElement = $('<input>').addClass('sort-button-date').attr('type', 'button').attr('value', 'Sort date ASC');
    filterContainer.append(filterElement, sortButtonDateElement);

    // Files container
    const filesContainer = $('<div>').addClass('files-list');
    frameContainer.append(filesContainer);

    // Spinner
    const overlaySpinnerContainer = $('<div>').addClass('overlay');
    mainContainer.append(overlaySpinnerContainer);

    const cvspinnerContainer = $('<div>').addClass('cv-spinner');
    overlaySpinnerContainer.append(cvspinnerContainer);

    const spinnerElement = $('<span>').addClass('spinner');
    cvspinnerContainer.append(spinnerElement);
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
        for (let i = 0; i < files.length; ++i) {
            const file = files[i];
            uploadFilesNamesList.append($('<li>').text(file.name));
        }
    });
    $(submitButtonElement).click(async () => await processFiles(inputFileElement));

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
}

async function showExistingFiles() {
    const response = await fetch('/files-manager/list', {
        method: "GET",
    });
    const filesList = await response.json();
    const filesContainer = $('.files-list');
    filesList.forEach(file => addFileToList(filesContainer, file));
}

async function processFiles(inputFile) {
    const files = inputFile.get(0).files;
    $(".overlay").fadeIn(300); // Enable spinner
    const response = await saveFilesOnDrive(files);
    const savedFiles = await response.json();
    const filesContainer = $('.files-list');
    savedFiles.forEach(savedFile => addFileToList(filesContainer, savedFile));
    $(".overlay").fadeOut(300); // Disable spinner
}

async function saveFilesOnDrive(files) {
    const formData = new FormData();
    for (let i = 0; i < files.length; ++i) {
        const file = files[i];
        formData.append("files", file);
    }
    return await fetch('/files-manager', {
        method: "POST",
        body: formData,
    });
}

async function deleteFileFromDrive(file) {
    const deleteParams = new URLSearchParams({
        fileName: file.name,
    })
    return await fetch('/files-manager?' + deleteParams.toString(), {
        method: "DELETE",
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
        $(".overlay").fadeIn(300);
        await deleteFileFromDrive(file);
        fileContainer.remove();
        $(".overlay").fadeOut(300);
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
    const fileContainerList = $('.files-list').children();
    for (let i = 0; i < fileContainerList.length; i++) {
        const fileElement = fileContainerList.eq(i);
        if (fileElement.find('.file-name').text().toLocaleLowerCase().includes(searchStr.toLocaleLowerCase())) {
            fileElement.show();
        } else {
            fileElement.hide();
        }
    }
}

function sortFilesByDate(desc = true) {
    let fileContainerList = $('.files-list').children();
    // Bubble sorting
    for (let i = 0; i < fileContainerList.length - 1; i++) {
        for (let j = 0; j < fileContainerList.length - 1 - i; j++) {
            const a = fileContainerList.eq(j);
            const b = fileContainerList.eq(j + 1);
            const dateA = new Date(a.find('.file-upload-date').text())
            const dateB = new Date(b.find('.file-upload-date').text())
            if (desc === true ? dateA < dateB : dateA > dateB) {
                b.swapWith(a); // swap elements
                fileContainerList = $('.files-list').children(); // Update file elements places
            }
        }
    }
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

init();