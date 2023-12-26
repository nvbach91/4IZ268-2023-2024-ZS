// Příklad volání na GitHub API
const CLIENT_ID = '19b31a3c5088bcfbd179';     // client_id získáte po registraci OAuth účtu
const CLIENT_SECRET = '6642e9ee458e99018a1afcd12bf540b0708c155f'; // client_secret získáte po registraci OAuth účtu
const baseApiUrl = 'https://api.github.com';
// sestavujeme URL, který obsahuje parametry CLIENT_ID a CLIENT_SECRET
// každý parametr se určuje v podobě klíč=hodnota, parametry se oddělují ampersandem, 
// na začátek přidáme otazník
// např. ?client_id=abcdef&client_secret=fedcba
//const url = `${baseApiUrl}/users/${searchValue}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

const userProfileContainer = $('#user-profile')
const repositoriesContainer = $('#repositories');
const spin = `<div class = "spinner"></div>`;
const renderUser = (user) => {
    const userHtml = `
        <div class = "user_info">
            <div class = "login">${user.login}</div>
            <img src="${user.avatar_url}" alt="${user.login}">
            <div class = "user name"><div class = "info">Name</div>     ${user.name || 'Not found'}</div>
            <div class = "user company"><div class = "info">Company</div>    ${user.company || 'Not found'}</div>
            <div class = "user location"><div class = "info">Location</div>    ${user.location || 'Not found'}</div>
            <div class = "user description"><div class = "info">Description</div>  ${user.bio || 'Not found'}</div>
            <div class = "user email"><div class = "info">Email</div>  ${user.email || 'Not found'}</div>
            <div class = "user followers"><div class = "info">Followers</div>  ${user.followers}</div>
            <div class = "user following"><div class = "info">Following</div> ${user.following || '0'}</div>
            <div class = "user registered"><div class = "info">Registered</div> ${new Date(user.created_at).toLocaleDateString('cs-CZ')}</div>
            <div class = "user profile_link"><div class = "info">Profile Link</div><a href="${user.html_url}" target="_blank">    ${user.html_url}</a></div>
        </div>
    `;
    userProfileContainer.empty().append(userHtml);
};

const renderRepositories = (repositories) => {
    if (repositories.length > 0) {
        const repositoriesHtml = repositories.map(repo => `
            <div class ="repository-info">
                <div class ="repository_name">${repo.name}</div>
                <div class = "repository_link"><a href="${repo.html_url}" target="_blank">${repo.html_url}</a></div>
            </div>
        `).join('');
        repositoriesContainer.empty().append(repositoriesHtml);
    } else {
        repositoriesContainer.empty().append('<div>No repository found</div>');
    }
};

$('#search-btn').on('click', (event) => {
    event.preventDefault();
    const searchValue = $('#username').val().trim();
    if (searchValue) {
        userProfileContainer.append(spin);
        const userUrl = `${baseApiUrl}/users/${searchValue}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

        $.getJSON(userUrl).done((user) => {
            renderUser(user);
            fetchRepositories(user.login);
            spin.remove();
            
        }).fail(() => {
            userProfileContainer.empty().append('<div>User not found</div>');
            repositoriesContainer.empty();
            spin.remove();
        });
    }
});

const fetchRepositories = (userLogin) => {
    const reposUrl = `${baseApiUrl}/users/${userLogin}/repos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

    $.getJSON(reposUrl).done((repositories) => {
        renderRepositories(repositories);
    }).fail(() => {
        repositoriesContainer.empty().append('<div>Failed to fetch repositories</div>');
    });
};