const friends = require('../friends/core');

const logOut = (e) => {
  e.preventDefault();
  firebase.auth().signOut()
    .then((results) => {
      viewSplashPage();
    }).catch(function (error) {
      console.error('error in log out', error);
    });
};

const viewRegister = () => {
  $('#register-form').removeClass('hide');
  $('#signin-form').addClass('hide');
  $('#splash').addClass('hide');
};
const viewSignin = () => {
  $('#signin-form').removeClass('hide');
  $('#register-form').addClass('hide');
  $('#splash').addClass('hide');
};

const viewSplashPage = () => {
  $('#main-view').addClass('hide');
  $('#authentication').removeClass('hide');
  $('#signin-form').addClass('hide');
  $('#register-form').addClass('hide');
  $('#splash').removeClass('hide');
};
const authEvents = () => {
  $('#jumbo-signin, #signin-link').click(viewSignin);
  $('#jumbo-register, #register-link').click(viewRegister);
  $('#logOutButt').click(logOut);
  logInNutShell();
};

const logInNutShell = () => {
  $('#signin-btn').click((e) => {
    e.preventDefault();
    const email = $('#signin-email').val();
    const pass = $('#signin-pass').val();
    firebase.auth().signInWithEmailAndPassword(email, pass)
      .then((user) => {
        dashBoardView();
      })
      .catch((error) => {
        console.error(error.message);
      });
  });
};

const dashBoardView = () => {
  $('#main-view').removeClass('hide');
  $('#authentication').addClass('hide');
  console.log(friends.updateFriends());
};

module.exports = {
  authEvents,
  dashBoardView,
  viewSplashPage,
};
