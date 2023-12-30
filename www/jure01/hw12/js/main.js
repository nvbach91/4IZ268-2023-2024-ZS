const client_id = '7d86f8d3ae1d85b60a04';
const client_secret = '04bff609a5da5bdf7c78eb5f091e2edeb93107b6';
const baseApiUrl = 'https://api.github.com';

function formatDateToCzech(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

document.addEventListener("DOMContentLoaded", function () {
  $('#find_button').click(function () {
    var searchValue = $('.input_area input').val();
    const userUrl = `${baseApiUrl}/users/${searchValue}?client_id=${client_id}&client_secret=${client_secret}`;
    const reposUrl = `${baseApiUrl}/users/${searchValue}/repos?client_id=${client_id}&client_secret=${client_secret}`;

    const showLoading = () => {
      $('#user_profile').empty().append('<div class="loading_message">Loading...</div>');
    };

    const hideLoading = () => {
      $('#user_profile .loading_message').remove();
    };

    showLoading();

    const renderUser = (user) => {
      const czechRegistrationDate = formatDateToCzech(user.created_at);
      $('#user_profile').empty().append(`
<div class="user_container">
  <div class="user_name">${user.name || ''}</div>
  
  <div class="user_left">
    <div class="user_image">
      <img src="${user.avatar_url}" width="250"/>
    </div>
    <div class="href_button">
      <button id="view_button"><a href="${user.html_url || ''}" class="href_text">View profile</a></button>
    </div>
  </div>
  
  <div class="user_right">
    <div class="user_text">
      <div class="user_detail">
        <div class="user_light">Login:</div>
        <div class="user_bold">${user.login || ''}</div>
      </div>
      <div class="user_detail">
        <div class="user_light">Bio:</div>
        <div class="user_bold">${user.bio || ''}</div>
      </div>
      <div class="user_detail">
        <div class="user_light">Location:</div>
        <div class="user_bold">${user.location || ''}</div>
      </div>
      <div class="user_detail">
        <div class="user_light">Description:</div>
        <div class="user_bold">${user.description || ''}</div>
      </div>
      <div class="user_detail">
        <div class="user_light">Email:</div>
        <div class="user_bold">${user.email || ''}</div>
      </div>
      <div class="user_detail">
        <div class="user_light">Followers:</div>
        <div class="user_bold">${user.followers || ''}</div>
      </div>
      <div class="user_detail">
        <div class="user_light">Registered:</div>
        <div class="user_bold">${czechRegistrationDate || ''}</div>
      </div>
      <div class="user_detail">
        <div class="user_light">Link:</div>
        <div class="user_bold">${user.html_url || ''}</div>
      </div>
    </div>
  </div>
</div>
      `);
    };

    const renderRepos = (repos) => {
      $('#repos').empty();
      $('#repos').append(`
<h2>Repositories</h2>
<div>This user has ${repos.length} repositories</div>`
      );
      repos.forEach(repo => {
        $('#repos').append(`
  <div class="repo">
    <div class="repo_name">${repo.name}</div>
    <div class="repo_link"><a href="${repo.html_url}" target="_blank">${repo.html_url}</a></div>
  </div>
        `);
      });
    };

    const handleUserNotFoundError = () => {
      $('#user_profile').empty().append(`<div>User not found</div>`);
    };

    const handleNetworkError = () => {
      $('#user_profile').empty().append(`<div>Network error occurred</div>`);
    };

    showLoading();

    fetch(userUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('User not found');
        }
        return response.json();
      })
      .then(data => {
        renderUser(data);
        return fetch(reposUrl);
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching repositories');
        }
        return response.json();
      })
      .then(reposData => {
        renderRepos(reposData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);

        if (error.message === 'User not found') {
          handleUserNotFoundError();
        } else {
          handleNetworkError();
        }
      })
      .finally(() => {
        hideLoading();
      });
  });
});
