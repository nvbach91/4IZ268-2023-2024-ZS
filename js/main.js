// Příklad volání na GitHub API
var App = App || {};

const CLIENT_ID = 'a6c51a90905ddb46d4a5';     // client_id získáte po registraci OAuth účtu
const CLIENT_SECRET = 'e18d365d51e13de4f2adbe8f9d2738ccc6e1d335'; // client_secret získáte po registraci OAuth účtu

// sestavujeme URL, který obsahuje parametry CLIENT_ID a CLIENT_SECRET
// každý parametr se určuje v podobě klíč=hodnota, parametry se oddělují ampersandem, 
// na začátek přidáme otazník
// např. ?client_id=abcdef&client_secret=fedcba

// render the user's information
App.renderUser = (user) => {
    var html = `
    <div id="user-profile">
        <img class="profile-img" src="${user.avatar_url}"><br>
        <h2 class="profile-login">${user.login}</h2><br>
        <p>Company: </p><p class="profile-bio">${user.company}</p><br>
        <p>Location: </p><p class="profile-location">${user.location}</p><br>
        <p>Description: </p><p class="profile-description">${user.bio}</p><br>
        <p>Email: </p><p class="profile-email">${user.email}</p><br>
        <p>Followers: </p><p class="profile-followers">${user.followers}</p><br>
        <p>Registred: </p><p class="profile-registered">${user.created_at}</p><br>
        <p>Link: </p><p class="profile-link">${user.html_url}</p>
    </div>
    `;
      App.jUserProfile.html(html);
};
// a function that fetches repositories of users based on their username
App.fetchRepositories = (user) => {
    App.jRepositories.empty();
    var url = 'https://api.github.com/users/' + user.login + '/repos';
    $.ajax({
        url: url,
        data: {
            client_id: App.client_id,
            client_secret: App.client_secret,
        },
    }).done(function(repositories) {
        var html = `<h2>Repositories</h2>`;
        repositories.forEach(function(repository) {
        html += `
            <div class="repository">
                <div class="repo-name">${repository.name}</div>
                <div class="repo-url">${repository.html_url}</div>
            </div>
        `;
    });
    App.jRepositories.empty().append(html);
    });
};

App.init = function() {
    App.jUserProfile = $('#user-profile');
    App.jSearchInput = $('#username');
    App.jSearchSubmit = $('#submit');
    App.jRepositories = $('#repositories');
    App.jSearchSubmit.on("click", function(e) {
        e.preventDefault();
        var searchValue = App.jSearchInput.val();
        if (!searchValue) {
            return false;
        }
        var url = 'https://api.github.com/users/' + searchValue;
        $.ajax({
            url: url,
            data: {
            client_id: App.client_id,
            client_secret: App.client_secret,
        },
        }).done(function(user) {
            App.renderUser(user);
            App.fetchRepositories(user);
        }).fail(function() {
            App.jUserProfile.html('<p>User not found</p>');
            App.jRepositories.empty();
        });
    });
};
$(document).ready(function() {
    App.init();
});  
  