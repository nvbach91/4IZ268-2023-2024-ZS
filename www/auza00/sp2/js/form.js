let fileID = '';

let values2 = [];
function handleFormSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const formJSON = Object.fromEntries(data.entries());

  // for multi-selects, we need special handling
  formJSON.type = data.getAll('type');

  async function uploadImage() {
    //let file = document.getElementById('fotka').files[0];
    let fileContent = document.getElementById('fotka').files[0]; // As a sample, upload a text file.
    if (fileContent) {
      let file = new Blob([fileContent], { type: 'image/*' });
      let metadata = {
        'name': numRows + 1, // Filename at Google Drive
        'mimeType': 'image/*', // mimeType at Google Drive
        'parents': ['17eRbMAstY--H5iBXqDIItbqKM9FcE38Q'], // Folder ID at Google Drive
      };

      let accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
      let form = new FormData();
      form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      form.append('file', file);

      return new Promise((resolve) => {
        fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {
          method: 'POST',
          headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
          body: form,
        }).then((res) => {
          return res.json();
        }).then(function (val) {
          console.log(val);
          fileID = val;
          resolve('resolved');
        });
      })
    }
    else {
      return false;
    }
  }


  async function updateValues(spreadsheetId, range, _values, callback) {
    const result = await uploadImage();
    values2 = [
      [numRows + 1],
      [formJSON.autor],
      [formJSON.nazev],
      [formJSON.popis],
      [parseFloat(map.getCenter().toArray()[0])],
      [parseFloat(map.getCenter().toArray()[1])],
      [document.getElementById('vyhlidka').checked],
      [document.getElementById('rybnik').checked],
      [document.getElementById('ohniste').checked],
      [document.getElementById('zricenina').checked],
      [document.getElementById('pristresek').checked],
      [0],
      [fileID.id]
    ];
    try {
      console.log(fileID);
      gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: spreadsheetId,
        range: range,
        valueInputOption: 'RAW',
        resource: {
          'majorDimension': 'COLUMNS',
          'values': values2
        },
      }).then((response) => {
        const result = response.result;
        console.log(`${result.updatedCells} cells updated.`);
        if (callback) callback(response);
      });
    } catch (err) {
      console.log(err.message);
      return;
    }
    window.location.reload();
  }

  updateValues(SHEET_ID, 'A1:M' + numRows, true)
}

const form = document.querySelector('#add-form');
if(form!==null){
  form.addEventListener('submit', handleFormSubmit);  
}
