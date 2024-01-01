/* unfourtunately I cound not make the spinner work properly, but tried to implement.*/


const CLIENT_ID = 'b76a8a6efcdaebb91c56';     // client_id získáte po registraci OAuth účtu
const CLIENT_SECRET = '9e6b1a7cbf72b624a906c51979ba57fe4e20910a'; // client_secret získáte po registraci OAuth účtu
const baseApiUrl = 'https://api.github.com';

const ProfileContainer = $('#profile');
const RepositoriesContainer = $('#repos');
//const spinner = `<div class = "spinner"></div>`;

var form = document.getElementById("myForm")
form.addEventListener('submit', function(e){
    e.preventDefault()

    var searchValue = document.getElementById("search").value
    //ProfileContainer.append(spinner);


    
    
    const url = `${baseApiUrl}/users/${searchValue}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;



    $.getJSON(url).done((data) => {
        

        document.getElementById("profile").innerHTML=`
        <div>
        <img src="${data.avatar_url}"/>
        </div>
        <div class="table">
        <h3>Basic info about user</h3>
        <div class="cell">name: ${data.login}</div>
        <div class="cell">number of followers: ${data.followers}</div>
        <div class="cell">number of following: ${data.following}</div>
        <div class="cell">bio: ${data.bio || 'bio not found'}</div>
        <div class="cell">email: ${data.email || 'email not found'}</div>
        <div class="cell">number of public repos: ${data.public_repos}</div>
        </div>
        <h3>List of public repositories</h3>
        `
    
        fetchRepositories(searchValue);
       //spinner.remove();
       

    }).fail(() => {
        RepositoriesContainer.empty().append('<div class = "fail_message">Could not find user. </div>');
        ProfileContainer.empty().append('<div class = "fail_message">Could not find user. </div>');
            RepositoriesContainer.empty();
            //spinner.remove();

    });
});

const renderRepositories = (repositories) => {
    if (repositories.length > 0) {
        const repositoriesHtml = repositories.map(repo => `
                <div class = "repository"><a href="${repo.html_url}">${repo.name}</a></div>
        `).join(''); 
        RepositoriesContainer.empty().append(repositoriesHtml);
    } else {
        RepositoriesContainer.empty().append('<div>Could not find any repositories. </div>');
    }
};

const fetchRepositories = (searchValue) => {
    const reposUrl = `${baseApiUrl}/users/${searchValue}/repos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

    $.getJSON(reposUrl).done((repositories) => {
        
        renderRepositories(repositories);
        
    }).fail(() => {
        RepositoriesContainer.empty().append('<div>Could not fetch repositories. </div>');
    });
};










