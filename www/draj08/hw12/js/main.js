var App = {
    clientID: 'f0065740d41a9164f3e0',
    clientSecret: '9122d47ab68bb3611eae271f76311db7716f7590',
    url: 'https://api.github.com',

    loadingSpinner: $(`
    <div class="flex-row">
    <div class="spinner"> </div>
    </div>`),


    showLoading: () => {
        $(".container").append(App.loadingSpinner);
    },


    hideLoading: () => {
        App.loadingSpinner.remove()
    },

    getUser: (username) => {
        App.showLoading();
        $.getJSON({
            url: `${App.url}/users/${username}?client_id=${App.clientID}&client_secret=${App.clientSecret}`,
        }).done((user) => {
            App.renderUser(user);
        }).fail(() => {
            App.renderError(username);
            App.hideLoading();
        });
    },

    getUserRepositories: (username) => {
        $.getJSON({
            url: `${App.url}/users/${username}/repos?client_id=${App.clientID}&client_secret=${App.clientSecret}`,
        }).done((repos) => {
            App.renderUserRepos(repos);
        }).fail(() => {
            App.renderError(username);
            App.hideLoading();
        });
    },

    createUserInfoElements: (user) => {
        const infoKeys = ["login", "email", "followers", "created_at", "bio", "location", "description", "html_url"]
        const userContainer = $(".user");

        const userImageElement = $(`
            <div class="flex-row-column50 user-image">
                <img src="${user.avatar_url}" alt="Profile image of ${user.login}">
            </div>`);
        const userInfoElement = $(`<div class="flex-row-column50"></div>`);

        infoKeys.forEach((key) => {

            const userInfoElementRow = $(`
            <div class="flex-row user-info">
                <span class="flex-row-column15">
                    ${key === "created_at" ? "Registered" :
                    (key === "html_url" ? "Link" :
                        (key.substring(0, 1).toUpperCase() + key.substring(1)))}:
                </span>
                <span class="flex-row-column85 ">
                    ${key === "created_at" ? new Date(user[key]).toLocaleDateString('cs-CZ') :
                    (key === "html_url" ? `<a href="${user[key]}"> GitHub Profile </a>` :
                        (user[key] ? user[key] : 'No ' + key + ' availible.'))} 
                </span>
            </div>`);
            userInfoElement.append(userInfoElementRow);
        });

        userContainer.append(userImageElement);
        userContainer.append(userInfoElement);
    },

    createUserReposElement: (repos) => {
        const repoContainer = $(".repos");
        if (repos.length > 0) {
            repos.forEach((repo) => {
                const repoElementRow = $(`
                <div class="flex-row repo">
                    <a href="${repo.html_url}"> ${repo.name} </a>
                </div>`);
                repoContainer.append(repoElementRow);
            });
        }
        else {
            repoContainer.append(`<p> No repos availible! </p>`);
        }
    },

    renderUser: (user) => {
        $(".user-container h2").removeClass("hidden")
        $(".user-container").removeClass("hidden");
        $(".user").empty();
        App.createUserInfoElements(user);
    },

    renderUserRepos: (repos) => {
        $(".repos-container").removeClass("hidden");
        $(".repos").empty();
        App.hideLoading();
        App.createUserReposElement(repos);
    },

    renderError: (...username) => {
        $(".user-container").removeClass("hidden");
        $(".user-container h2").addClass("hidden");
        $(".repos-container").addClass("hidden");

        if (username.length < 1) {
            const additionalInfo = $(`<div class="flex-row"><p> Please enter an username! </p></div>`);
            $(".user").empty().append(additionalInfo);
            $(".repos").empty();
        }
        else {
            const info = $(`<p>User <strong> ${username} </strong> has not been found!</p>`);
            $(".user").empty().append(info);
            $(".repos").empty();
        }
    },

    buttonClick: () => {
        const username = $('.name-form').val().trim();
        if (username.length === 0) {
            App.renderError();
        }
        else {
            $(".user-container").addClass("hidden");
            $(".repos-container").addClass("hidden");
            App.getUser(username);
            App.getUserRepositories(username);

        }
    },

    init: () => {
        $('.submit-btn').on('click', App.buttonClick);
        $('.name-form').on("keypress", function (event) {
            if (event.key === "Enter") {
                App.buttonClick();
            }
        });
    }

};

App.init();