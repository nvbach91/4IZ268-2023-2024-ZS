$(document).ready(function () {
    const CLIENT_ID = 'Iv1.105b583bbeefdb4c';
    const CLIENT_SECRET = '1b58dc633bdc298aaa3a336cb15c87f11f3f9f0a';
    const baseApiUrl = 'https://api.github.com';
  
    const userProfileContainer = $('#user-profile');
    const repositoriesContainer = $('#repositories');
  
    $('#search-form').submit(function (event) {
      event.preventDefault();
      const username = $('#username-input').val();

      if (username.trim() === '') {
        return;
      }
  
      const userUrl = `${baseApiUrl}/users/${username}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
      const repositoriesUrl = `${baseApiUrl}/users/${username}/repos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
  
      $.ajax({
        url: userUrl,
        method: 'GET',
        success: function (user) {
          renderUser(user);
          fetchRepositories(repositoriesUrl);
        },
        error: function () {
          userProfileContainer.empty().append('<p>User not found</p>');
          repositoriesContainer.empty();
        },
      });
    });
  
    const renderUser = function (user) {
        const createdDate = new Date(user.created_at);

        const day = createdDate.getDate().toString().padStart(2, '0');
        const month = (createdDate.getMonth() + 1).toString().padStart(2, '0'); 
        const year = createdDate.getFullYear();
        const formattedDate = `${day}. ${month}. ${year}`;
        const profileUrl = `https://github.com/${user.login}`;        


        userProfileContainer.empty().append(`
        <div id="user-name">${user.name}</div>
        <div class="basics">
            <div class="picture-link">
                <img class="picture" src="${user.avatar_url}" alt="${user.login}" />
                <div class="view-profile" onclick="window.open('${profileUrl}', '_blank')">
                <span>View Profile</span>
            </div>
            </div>
            <div class="general">
                <div class="info">
                    <a>Login</a>
                    <a>${user.login}</a>
                </div>        
                <div class="info">
                    <a>Username</a>
                    ${user.twitter_username ? `<a>@${user.twitter_username}</a>` : ''}
                </div>
                <div class="info">
                    <a>Location</a>
                    ${user.location ? `<a>${user.location}</a>` : ''}
                </div>
                <div class="info">
                    <a>Bio</a>
                    ${user.bio ? `<a>${user.bio}</a>` : ''}
                </div>  
                <div class="info">
                    <a>Email</a>
                    ${user.email ? `<a>${user.email}</a>` : ''}
                </div>
                <div class="info">
                    <a>Followers</a>
                    <a>${user.followers}</a>
                </div>
                <div class="info">
                    <a>Registered</a>
                    <a>${formattedDate}</a>
                </div>
                <div class="info">
                    <a href="${profileUrl}" target="_blank">${profileUrl}</a>
                </div>
            </div>
        </div>
      `);
    };
  
    const fetchRepositories = function (url) {
      $.ajax({
        url: url,
        method: 'GET',
        success: function (repositories) {
          renderRepositories(repositories);
        },
        error: function () {
          repositoriesContainer.empty().append('<p>No repositories found</p>');
        },
      });
    };
  
    const renderRepositories = function (repositories) {
      repositoriesContainer.empty();
      if (repositories.length > 0) {
        const repositoriesList = $('<ul>').addClass('repo-list');
        repositories.forEach(function (repo) {
            const repoItem = $('<li>').addClass('repo-item');
            repoItem.append(`<div class="repo-name">${repo.name}</div>`);
            repoItem.append(`<div class="repo-link"><a href="${repo.html_url}" target="_blank">${repo.html_url}</a></div>`);
            repositoriesList.append(repoItem);
        });
        repositoriesContainer.append(`<p>This user has ${repositories.length} repositories</p>`);
        repositoriesContainer.append(repositoriesList);
      } else {
        repositoriesContainer.append('<p>No repositories found</p>');
      }
    };
  });