/**
 * Git The Hub
 */
// It is best practice to create variables and functions under one object to avoid global polution
const App = {
  client_id: 'c0c4f20384580cdb4c72',
  client_secret: 'c6c63c31afafdf51ec5ba9b2be147c5c76e13427',
  baseApiUrl: 'https://api.github.com',

  init: () => {
    $('#search-form').submit(function (event) {
      event.preventDefault();
      const searchValue = $('input[name="username"]').val();
      App.fetchUser(searchValue);
    });
  },

  fetchUser: (username) => {
    const url = `${App.baseApiUrl}/users/${username}?client_id=${App.client_id}&client_secret=${App.client_secret}`;

    $.getJSON(url).done(App.renderUser).fail(() => {
      $('#user-profile').empty().append('<p>User not found</p>');
      $('#repositories').empty();
    });
  },

  renderUser: (user) => {
    const userProfileHTML = `
        <h2>${user.name}</h2>
        <p><img src="${user.avatar_url}" alt="${user.login}" width="100px"></p>
        <p>Followers: ${user.followers}</p>
        <p>Following: ${user.following}</p>
        <p>Repositories: ${user.public_repos}</p>
    `;
    $('#user-profile').html(userProfileHTML);
    App.fetchRepositories(user.login);
  },

  fetchRepositories: (username) => {
    const repoUrl = `${App.baseApiUrl}/users/${username}/repos?client_id=${App.client_id}&client_secret=${App.client_secret}`;
    $.getJSON(repoUrl)
      .done((repos) => {
        const repoList = repos.map(repo => `<li><a href="${repo.html_url}">${repo.name}</a></li>`).join('');
        $('#repositories').html(`<ul>${repoList}</ul>`);
      })
      .fail(() => {
        $('#repositories').empty().append('<p>Repositories could not be fetched.</p>');
      });
  },
};

// wait for the page to load, then execute the main processes
$(document).ready(() => {
  App.init();
});