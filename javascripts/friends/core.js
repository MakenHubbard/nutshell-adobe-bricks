// Functionality for interacting with the friends list module
// Author: John Achor

const fbFriends = require('./fbFriends');
const friendStrings = require('./friendStrings');

let friendsStore = [];
let users = {};
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
  users = Object.values(nameData).reduce((acc, value) => {
    acc[value.userUid] = value.username;
    return acc;
  }, {});
};

// insert uid, receive display name!
const getDisplayName = (uid) => {
  return users[uid];
};

// retrieves friends and users collections from firebase and stores them with internal data structure
// then updates UI
const initializeFriendsData = () => {
  fbFriends.retrieveBoth()
    .then((bothData) => {
      updateDisplayNames(bothData[1]);
      updateFriends(bothData[0]);
      populateViews();
    })
    .catch(err => console.error(err));
};

// checks whether a friend request already exists between current user and target friend
const checkIfRequested = (friendUid) => {
  return friendsStore.find(friendReq => {
    if (friendReq.userUid === currentUid && friendReq.friendUid === friendUid) {
      return true;
    } else if (friendReq.userUid === friendUid && friendReq.friendUid === currentUid) {
      return true;
    } else {
      return false;
    }
  });
};

// returns a list of users that do not have a friend request with the current user
const getAvailableUsers = () => {
  return Object.keys(users).filter(uid => {
    return !checkIfRequested(uid) && uid !== currentUid;
  });
};

// returns the current user's incoming pending requests
const getPendingRequests = () => {
  return friendsStore.filter(friendReq => {
    return friendReq.friendUid === currentUid && friendReq.isPending;
  });
};

// returns the current user's pending outgoing requests
const getOutgoingRequests = () => {
  return friendsStore.filter(friendReq => {
    return friendReq.userUid === currentUid && friendReq.isPending;
  });
};

const populateViews = () => {
  $('#current-friends-list').html(getFriendUids().map(friendUid => {
    return friendStrings.createCurrentFriendListItem(friendUid, getDisplayName(friendUid));
  }));
  $('#available-friends-list').html(getAvailableUsers().map(friendUid => {
    return friendStrings.createAvailableFriendListItem(friendUid, getDisplayName(friendUid));
  }));
  $('#pending-friends-list').html(getPendingRequests().map(friendReq => {
    return friendStrings.createPendingFriendListItem(friendReq.userUid, getDisplayName(friendReq.userUid));
  }));
  $('#sent-friends-list').html(getOutgoingRequests().map(friendReq => {
    return friendStrings.createSentFriendListItem(friendReq.friendUid, getDisplayName(friendReq.friendUid));
  }));
  if (getPendingRequests().length) {
    $('#pending-friends-badge').text(getPendingRequests().length);
  }
};

const createFriendRequest = (fUid) => {
  const requestObject = {
    friendUid: fUid,
    userUid: currentUid,
    isAccepted: false,
    isPending: true,
  };
  fbFriends.addRequest(requestObject)
    .then(initializeFriendsData)
    .catch(err => console.error(err));
};

module.exports = {
  getFriendUids,
  setCurrentUid,
  getDisplayName,
  initializeFriendsData,
  createFriendRequest,
};
