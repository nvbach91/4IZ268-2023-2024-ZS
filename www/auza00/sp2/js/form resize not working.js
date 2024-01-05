let fileID = '';

let values2 = [];
function handleFormSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const formJSON = Object.fromEntries(data.entries());

  // for multi-selects, we need special handling
  formJSON.type = data.getAll('type');

  function uploadImage() {
    //let file = document.getElementById('fotka').files[0];
    let fileContent = document.getElementById('fotka').files[0]; // As a sample, upload a text file.

    console.log('filecontent: ' + fileContent);
    function resize() {
      //define the width to resize e.g 600px
      let resize_width = 600;//without px

      //get the image selected
      let item = fileContent;

      //create a FileReader
      let reader = new FileReader();

      //image turned to base64-encoded Data URI.
      reader.readAsDataURL(item);
      reader.name = item.name;//get the image's name
      reader.size = item.size; //get the image's size
      reader.onload = function (event) {
        let img = new Image();//create a image
        img.src = event.target.result;//result is base64-encoded Data URI
        img.size = event.target.size;//set size (optional)
        img.onload = function (el) {
          let elem = document.createElement('canvas');//create a canvas

          //scale the image to 600 (width) and keep aspect ratio
          let scaleFactor = resize_width / el.target.width;
          elem.width = resize_width;
          elem.height = el.target.height * scaleFactor;

          //draw in canvas
          let ctx = elem.getContext('2d');
          ctx.drawImage(el.target, 0, 0, elem.width, elem.height);

          //get the base64-encoded Data URI from the resize image
          let srcEncoded = ctx.canvas.toDataURL('image/*', 1);

          //assign it to thumb src
          document.querySelector('#image2').src = srcEncoded;

          /*Now you can send "srcEncoded" to the server and
          convert it to a png o jpg. Also can send
          "el.target.name" that is the file's name.*/

        }
      }
    };
    resize();

    let compressedImage = document.querySelector('#image2').src;

    if (compressedImage) {
      let file = new Blob([compressedImage], { type: 'image/*' });
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
      [document.getElementById("vyhlidka").checked],
      [document.getElementById("rybnik").checked],
      [document.getElementById("ohniste").checked],
      [document.getElementById("zricenina").checked],
      [document.getElementById("pristresek").checked],
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

  updateValues(SHEET_ID, 'A1:M' + numRows, true);
}

const form = document.querySelector('#add-form');
form.addEventListener('submit', handleFormSubmit);