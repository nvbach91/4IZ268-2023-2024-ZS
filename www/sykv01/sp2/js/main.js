$(document).ready(function () {
    const redirect_uri = "https://eso.vse.cz/~sykv01/sp2/";
    const client_id = "dcac92f6794b4bf08906be4133a6f1cb";
    const client_secret = "5cd13f3875604fb5ad3eb22b04371733";
    
    var shareButton = $('#shareButton');
    var authenticateButton =$('#authenticateButton');
    var generateButton = $('#generateButton');
    var backButton = $('#backButton');
    var regenerateButton = $('#regenerateButton');
    var downloadButton = $('#downloadButton');
    var resultsContainer = $('#resultsContainer');
    var formContainer = $('.form-container');
    var canvasContainer = $("#canvasContainer");
    var colorPicker = $('.color-picker');
    var shareContainer = $('.share-container');

    var accessToken; 
    
    authenticateButton.on('click', function () {
        const authUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=user-read-private%20user-read-email%20user-top-read&show_dialog=true`;
        window.location.href = authUrl;
    });

    backButton.on('click', function () {
        formContainer.show();
        generateButton.show();
        authenticateButton.hide();
        resultsContainer.empty();
        colorPicker.hide();
        shareButton.hide();
        backButton.hide();
    });
    
    function handleRedirect() {
        const code = new URLSearchParams(window.location.search).get('code');
        if (code) {
            exchangeCodeForToken(code);
            history.pushState(code, null, '.');
        }
    }

    handleRedirect();

    function exchangeCodeForToken(code) {
        const tokenUrl = 'https://accounts.spotify.com/api/token';

        $.ajax({
            url: tokenUrl,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
            },
            data: {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirect_uri,
            },
            success: function (data) {
                accessToken = data.access_token;
                displayForm();
                generateButton.show();
                authenticateButton.hide();
            },
            error: function (error) {
                console.error('Error exchanging code for token:', error);
            }
        });
    }

    function getValues() {
        formContainer.hide();
        generateButton.hide();

        const fetchSelectionValue = $('#fetchSelection').val();
        const limitValue = $('#limit').val();

        if (fetchSelectionValue == 1) {
            fetchTopArtists(accessToken, limitValue);
        } else {
            fetchTopTracks(accessToken, limitValue);
        }
    }

    generateButton.on('click', function () {
        getValues();
    });

    function fetchTopTracks(accessToken, limitValue) {
        $.ajax({
            url: `https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=${limitValue}`,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
            success: function (data) {
                displayTopTracks(data.items);
            },
            error: function (error) {
                console.error('Error fetching top tracks:', error);
            }
        });
    }

    function displayTopTracks(tracks) {
        shareButton.show();
        backButton.show();
        showColorPicker();
        resultsContainer.empty();
        
        $.each(tracks, function (index, track) {
            const trackName = track.name;
            const artistName = track.artists[0].name;
            const albumCoverUrl = track.album.images[0].url;
            const previewUrl = track.preview_url;

            const trackContainer = $('<div>').addClass('track-result');
            const labelElement = $('<span>').text(index + 1);
            const albumCoverElement = $('<img>').attr({
                src: albumCoverUrl,
                alt: 'Album Cover'
            });

            const infoContainer = $('<div>').addClass('info-container');
            const trackElement = $('<h2>').text(trackName);
            const artistElement = $('<p>').text(artistName);
            const audioElement = $('<audio>').attr({
                controls: "controls",
                src: previewUrl,
                type: "audio/mpeg"
            });

            infoContainer.append(trackElement, artistElement, audioElement);
            trackContainer.append(labelElement, albumCoverElement, infoContainer);
            resultsContainer.append(trackContainer);
        });
    }

    function fetchTopArtists(accessToken, limitValue) {
        $.ajax({
            url: `https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=${limitValue}`,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
            success: function (data) {
                displayTopArtists(data.items);
            },
            error: function (error) {
                console.error('Error fetching top artists:', error);
            }
        });
    }
        
    function displayTopArtists(artists) {
        shareButton.show();
        backButton.show();
        showColorPicker();
        resultsContainer.empty();

        $.each(artists, function (index, artist) {
            const artistName = artist.name;
            const genres = artist.genres.join(', ');
            const artistImage = artist.images.length > 0 ? artist.images[0].url : '';

            const artistContainer = $('<div>').addClass('artist-result');
            const labelElement = $('<span>').text(index + 1);
            const artistImageElement = $('<img>').attr({
                src: artistImage,
                alt: 'Artist Image'
            });

            const infoContainer = $('<div>').addClass('info-container');
            const artistElement = $('<h2>').text(artistName);
            const genresElement = $('<p>').text(genres);

            infoContainer.append(artistElement, genresElement);
            artistContainer.append(labelElement, artistImageElement, infoContainer);
            resultsContainer.append(artistContainer);
        });
    }


    function showColorPicker() {
        $('.color-picker').css('display', 'flex');
    
        $('.dot').on('click', function () {
            const color = $(this).css('background-color');
            $('.container').css('background-color', color);
        });
    }

    shareButton.on('click', function () {
        colorPicker.hide();
        shareButton.hide();
        backButton.hide();
        
        html2canvas(canvasContainer[0], {
            allowTaint: true,
            useCORS: true
        }).then(function (canvas) { 
            shareContainer.append(canvas);
            
            downloadButton.on('click', function () {
                const canvasDataURL = canvas.toDataURL("image/png");
                const downloadLink = document.createElement('a');
                
                downloadLink.href = canvasDataURL;
                downloadLink.download = 'your_top_3_songs.png';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            });
            
        });
    
        canvasContainer.hide();
        
        regenerateButton.show();
        downloadButton.show();
    });

    regenerateButton.on('click', function () {
        regenerateButton.hide();
        downloadButton.hide();
    
        $('canvas').remove();
    
        canvasContainer.show();
        colorPicker.show();
        shareButton.show();
        backButton.show();
    });

    function displayForm() {
        resultsContainer.empty();
        colorPicker.hide();
        shareButton.hide();
        backButton.hide();

        var heading = $('<h2>').text('Select type and number of items you want to generate:');

        formContainer.append(heading);

        var fetchSelection = $('<select>').attr('id', 'fetchSelection');
        fetchSelection.append(
            $('<option>').attr('value', '1').text('Top Artists'),
            $('<option>').attr('value', '2').text('Top Tracks')
        );

        var limit = $('<select>').attr('id', 'limit');
        for (var i = 1; i <= 10; i++) {
            limit.append($('<option>').attr('value', i).text(i));
        }

        formContainer.append(fetchSelection, limit);
    }

    $(document).ready(function () {
        var colors = ["#ff9e99be", "#f7d9c4", "#FAEDCB", "#C9E4DE", "#C6DEF1", "#DBCDF0", "#FFFFFF"];
        var colorPickerContainer = $("#colorPickerContainer");

        for (var i = 0; i < colors.length; i++) {
            var colorDot = $("<span>").addClass("dot").css("background-color", colors[i]);
            colorPickerContainer.append(colorDot);
        }
    });
});