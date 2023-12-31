const App = {
    CLIENT_ID: 'c74a941e10218101af27',
    CLIENT_SECRET: '9958f7f72f8fa5a854189086b710f29388fb7602',
    jUserProfile: $('#user-profile'),
    jSearchInput: $('#username'),
    jSearchSubmit: $('#submit'),
    jRepositories: $('#repositories'),
  };
  
  App.renderUser = (user) => {
    const {
      avatar_url,
      login,
      company,
      location,
      bio,
      email,
      followers,
      created_at,
    } = user;
    const html = `
      <div id="user-profile-generated"> 
        <img class="profile-img" src="${avatar_url}"><br>
        <h3 class="profile-login">${login}</h3><br>
        <p>Company: </p><p class="profile-bio">${company}</p><br>
        <p>Location: </p><p class="profile-location">${location}</p><br>
        <p>Description: </p><p class="profile-description">${bio}</p><br>
        <p>Email: </p><p class="profile-email">${email}</p><br>
        <p>Followers: </p><p class="profile-followers">${followers}</p><br>
        <p>Registered: </p><p class="profile-registered">${created_at}</p><br>
      </div>
    `;
    App.jUserProfile.html(html);
  };
  
  App.fetchRepositories = async (user) => {
    App.jRepositories.empty();
    const url = `https://api.github.com/users/${user.login}/repos`;
    try {
      const repositories = await $.ajax({
        url,
        data: {
          client_id: App.CLIENT_ID,
          client_secret: App.CLIENT_SECRET,
        },
      });
      let html = `<h3>Repositories</h3>`;
      repositories.forEach((repository) => {
        html += `
          <div id="repositories-generated">
            <div class="repo-name">${repository.name}</div>
            <div class="repo-url">${repository.html_url}</div>
          </div>
        `;
      });
      App.jRepositories.empty().append(html);
    } catch (error) {
      console.error(error);
      App.jRepositories.html('<p>Error fetching repositories</p>');
    }
  };
  
  App.init = function () {
    App.jSearchSubmit.on('click', function (event) {
      event.preventDefault();
      const searchValue = App.jSearchInput.val();
      if (!searchValue) {
        return false;
      }
      const url = `https://api.github.com/users/${searchValue}`;
      $.ajax({
        url,
        data: {
          client_id: App.CLIENT_ID,
          client_secret: App.CLIENT_SECRET,
        },
      })
        .done(function (user) {
          App.renderUser(user);
          App.fetchRepositories(user);
        })
        .fail(function () {
          App.jUserProfile.html('<p>User not found</p>');
          App.jRepositories.empty();
        });
    });
  };
  
  $(document).ready(function () {
    App.init();
  });
  