const authEvents = require('./authEvents');
const tasks = require('../tasks/taskUID');
const friends = require('../friends/core');
const messages = require('../messages/holdUID');
const events = require('../events/eventsUid');
const news = require('../newsArtitcles/newsFire');

let uid = '';

const getUID = () => {
  return uid;
};
const setUID = (newUID) => {
  uid = newUID;
  tasks.setTaskUID(newUID);
  friends.setCurrentUid(newUID);
  messages.setMessageUID(newUID);
  events.setUid(newUID);
  news.setNewsUID(newUID);
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
