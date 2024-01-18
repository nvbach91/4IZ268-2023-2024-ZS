$(document).ready(function () {
    const redirect_uri = "https://eso.vse.cz/~sykv01/sp2/";
    const client_id = "dcac92f6794b4bf08906be4133a6f1cb";
    const client_secret = "5cd13f3875604fb5ad3eb22b04371733";

    $('#authenticateButton').on('click', function () {
        const authUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=user-read-private%20user-read-email%20user-top-read&show_dialog=true`;
        window.location.href = authUrl;
    });

    function handleRedirect() {
        const code = new URLSearchParams(window.location.search).get('code');
        if (code) {
            exchangeCodeForToken(code);
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
                const accessToken = data.access_token;

                fetchTopTracks(accessToken);
                $('#authenticateButton').hide();
                $('#shareButton').show();
                showColorPicker();
            },
            error: function (error) {
                console.error('Error exchanging code for token:', error);
            }
        });
    }

    function fetchTopTracks(accessToken) {
        $.ajax({
            url: 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=3',
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
        const resultsContainer = $('#resultsContainer');
        resultsContainer.empty();

        $.each(tracks, function (index, track) {
            const trackName = track.name;
            const artistName = track.artists[0].name;
            const albumCoverUrl = track.album.images[0].url;

            const trackContainer = $('<div>').addClass('track-result');
            const labelElement = $('<span>').text(index + 1);
            const albumCoverElement = $('<img>').attr({
                src: albumCoverUrl,
                alt: 'Album Cover'
            });
            const infoContainer = $('<div>').addClass('info-container');
            const trackElement = $('<h2>').text(trackName);
            const artistElement = $('<p>').text(artistName);

            infoContainer.append(trackElement, artistElement);
            trackContainer.append(labelElement, albumCoverElement, infoContainer);
            resultsContainer.append(trackContainer);
        });
    }

    function showColorPicker() {
        $('.color-picker').css('display', 'flex');
    
        $('.dot').on('click', function () {
            const color = $(this).css('background-color');
            $('.container').css('background-color', color);
        });
    }

    $('#shareButton').on('click', function () {
        $('.color-picker').hide();
        $('#shareButton').hide();
        
        html2canvas($("#canvasContainer")[0], {
            allowTaint: true,
            useCORS: true
        }).then(function (canvas) { 
            $('.share-container').append(canvas);
            
            $('#downloadButton').on('click', function () {
                const canvasDataURL = canvas.toDataURL("image/png");
                const downloadLink = document.createElement('a');
                
                downloadLink.href = canvasDataURL;
                downloadLink.download = 'your_top_3_songs.png';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            });
            
        });
    
        $("#canvasContainer").hide();
        
        $('#regenerateButton').show();
        $('#downloadButton').show();
    });

    $('#regenerateButton').on('click', function () {
        $('#regenerateButton').hide();
        $('#downloadButton').hide();
        
        $('canvas').remove();
        
        $("#canvasContainer").show();
        $('.color-picker').show();
        $('#shareButton').show();
    });
});