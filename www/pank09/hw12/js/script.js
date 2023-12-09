const CLIENT_ID = 'cba42855be2a2bcbdbde';
const CLIENT_SECRET = '';
const baseApiUrl = 'https://api.github.com';

const containers = {
    errorList:      document.querySelector('.error-list'),
    avatar:         document.querySelector('.avatar'),
    username:       document.querySelector('.username'),
    bio:            document.querySelector('.bio'),
    location:       document.querySelector('.location'),
    description:    document.querySelector('.description'),
    email:          document.querySelector('.email'),
    followers:      document.querySelector('.followers'),
    registered:     document.querySelector('.registered'),
    repositoryList: document.querySelector('.repository-list')
};

const createSpinnerElement = () => {
    const spinnerElement = document.createElement("div");
    spinnerElement.classList.add('spinner-border', 'spinner-border-sm', 'ms-2');
    spinnerElement.innerHTML = '<span class="visually-hidden">Loading...</span>';
    return spinnerElement;
}

const spinnerElement = createSpinnerElement();

const renderUser = (user) => {
    containers.avatar.src = user.avatar_url ?? '-';
    containers.username.innerText = user.login ?? '-';
    containers.bio.innerText = user.bio ?? '-';
    containers.location.innerText = user.location ?? '-';
    containers.description.innerText = user.description ?? '-';
    containers.email.innerText = user.email ?? '-';
    containers.followers.innerText = user.followers ?? '-';
    containers.registered.innerText = new Date(user.created_at).toLocaleDateString('cs-CZ') ?? '-';
};

const resetUser = (user) => {
    containers.avatar.src = 'https://www.pirelli.com/global/es-es/assets/images/placeholder-avatar.png';
    containers.username.innerText = '-';
    containers.bio.innerText = '-';
    containers.location.innerText = '-';
    containers.description.innerText = '-';
    containers.email.innerText = '-';
    containers.followers.innerText = '-';
    containers.registered.innerText = '-';
    containers.repositoryList.innerHTML = '';
};

const fetchUser = (username) => {
    document.forms.fetchUser.querySelector('button').append(spinnerElement);

    const usersUrl = `${baseApiUrl}/users/${username}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

    fetch(usersUrl)
        .then(response => {
            console.log(response);
            if (!response.ok) {
                resetUser();
                switch(response.status) {
                    case 404:
                        throw new Error("User not found.", { cause: response });
                        break;
                    default:
                        throw new Error("Error occured, please try again.", { cause: response });
                        break;
                }
            }
            return response.json();
        })
        .then(data => {
            renderUser(data);
            fetchRepositories(username);
        }).catch((error) => {
            createErrorNotification(error.message);
        }).finally(() => {
            spinnerElement.remove();
        });
};

document.forms.fetchUser.addEventListener('submit', e => {
    e.preventDefault();
    const username = document.forms.fetchUser.querySelector('input#username');

    if (username && username.value.trim().length > 0)
        fetchUser(username.value);
});

const fetchRepositories = (username) => {
    const usersUrl = `${baseApiUrl}/users/${username}/repos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

    fetch(usersUrl)
        .then(response => {
            if (!response.ok) {
                resetUser();
                switch(response.status) {
                    case 404:
                        throw new Error("Repos not found.", { cause: response });
                        break;
                    default:
                        throw new Error("Error occured, please try again.", { cause: response });
                        break;
                }
            }
            return response.json();
        })
        .then(data => {
            renderRepositories(data);
        }).catch((error) => {
            createErrorNotification(error.message);
        });
};

const renderRepositories = (repos) => {
    containers.repositoryList.innerHTML = '<h6 class="text-muted mb-2">Repositories</h6>';

    const repositoryElements = document.createElement('ul');

    if (repos.length === 0)
        repos.push({html_url: null, name: 'No repos'});

    repos.forEach(repo => {
        const repositoryElement = document.createElement('li');
        repositoryElement.classList.add();
        repositoryElement.innerHTML = repo.html_url ? `<a href="${repo.html_url}" target="_blank">${repo.name}</a>` : repo.name;
        repositoryElements.append(repositoryElement);
    });

    containers.repositoryList.append(repositoryElements);
}

const createErrorNotification = (msg) => {
    const error = document.createElement('div');
    error.classList.add('alert', 'alert-danger');
    error.textContent = msg;
    containers.errorList.append(error);

    setTimeout(() => {
        error.remove();
    }, 3000);
}
