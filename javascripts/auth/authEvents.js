const firebaseApi = require('../firebase/firebaseApi');
const eventsData = require('../events/eventsData');

let inputUsername = '';
let inputEmail = '';
let inputPass = '';
let userToAddToCollection = '';

const logOut = (e) => {
  e.preventDefault();
  firebase.auth().signOut()
    .then((results) => {
      viewSplashPage();
    }).catch(function (error) {
      console.error('error in log out', error);
    });
};

const addUserToUsersCollection = () => {
  firebaseApi.addNewUsername(userToAddToCollection);
};

const registerUniqueUser = booleanResult => {
  if (booleanResult === true) {
    firebase.auth().createUserWithEmailAndPassword(inputEmail, inputPass)
      .then(user => {
        userToAddToCollection = {
          userUid: user.user.uid,
          username: inputUsername,
        };
        dashBoardView();
      })
      .then(() => {
        addUserToUsersCollection();
      })
      .catch(error => {
        console.error(error.message);
      });
  } else {
    alert('Username is already taken, please choose another.');
  }
};

const checkNewUserIsUnique = () => {
  let booleanResult = true; // true means a unique username
  firebaseApi.getAllUsernames()
    .then(usernameArray => {
      for (let i = 0; i < usernameArray.length; i++) {
        if (usernameArray[i].username === inputUsername) {
          booleanResult = false;
        }
      }
      return booleanResult;
    })
    .then(booleanResult => {
      registerUniqueUser(booleanResult);
    })
    .catch(error => {
      console.error(error);
    });
};

const registerButtonClicked = () => {
  $('#register-btn').click(e => {
    e.preventDefault();
    inputUsername = $('#register-username').val();
    inputEmail = $('#register-email').val();
    inputPass = $('#register-pass').val();
    checkNewUserIsUnique();
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
  registerButtonClicked();
  eventsData.requestEventsFromFirebase();
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

module.exports = {
  authEvents,
  dashBoardView,
  viewSplashPage,
};
