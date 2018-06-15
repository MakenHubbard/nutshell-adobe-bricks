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

const retrieveBoth = () => {
  return Promise.all([retrieveFriends(), retrieveUsers(),]);
};

const addRequest = (requestObject) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      data: JSON.stringify(requestObject),
      url: `${mainFB.getConfig().databaseURL}/friends.json}`,
    })
      .fail(err => reject(err))
      .done(() => resolve());
  });
};

const updateRequest = (requestId, requestObject) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'PUT',
      data: JSON.stringify(requestObject),
      url: `${mainFB.getConfig().databaseURL}/friends/${requestId}.json}`,
    })
      .fail(err => reject(err))
      .done(() => resolve());
  });
};

const deleteRequest = (requestId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'DELETE',
      url: `${mainFB.getConfig().databaseURL}/friends/${requestId}.json}`,
    })
      .fail(err => reject(err))
      .done(() => resolve());
  });
};

module.exports = {
  retrieveFriends,
  retrieveUsers,
  retrieveBoth,
  addRequest,
  updateRequest,
  deleteRequest,
};
