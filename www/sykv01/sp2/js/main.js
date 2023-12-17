function authenticateSpotify() {
    const clientId = '8c6a0409bfc345cc9ea4dfb14a330f4b';
    const redirectUri = 'http://127.0.0.1:5500/index.html';
    const scopes = ['user-read-private', 'user-top-read'];

    const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}&response_type=token`;

    window.location.href = authorizeUrl;
}

document.querySelector('#authenticateButton').addEventListener('click', authenticateSpotify);