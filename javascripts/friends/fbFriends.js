const mainFB = require('../firebase/firebaseApi');

const retrieveFriends = () => {
  return new Promise((resolve, reject) => {
    $.ajax(`${mainFB.getConfig().databaseURL}/friends.json`)
      .done(friendsData => resolve(friendsData))
      .fail(err => reject(err));
  });
};

const retrieveUsers = () => {
  return new Promise((resolve, reject) => {
    $.ajax(`${mainFB.getConfig().databaseURL}/users.json`)
      .done(usersData => resolve(usersData))
      .fail(err => reject(err));
  });
};

module.exports = {
  retrieveFriends,
  retrieveUsers,
};
