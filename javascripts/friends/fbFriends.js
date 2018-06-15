const mainFB = require('../firebase/firebaseApi');

const retrieveFriends = () => {
  return new Promise((resolve, reject) => {
    $.ajax(`${mainFB.getConfig().databaseURL}/friends.json`)
      .done(friendsData => resolve(friendsData))
      .fail(err => reject(err));
  });
};

module.exports = {
  retrieveFriends,
};
