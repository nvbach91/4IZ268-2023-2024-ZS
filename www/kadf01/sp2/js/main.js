(function () {
    let token;
    let tierlist = [];
    let artist;
    let resetBtn;
    let downloadBtn;
    let buttonDiv;
    const artistInfoDiv = document.getElementById(`artistInfo`);
    const clientId = `5f0e192cc62442ebb2523ae510563654`;
    const clientSecret = `2e8b08a40828414ba3b1307aa3228bbb`;

    const tierlistDiv = document.getElementById(`tierlist`);
    const tracksDiv = document.getElementById(`tracks`);
    const albumSelect = document.getElementById(`albumSelect`);
    const tlTitle = document.getElementById(`tlTitle`)
    const rightSide = document.getElementById(`rightSide`);
    const loader = document.querySelector(`.loader-container`)

    document.getElementById("findBtn").addEventListener("click", getAlbums);
    document.getElementById(`artistName`).addEventListener(`keypress`, function (e) {
        if (e.key === `Enter`) {
            getAlbums();
        };
    });
    document.getElementById("artistName").addEventListener("click", resetContent);
    document.getElementById("albumSelect").addEventListener("click", getTracks);

    tierlistDiv.addEventListener(`click`, function (event) {
        const deleteBtn = event.target.closest(`.track-button`); //finds the closest element with specified class, if it doesnt find anything it will return null
        if (deleteBtn) {
            const index = deleteBtn.getAttribute(`data-index`); //gets the value from specified element, if it doesnt find anything it will return null
            if (index !== null) {
                removeFromTierlist(parseInt(index, 10)); //converts the string and activates specified function on the track with certain index
            }
        }
    });//assigns 'click' event to the 'tierlist' element with the 'removeFromTierlist' funcion

    tierlistDiv.addEventListener(`dragstart`, handleDragStart);
    tierlistDiv.addEventListener(`dragover`, handleDragOver);
    tierlistDiv.addEventListener(`drop`, handleDrop);


    async function getToken() {
        showSpinner();
        const response = await fetch(`https://accounts.spotify.com/api/token`, {
            method: `POST`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', //specifies the type of media that is being sent
                'Authorization': 'Basic ' + btoa(clientId + `:` + clientSecret) //authorization using credentials which I got on the API`s official website
            },
            body: `grant_type=client_credentials` //defines body of the request and specifies what is requested
        });
        const accessData = await response.json(); //waits for the response to be read as json 
        hideSpinner();
        token = accessData.access_token; //assigns the token to a variable
    } //getting the token for authorisation purposes

    async function getAlbums() {
        if (!token) {
            await getToken();
        } //checks whether the token is available, if not it gets one

        const artistName = document.getElementById(`artistName`).value;
        if (artistName !== ``) {
            showSpinner();
            const artistResponse = await fetch(`https://api.spotify.com/v1/search?q=${artistName}&type=artist`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }); //sends request to search an artist
            const artistData = await artistResponse.json();
            hideSpinner();
            artist = artistData.artists.items[0];

            showSpinner();
            const albumsResponse = await fetch(`https://api.spotify.com/v1/artists/${artist.id}/albums`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            const albumsData = await albumsResponse.json();
            hideSpinner();

            albumSelect.innerHTML = `<option>Select an album</option>` +
                albumsData.items.map(album => `
                <option value="${album.id}">${album.name}</option>
            `).join(``); //creates html (option in select element) for each album


            //creates the section regarding basic artist information
            tlTitle.style.display = `block`;
            artistInfoDiv.innerHTML = ``;
            artistInfoDiv.style.display = `flex`;
            const artistTextDiv = document.createElement(`div`);
            artistTextDiv.id = `artistText`;
            const artistImg = document.createElement(`img`);
            artistImg.id = `artistImg`;
            artistImg.src = artist.images[0].url;
            artistImg.alt = artist.name;
            const nameH3 = document.createElement(`h3`);
            nameH3.classList = `name`;
            nameH3.textContent = artist.name;
            const listenersH3 = document.createElement(`h3`);
            listenersH3.classList = `listeners`;
            listenersH3.textContent = `Monthly Listeners: ` + artist.followers.total;
            artistInfoDiv.appendChild(artistImg);
            artistInfoDiv.appendChild(artistTextDiv);
            artistTextDiv.appendChild(nameH3);
            artistTextDiv.appendChild(listenersH3);

            //reset button
            if (document.querySelector(`#resetBtn`)) {
                return;
            };
            resetBtn = document.createElement(`button`);
            resetBtn.textContent = `Reset`;
            resetBtn.id = `resetBtn`;
            buttonDiv = document.createElement(`div`)
            buttonDiv.id = `buttonDiv`;
            artistInfoDiv.appendChild(buttonDiv);
            buttonDiv.appendChild(resetBtn);
            resetBtn.addEventListener(`click`, resetContent);

            if (document.querySelector(`#downloadBtn`)) {
                return;
            };
            downloadBtn = document.createElement(`button`);
            downloadBtn.textContent = `Save`;
            downloadBtn.id = `downloadBtn`;
            buttonDiv.appendChild(downloadBtn);
            downloadBtn.addEventListener(`click`, download);


            //reset 
            tierlist = [];
            updateTierlist();
            tracksDiv.innerHTML = ``;
        };
    } //function activated by pressing the `find` button, it generates options in the select input menu

    async function getTracks() {
        if (!token) {
            await getToken();
        }
        const albumId = document.getElementById(`albumSelect`).value;
        if (albumId !== `Select an album`) {
            showSpinner();
            const albumResponse = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            const albumData = await albumResponse.json();
            hideSpinner();

            showSpinner();
            const tracksResponse = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            const tracksData = await tracksResponse.json();

            hideSpinner();
            tracksDiv.innerHTML = tracksData.items.map((track) => `
                <div class="track-item">
                    <img src=${albumData.images[0].url} alt="${albumData.name}">
                    <span>${track.name}</span>
                    <h2>Add</h2>
                    <button class="track-button" data-track="${track.name}" data-album="${albumData.name}" data-cover="${albumData.images[0].url}">Add</button>
                </div>
            `).join(``); //creates html for each track then puts them together
            tracksDiv.addEventListener(`click`, function (event) {
                if (event.target.matches(`.track-button`)) {
                    const trackName = event.target.getAttribute(`data-track`);
                    const albumName = event.target.getAttribute(`data-album`);
                    const albumCover = event.target.getAttribute(`data-cover`);
                    addToTierlist(`
                            <img src="${albumCover}" alt="${albumName}" class="album-cover">
                            <span class="tl-track-name">${trackName}</span> 
                            <span class="tl-album-name">${albumName}</span>
                        `);
                }; //adds click to the `add` button, retrieves data and defines content of the tierlist item
            });
        }
    } //activated by clicking on an option in the select input menu, it generates the tracklist

    function resetContent() {
        tierlist = [];
        updateTierlist();
        tracksDiv.innerHTML = ``;
        artistInfoDiv.innerHTML = ``;
        tlTitle.style.display = `none`;
        albumSelect.innerHTML = `<option>Select an album</option>`;
        document.getElementById(`artistName`).value = ``;
        artistInfoDiv.style.display = `none`;
    } //resets the whole application

    function addToTierlist(trackName) {
        if (tierlist.includes(trackName)) {
            return;
        }; //checks if the track is already in the tierlist (to prevent duplicates)

        tierlist.push(trackName);
        updateTierlist();
    } //activated by pressing the `add` button, it pushes chosen item to the tierlist array

    function updateTierlist() {
        tierlistDiv.innerHTML = tierlist.map((track, i) => `
                <div class="draggable track-item" draggable="true">
                    <strong>${i + 1}</strong>
                    ${track}
                    <h2>Delete</h2>
                    <button class="track-button" data-index="${i}">Delete</button>
                </div>
            `).join(``);
    }//activated by altering the tierlist content, it updates the tierlist

    function removeFromTierlist(index) {
        tierlist.splice(index, 1);
        updateTierlist();
    } //activated by pressing the `delete` button, it deletes an item with a specific index 

    function handleDragStart(e) {
        const draggedIndex = Array.from(e.target.parentNode.children).indexOf(e.target);
        e.dataTransfer.setData(`text/plain`, draggedIndex);
    } //activated by dragging an item in tierlist, it sets the type and value of dragged data 

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = `move`;
    } //activated when dragging over a valid drop target, it changes cursor type and prevents default browser actions

    function handleDrop(e) {
        // e.preventDefault(); 
        {

            const draggedIndex = parseInt(e.dataTransfer.getData(`text/plain`), 10); //gets the index of a dragged item
            const targetTrackIndex = Array.from(e.target.parentNode.children).indexOf(e.target); //gets the index of an item on which it was dropped 

            if (!isNaN(draggedIndex)) { //checks whether the constant is a valid number
                const droppedTrack = tierlist[draggedIndex]; //gets the html of the item that was dropped
                tierlist.splice(draggedIndex, 1); //removes the dragged item from the original position
                tierlist.splice(targetTrackIndex, 0, droppedTrack); //creates a new copy of the dragged item on chosen position 
                updateTierlist();


            };
        };
        return false;
    } //activated when dropped onto a valid drop target, 

    function download() {
        buttonDiv.style.display = `none`;
        rightSide.style.padding = `2vh`;
        const body = document.querySelector(`body`)
        body.style.minHeight = `0vh`;
        const originalTracksDiv = tracksDiv.innerHTML;
        tracksDiv.innerHTML = ``;

        html2canvas(rightSide, { useCORS: true }).then(function (canvas) {
            const link = document.createElement(`a`);
            link.download = `tierlist.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
        }); //useCORS allows the function to load images from other domains, html2canvas returns a promise to a canvas element that represents the 'rightSide' element

        buttonDiv.removeAttribute(`style`);
        rightSide.removeAttribute(`style`);
        body.removeAttribute(`style`);
        tracksDiv.innerHTML = originalTracksDiv;

    } //activated by the 'save' button, it allows the user to save their tierlist as an image 
    function showSpinner() {
        loader.classList.add(`show`);
    }

    function hideSpinner() {
        loader.classList.remove(`show`);
    }
})();
