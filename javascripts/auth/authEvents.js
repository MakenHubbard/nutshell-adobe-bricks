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
};

const authEvents = () => {
  $('#jumbo-signin, #signin-link').click(viewSignin);
  $('#jumbo-register, #register-link').click(viewRegister);
  logInNutShell();
};

module.exports = {
  authEvents,
};
