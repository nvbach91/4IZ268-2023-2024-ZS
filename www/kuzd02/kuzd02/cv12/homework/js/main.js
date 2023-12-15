const App = {};

App.client_id = 'd15351263aa6bf23c24b';
App.client_secret = '1dd7a6da4660afe1931da21c9fcace5d3ec2998e';
App.baseApiUrl = 'https://api.github.com';

App.userProfiler = $("#user-profile");
App.repos = $("#repositories");

App.fetchUser = (user) => {
  const url = `${App.baseApiUrl}/users/${user}`;
  const data = {
    client_id: App.client_id,
    client_secret: App.client_secret
  }
  $.ajax({
    url,
    data
  }).done((user) => {
    App.userProfiler.show();
    App.userProfiler.empty()
    App.userProfiler.append(`<img src="${user.avatar_url}" class="card-img-top" alt="user-photo">`)
    App.userProfiler.append(`<div id="user-card" class="card-body">`)
    const list = `<ul class="list-group list-group-flush">
    <li class="list-group-item">${user.name}</li>
    <li class="list-group-item">${user.login}</li>
    <li class="list-group-item">${user.bio ? user.bio : "No bio"}</li>
    <li class="list-group-item">${user.location ? user.location : "No location"}</li>
    <li class="list-group-item">${user.email ? user.email : "No email"}</li>
    <li class="list-group-item">${user.followers}</li>
    <li class="list-group-item"><a href="https://github.com/${user.login}" target="_blank">https://github.com/${user.login}</a></li>
    </ul>`
    $("#user-card").append(list)
  }).fail(() => {
    alert('Error while loading the user.');
  });
};

App.fetchRepositories = (username) => {
  const url = `${App.baseApiUrl}/users/${username}/repos`
  const data = {
    client_id: App.client_id,
    client_secret: App.client_secret
  }
  $.ajax({
    url,
    data
  }).done((repositories) => {
    console.log(repositories)
    App.repos.show();
    App.repos.empty();
    if (repositories.length === 0) {
      App.repos.append(`<h3>There are no repositories.</h3>`);
    }
    else {
      App.repos.append(`<ul id="repos-list" class="list-group"></ul>`)
      const reposList = $(`$repos-list`)
      reposList.forEach(repo => {
        reposList.append(`<li class="list-group-item"><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`)
      })
    }
  }).fail(() => {
    alert('Error while loading the repositories.');
  });
};

App.init = () => {
  App.userProfiler.hide();
  App.repos.hide();
  $('#search-form').submit((event) => {
    event.preventDefault();
    var usernameValue = $('#search-form input[name="username"]').val().trim();
    if (!usernameValue) {
      alert('Empty name')
      return
    }
    App.fetchUser(usernameValue);
    App.fetchRepositories(usernameValue);
  });
};

$(document).ready(() => {
  App.init();
});