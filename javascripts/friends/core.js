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

// UID goes in, display name goes out.  You can't explain that
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
      $('#friend-search').val('');
    })
    .catch(err => console.error(err));
};

// checks whether a friend request already exists between current user and target friend
// this is used to prevent users with existing requests from showing up in the finder
const checkIfRequested = (friendUid) => {
  return friendsStore.find(friendReq => {
    return ((friendReq.userUid === currentUid && friendReq.friendUid === friendUid) || (friendReq.userUid === friendUid && friendReq.friendUid === currentUid));
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

// returns the users whose friend requests the current user has rejected
const getRejectedRequests = () => {
  return friendsStore.filter(friendReq => {
    return friendReq.friendUid === currentUid && !friendReq.isPending && !friendReq.isAccepted;
  });
};

// updates the UI with our stored info
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

  $('#rejected-friends-list').html(getRejectedRequests().map(friendReq => {
    return friendStrings.createRejectedFriendListItem(friendReq.userUid, getDisplayName(friendReq.userUid));
  }));

  $('#pending-friends-badge').text(getPendingRequests().length ? getPendingRequests().length : '');
};

const createFriendRequest = (fUid) => {

  // builds pending friend request object
  const requestObject = {
    friendUid: fUid,
    userUid: currentUid,
    isAccepted: false,
    isPending: true,
  };

  // ... and sends it to Firebase
  fbFriends.addRequest(requestObject)
    .then(initializeFriendsData)
    .catch(err => {
      console.error(err);
      initializeFriendsData();
    });
};

const cancelSentRequest = (fUid) => {

  // searches the friends storage for the pending request to remove
  const requestToDelete = friendsStore.find(req => {
    return req.userUid === currentUid && req.friendUid === fUid && req.isPending;
  });

  // then sends a firebase call to delete that request
  fbFriends.deleteRequest(requestToDelete.reqId)
    .then(initializeFriendsData)
    .catch(err => {
      console.error(err);
      initializeFriendsData();
    });
};

const deleteFriend = (fUid) => {

  // req1 is the current user's request to the friend
  const req1 = friendsStore.find(req => {
    return req.userUid === currentUid && req.friendUid === fUid && req.isAccepted;
  });

  // req2 is the friend's request to the current user
  const req2 = friendsStore.find(req => {
    return req.friendUid === currentUid && req.userUid === fUid && req.isAccepted;
  });

  // if both exist, delete them both
  if (req1 && req2) {
    Promise.all([fbFriends.deleteRequest(req1.reqId), fbFriends.deleteRequest(req2.reqId),])
      .then(initializeFriendsData)
      .catch(err => {
        console.error(err);
        initializeFriendsData();
      });
  } else {

    // otherwise just delete our own
    fbFriends.deleteRequest(req1.reqId)
      .then(initializeFriendsData)
      .catch(err => {
        console.error(err);
        initializeFriendsData();
      });
  }
};

const acceptFriend = (fUid) => {

  // finds the incoming friend request that matches the user we are accepting
  const reqToAccept = friendsStore.find(req => {
    return req.friendUid === currentUid && req.userUid === fUid && req.isPending;
  });

  // builds the updated accepted request to replace the pending one
  const acceptedReq = {
    userUid: reqToAccept.userUid,
    friendUid: reqToAccept.friendUid,
    isAccepted: true,
    isPending: false,
  };

  // creates an accepted request in the other direction to match
  const symmetryReq = {
    userUid: reqToAccept.friendUid,
    friendUid: reqToAccept.userUid,
    isAccepted: true,
    isPending: false,
  };

  // checks to see whether we already have an outgoing request to the person we are accepting
  // if so we will update it, if not we will create it
  const hasOutgoingRequest = friendsStore.find(req => {
    return req.userUid === currentUid && req.friendUid === fUid;
  });

  // sends both requests to Firebase
  Promise.all([fbFriends.updateRequest(reqToAccept.reqId, acceptedReq), hasOutgoingRequest ? fbFriends.updateRequest(hasOutgoingRequest.reqId, symmetryReq) : fbFriends.addRequest(symmetryReq),])
    .then(initializeFriendsData)
    .catch(err => {
      console.error(err);
      initializeFriendsData();
    });
};

const rejectFriend = (fUid) => {

  // finds the incoming friend request that matches the user we are rejecting
  const reqToReject = friendsStore.find(req => {
    return req.friendUid === currentUid && req.userUid === fUid && req.isPending;
  });

  // builds the updated rejected request to replace the pending one
  const rejectedReq = {
    userUid: reqToReject.userUid,
    friendUid: reqToReject.friendUid,
    isAccepted: false,
    isPending: false,
  };

  // sends the request to Firebase
  fbFriends.updateRequest(reqToReject.reqId, rejectedReq)
    .then(initializeFriendsData)
    .catch(err => {
      console.error(err);
      initializeFriendsData();
    });
};

const clearRejection = (fUid) => {

  // finds the rejected friend request from that user
  const reqToClear = friendsStore.find(req => {
    return req.friendUid === currentUid && req.userUid === fUid && !req.isAccepted && !req.isPending;
  });

  // and deletes it
  fbFriends.deleteRequest(reqToClear.reqId)
    .then(initializeFriendsData)
    .catch(err => {
      console.error(err);
      initializeFriendsData();
    });
};

module.exports = {
  getFriendUids,
  setCurrentUid,
  getDisplayName,
  initializeFriendsData,
  createFriendRequest,
  cancelSentRequest,
  deleteFriend,
  acceptFriend,
  rejectFriend,
  clearRejection,
};
