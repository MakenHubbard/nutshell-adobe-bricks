const logOut = (e) => {
  e.preventDefault();
  firebase.auth().signOut()
    .then((results) => {
      if (results === null) {
        viewSplashPage();
      }
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
  $('signin-form').addClass('hide');
  $('register-form').addClass('hide');
  $('splash').removeClass('hide');
};
const authEvents = () => {
  $('#jumbo-signin, #signin-link').click(viewSignin);
  $('#jumbo-register, #register-link').click(viewRegister);
  $('#nav-bar-area, #logOutButt').click(logOut);
};
module.exports = {
  authEvents,
};
