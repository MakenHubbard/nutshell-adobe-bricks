// Functionality for interacting with the friends list module
// Author: John Achor
const firebaseApi = require('../firebase/firebaseApi');
const fbFriends = require('./fbFriends');

let friendsStore = [];
let displayNames = [];
let currentUid = '';

const setCurrentUid = (uid) => {
  currentUid = uid;
};

// Refreshes the friendsStore object with the most current Firebase data
const updateFriends = (friendsData) => {
  friendsStore = Object.entries(friendsData)
    // adds the firebase ID of each request onto the object and returns an array of all the request objects
    .reduce((acc, kvp) => {
      kvp[1].reqId = kvp[0];
      acc.push(kvp[1]);
      return acc;
    }, []);
};

// Returns an array of strings representing the UIDs of the active user's accepted friends
const getFriendUids = () => {
  return friendsStore.reduce((acc, req) => {
    if (req.userUid === currentUid && req.isAccepted) {
      acc.push(req.friendUid);
    }
    return acc;
  }, []);
};

// gets all users from Firebase and stores an object with uid:username KV pairs
const updateDisplayNames = (nameData) => {
  displayNames = Object.values(nameData).reduce((acc, value) => {
    acc[value.userUid] = value.username;
    return acc;
  }, {});
};

const getDisplayNames = () => {
  return displayNames;
};

const initializeFriends = () => {
  Promise.all([fbFriends.retrieveFriends(), firebaseApi.getAllUsernames(),])
    .then((bothData) => {
      updateDisplayNames(bothData[1]);
      updateFriends(bothData[0]);
    })
    .catch(err => console.error(err));
};

module.exports = {
  getFriendUids,
  setCurrentUid,
  getDisplayNames,
  initializeFriends,
};
