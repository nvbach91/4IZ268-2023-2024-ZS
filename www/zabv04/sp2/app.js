// Libraries
const path = require('path');
const express = require('express');
const { google }= require('googleapis');
const bodyParser = require('body-parser');
const { Readable } = require('stream');
const multer = require('multer');

// Constant variables
const SEPARATOR_CHARACTER = '|';
const SCOPE = ['https://www.googleapis.com/auth/drive'];
const PORT = process.env.PORT || 8080;
const ENV_VARIABLES = require('./env.js');

const app = express(); // Create our app/server

// Middleware for files processing
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
const uploads = multer();

app.use(express.static(__dirname + '/public')); // Server can freely get files from that folder without explicitly creating endpoints

app.listen(PORT, () => { console.log(`Server is ready on http://localhost:${PORT}`); }); // Start server

// Get main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

// Get all files metadata
app.get('/files-manager/list', async (req, res) => {
    const jwtClient = await authorize(); // Get Google Account client
    const filesList = await getFilesListOnDrive(jwtClient); // Get Drive files data
    res.status(200).send(filesList); // return result
});

// Save files on Google Drive
app.post('/files-manager', uploads.array('files'), async (req, res) => {
    const files = req.files; // Files to upload
    const jwtClient = await authorize() // Get Google Account client
    await saveFilesOnDrive(jwtClient, files); // Save files to Drive
    const filesList = await getFilesListOnDrive(jwtClient); // Get Drive files data
    // Filter all files data to only uploaded now files
    const targetFiles = filesList.filter((file) => files.find(originalFile => originalFile.originalname === file.originalName));
    res.status(200).send(targetFiles); // return result
});

// Delete file from Drive
app.delete('/files-manager', async (req, res) => {
    const fileName = req.query.fileName; // Get fileName
    const jwtClient = await authorize(); // Get Google Account client
    const filesList = await getFilesListOnDrive(jwtClient); // Get Drive files data
    const targetFile = filesList.find((file) => file.name === fileName); // Check that file with name like this exists
    if (!targetFile) {
        res.status(404).send(`File '${fileName}' is not found`); // if not exists return error
        return;
    }
    await deleteFilefromDrive(jwtClient, targetFile); // if exists delete file

    const newFilesList = await getFilesListOnDrive(jwtClient); // Get Drive files updated data to check that file is deleted
    res.status(200).send(newFilesList.data); // return result
});

// Authorize to Google account
async function authorize(){
    const jwtClient = new google.auth.JWT(
        ENV_VARIABLES.API_KEYS.client_email,
        null,
        ENV_VARIABLES.API_KEYS.private_key,
        SCOPE
    );

    await jwtClient.authorize();

    return jwtClient;
}

// A Function that will upload the desired files to google drive folder
async function saveFilesOnDrive(jwtClient, files){
    const drive = google.drive({version:'v3', auth:jwtClient}); // Get drive

    const now = new Date(); // Get date now
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Set each file metadate
        var fileMetaData = {
            // Due to google api not returning date of uploading, we save this date manualy in the name
            name: `${now.toISOString()}${SEPARATOR_CHARACTER}${file.originalname}`, // Example: 2024-01-28T20:28:51.068Z|File.txt => <date><separator><original_name>
            parents:[ENV_VARIABLES.ID_OF_THE_FOLDER] // A folder ID to which file will get uploaded
        }
        // Saving file
        await drive.files.create({
            resource: fileMetaData,
            media:{
                body: Readable.from(file.buffer), // file that will get uploaded
                mimeType: file.mimetype,
            }
        });
        // Google drive api lags when we get files imediately after saving.
        // Because of this we need to wait
        await new Promise(r => setTimeout(r, 150)); // wait for 0.15 sec
    }
}

async function getFilesListOnDrive(jwtClient){
    const drive = google.drive({version:'v3', auth:jwtClient}); // Get drive

    // Return file list
    const filesData = await drive.files.list({
        q: `'${ENV_VARIABLES.ID_OF_THE_FOLDER}' in parents and trashed=false` // Query to get files
    })

    // Update files data with original name and date of uploading
    return await Promise.all(filesData.data.files.map(async file => {
        return {
            ...file,
            fileId: file.id,
            originalName: file.name.slice(file.name.indexOf(SEPARATOR_CHARACTER) + 1), // Get right side of file name that saves file original name
            date: file.name.slice(0, file.name.indexOf(SEPARATOR_CHARACTER)), // Get left side of file name that saves file upload date
        }
    }));
}

async function deleteFilefromDrive(jwtClient, file){
    const drive = google.drive({version:'v3', auth:jwtClient}); // Get drive

    // Delete file by its id
    return await drive.files.delete({
        fileId: file.id,
    });
}