const App = {};
const config = { app_id: '7702675183075984' };

// only works after app review z facebook reviewers for post permission
App.postStatus = (msg) => {
  FB.api('/me/feed', 'post', { message: msg }, function (response) {
    if (!response || response.error) {
      console.log('Error occured');
    } else {
      console.log('Post ID: ' + response.id);
    }
  });
};

App.renderPage = () => {
  // fetching data about the current user
  FB.api('/me?fields=name,email', (resp) => {
    $('#heading').text(`Hello ${resp.name}! ${resp.email}`);
    // go to graph API documentation to download more data about this account
  });
};

App.checkLoginState = () => {
  FB.getLoginStatus((resp) => {
    console.log(resp);
    if (resp.status === 'connected') {
      App.jFbLoginBtn.hide();
      App.renderPage();
    }
  });
};

App.fbInit = () => {
  $.getScript('https://connect.facebook.net/en_US/sdk.js', function () {
    FB.init({
      appId: config.app_id,
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v9.0',
    });
    App.checkLoginState();
  });
};

App.init = () => {
  App.jFbLoginBtn = $('#fb-login');
};

$(document).ready(() => {
  App.fbInit();
  App.init();
});