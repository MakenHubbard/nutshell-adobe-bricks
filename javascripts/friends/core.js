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
const updateFriends = () => {
  fbFriends.retrieveFriends()
    .then(friendsData => {
      friendsStore = Object.entries(friendsData)
        // adds the firebase ID of each request onto the object and returns an array of all the request objects
        .reduce((acc, kvp) => {
          kvp[1].reqId = kvp[0];
          acc.push(kvp[1]);
          return acc;
        }, []);
    })
    .catch(err => console.error(err));
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

const updateDisplayNames = () => {
  firebaseApi.getAllUsernames()
    .then(nameData => {
      console.log(nameData);
      displayNames = Object.values(nameData).reduce((acc, value) => {
        acc[value.userUid] = value.username;
        return acc;
      }, {});
      console.log(displayNames);
    })
    .catch(err => console.error(err));
};

const getDisplayNames = () => {
  return displayNames;
};

module.exports = {
  updateFriends,
  getFriendUids,
  setCurrentUid,
  updateDisplayNames,
  getDisplayNames,
};
