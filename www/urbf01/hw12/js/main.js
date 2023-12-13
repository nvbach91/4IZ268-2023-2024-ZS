const resultsWrapper = $('#searchResultsWrapper');
const loader = $('<div class="loader"></div>');

CLIENT_ID = 'ed5fca32beab7f9af06a'; // client_id získáte po registraci OAuth účtu
CLIENT_SECRET = '52286ae34d72f57ee2943688258a3f9ed9fa0931'; // client_secret získáte po registraci OAuth účtu
baseApiUrl = 'https://api.github.com';

const renderUser = (user) => {
  const createdDate = new Date(user.created_at).toLocaleDateString('cs-CZ');
  const html = `
  <div class="user-profile">
    <h2>Profile</h2>
    <div class="user-name">${user.name || ''}</div>

    <div class="user-avatar" style="background-image: url(${user.avatar_url})">
    </div>

    <ul class="user-info">
      <li>Login <strong>${user.login}</strong></li>
      <li>Company <strong>${user.company || ''}</strong></li>
      <li>Location <strong>${user.location || ''}</strong></li>
      <li>Bio <strong>${user.bio || ''}</strong></li>
      <li>Email <strong>${user.email || ''}</strong></li>
      <li>Followers <strong>${user.followers || ''}</strong></li>
      <li>Registered <strong>${createdDate}</strong></li>
      <li>URL <a href="${user.html_url || ''}" target='_blank'>${user.html_url || ''}</a></li>
    </ul>

    <div class="user-profile-link">
      <a href="${user.html_url || ''}" target="_blank">View profile</a>
    </div>
  </div>`;

  resultsWrapper.html(html);
};

const renderRepositories = (repositories) => {
  let html = `
  <div class="user-repositories">
    <h2>Repositories</h2>
    <p>This user has ${repositories.length} public repositories</p>

    <div class="table-wrapper">
      <table>`;

  repositories.forEach((repository) => {
    html += `
    <tr>
      <td>${repository.name}</td>
      <td><a href="${repository.html_url}"
          target='_top'>${repository.html_url}</a>
      </td>
    </tr>`;
  });

  html += `
      </table>
    </div>
  </div>`;

  resultsWrapper.append(html);
};

const renderAlert = (message) => {
  const html = `
  <div class="alert">
    <h2>Error</h2>
    <p>${message}</p>
  </div>`;

  loader.remove();
  resultsWrapper.append(html);
};

const fetchUserAsync = async (username) => {
  try {
    const url = baseApiUrl + '/users/' + username;
    const response = await fetch(url, {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`404! GitHub user '${username}' not found.`);
      } else {
        throw new Error(`Failed to fetch! Status: ${response.status}.`);
      }
    }

    const data = await response.json();

    renderUser(data);
    fetchRepositoriesAsync(data.login);
  } catch (error) {
    renderAlert(error.message);
  }
};

const fetchRepositoriesAsync = async (username) => {
  resultsWrapper.append(loader);

  try {
    const url = baseApiUrl + '/users/' + username + '/repos';
    const response = await fetch(url, {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to fetch! Status: ${response.status}`);
    }

    renderRepositories(data);
    loader.remove();
  } catch (error) {
    renderAlert(error.message);
  }
};

$(document).ready(() => {
  const form = $('#searchForm');
  const formInput = $('#usernameInput');

  form.submit((e) => {
    e.preventDefault();
    const username = formInput.val();

    if (!username) {
      return false;
    }

    resultsWrapper.empty();
    resultsWrapper.append(loader);

    fetchUserAsync(username);
  });
});
