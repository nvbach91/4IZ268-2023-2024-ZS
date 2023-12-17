/**
 * Git The Hub
 */
const App = {};
App.client_id = 'a4236b8a0464a3a7da06';
App.client_secret = '';
App.baseApiUrl = 'https://api.github.com';

App.showRepositoriesHeader = () => {
    $('h2').show();
};
App.hideRepositoriesHeader = () => {
    $('h2').hide();
};



App.renderUser = (user) => {
    const userProfile = $('#user-profile');
    userProfile.empty();

    const iconPerson = '<i class="bi bi-person-fill"></i>';
    const iconGeo = '<i class="bi bi-geo-fill"></i>';
    const iconEnvelope = '<i class="bi bi-envelope-fill"></i>';
    const iconLink = '<i class="bi bi-link-45deg"></i>';
    const iconPeople = '<i class="bi bi-person-heart"></i>';


    const userAvatar = user.avatar_url ? `<img src="${user.avatar_url}" alt="${user.name}">` : '';
    const userName = user.name ? `<p>${iconPerson} ${user.name}</p>` : '';
    const userLogin = user.login ? `<p>${user.login}</p>` : '';
    const userBio = user.bio ? `<p>${user.bio}</p>` : '<p>No bio available</p>';
    const userLocation = user.location ? `<p>${iconGeo} ${user.location}</p>` : `<p>${iconGeo} Location not provided</p>`;
    const userEmail = user.email ? `<p>${iconEnvelope} ${user.email}</p>` : `<p>${iconEnvelope} No public email</p>`;
    const userFollowers = user.followers ? `<p>${iconPeople} ${user.followers}</p>` : `<p>${iconPeople} No followers</p>`;
    const userProfileLink = user.login ? `<p>${iconLink} <a href="https://github.com/${user.login}" target="_blank">https://github.com/${user.login}</a></p>` : '';
    userProfile.append(`
        ${userAvatar}
        ${userName}
        ${userLogin}
        ${userBio}
        ${userLocation}
        ${userEmail}
        ${userFollowers}
        ${userProfileLink}
    `);
};


App.renderRepositories = (repositories) => {
    const reposList = $('#repositories');
    reposList.empty();

    if (repositories.length === 0) {
        reposList.append('<li>There are no public repositories.</li>');
    } else {
        repositories.forEach(repo => {
            reposList.append(`
                <li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>
            `);
        });
    }
};

App.fetchRepositories = (username) => {
    $.ajax({
        url: `${App.baseApiUrl}/users/${username}/repos`,
        data: {
            client_id: App.client_id,
            client_secret: App.client_secret
        }
    }).done((repositories) => {
        App.renderRepositories(repositories);
    }).fail(() => {
        alert('Repositories could not be loaded.');
    });
};

App.fetchUser = (username) => {
    $.ajax({
        url: `${App.baseApiUrl}/users/${username}`,
        data: {
            client_id: App.client_id,
            client_secret: App.client_secret
        }
    }).done((user) => {
        App.renderUser(user);
    }).fail(() => {
        alert('User could not be found.');
    });
};


App.init = () => {
    App.hideRepositoriesHeader();
    $('#search-form').submit((event) => {
        event.preventDefault();
        const username = $('#search-form input[name="username"]').val().trim();
        if (username) {
            App.fetchUser(username);
            App.fetchRepositories(username);
            App.showRepositoriesHeader();
        } else {
            alert('Please enter a username.');
        }
    });
};


$(document).ready(() => {
    App.init();
});