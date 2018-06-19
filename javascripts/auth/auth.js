const authEvents = require('./authEvents');
const tasks = require('../tasks/taskUID');
const friends = require('../friends/core');
const events = require('../events/eventsUid');

let uid = '';

const getUID = () => {
  return uid;
};
const setUID = (newUID) => {
  uid = newUID;
  tasks.setTaskUID(newUID);
  friends.setCurrentUid(newUID);
  events.setUid(newUID);
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
