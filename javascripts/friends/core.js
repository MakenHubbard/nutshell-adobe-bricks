// Functionality for interacting with the friends list module
// Author: John Achor

const fbFriends = require('./fbFriends');

let friendsStore = [];
let currentUid = '';

const setCurrentUid = (uid) => {
  currentUid = uid;
};

// Refreshes the friendsStore object with the most current Firebase data
const updateFriends = () => {
  fbFriends.retrieveFriends()
    .then(friendsData => {
      friendsStore = Object.entries(friendsData).reduce((acc, kvp) => {
        kvp[1].reqId = kvp[0];
        acc.push(kvp[1]);
        return acc;
      }, []);
      console.log(friendsStore);
      console.log(getFriendUids());
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

module.exports = {
  updateFriends,
  getFriendUids,
  setCurrentUid,
};
