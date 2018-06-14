const authEvents = require('./authEvents');

let uid = '';

const getUID = () => {
  return uid;
};
const setUID = (newUID) => {
  uid = newUID;
};

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // user is signed in
      setUID(user.uid);
      authEvents.dashBoardView();

    } else {
      // user is logged out
      authEvents.viewSplashPage();
    }
  });
};
module.exports = {
  checkLoginStatus,
  getUID,
};
