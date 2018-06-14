// Functionality for interacting with the friends list module
// Author: John Achor

const fbFriends = require('./fbFriends');

let friendsStore = [];

const updateFriends = () => {
  fbFriends.retrieveFriends()
    .then(friendsData => {
      friendsStore = Object.values(friendsData);
      console.log(friendsStore);
    })
    .catch(err => console.error(err));
};

module.exports = {
  updateFriends,
};
