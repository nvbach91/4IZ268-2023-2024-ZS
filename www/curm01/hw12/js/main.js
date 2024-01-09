const CLIENT_ID = '527d34ac1ee74e9b148f';
const CLIENT_SECRET = '7f078174bcd2ab48292fb81820f0aeab397dc501';
const profiles = $('#profile');
const repositories = $('#repos');
const baseApiUrl = 'https://api.github.com';

var form = document.getElementById("Form")
form.addEventListener('submit', function(e){
    e.preventDefault()

    var searchValue = document.getElementById("search").value      

    const url = `${baseApiUrl}/users/${searchValue}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

    $.getJSON(url).done((data) => {
        

        document.getElementById("profile").innerHTML=`
        <div>
        <center><img src="${data.avatar_url}"/></center>
        </div>
        <div class="userInfo">
          <h2>User info</h2>
          <div class="userName">${data.name || '&nbsp'}</div>
          <div class="userInfo-card">
            <div class="info"><strong>Name:</strong> ${data.login}</div>
            <div class="info"><strong>Company:</strong> ${data.company || '&nbsp'}</div>
            <div class="info"><strong>Location:</strong> ${data.location || '&nbsp'}</div>
            <div class="info"><strong>Bio:</strong> ${data.bio || '&nbsp'}</div>
            <div class="info"><strong>Email:</strong> ${data.email || '&nbsp'}</div>
            <div class="info"><strong>Followers:</strong> ${data.followers}</div>
            <div class="info"><strong>Registred:</strong> ${data.created_at}</div>
            <div class="info"><a href="${data.html_url}">View profile</div></a>
          </div>
        </div>
        <div class="userRepo">
        <h2>Repositories</h2>
        </div>
        `
    
        fetchRepositories(searchValue);      

    }).fail(() => {
        repositories.empty().append('<div class="failMessage">User do not exist. </div>');
        profiles.empty().append('<div class="failMessage">User do not exist. </div>');
        repositories.empty();
    });
});

const findRepositories = (repositories) => {
    if (repositories.length > 0) {
        const repositoriesHtml = repositories.map(repo => `
                <div class="repository"><a href="${repo.html_url}">${repo.name}</a></div>
        `).join(''); 
        repositories.empty().append(repositoriesHtml);
    } else {
      repositories.empty().append('<div>User have 0 repositories. </div>');
    }
};

const fetchRepositories = (searchValue) => {
  const reposUrl = `${baseApiUrl}/users/${searchValue}/repos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

  $.getJSON(reposUrl).done((repositories) => {
      
      findRepositories(repositories);
      
  }).fail(() => {
    repositories.empty().append('<div>Could not fetch repositories. </div>');
  });
};

