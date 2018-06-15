// Initialize Firebase and set and get config
// Michael Clark

let config = {};

const getConfig = () => {
  console.log('this is the config', config);
  return config;
};
const setConfig = (newConfig) => {
  config = newConfig;
};
const loadConfig = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'GET',
      url: `/db/apiKeys.json`,
    }).done(results => {
      resolve(results.firebaseConfig);
    }).fail(err => {
      reject(err);
    });
  });
};

const getAllUsernames = () => {
  return new Promise((resolve, reject) => {
    const usernamesArray = [];
    $.ajax({
      method: 'GET',
      url: `${config.databaseURL}/users.json`,
    })
      .done(fbResponseUsernames => {
        if (fbResponseUsernames !== null) {
          Object.keys(fbResponseUsernames).forEach(fbKey => {
            fbResponseUsernames[fbKey].id = fbKey;
            usernamesArray.push(fbResponseUsernames[fbKey]);
          });
        }
        resolve(usernamesArray);
      })
      .fail(error => {
        reject(error);
      });
  });
};

const addNewUsername = userToAdd => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: `${config.databaseURL}/users.json`,
      data: JSON.stringify(userToAdd),
    })
      .done(uniqueKey => {
        resolve(uniqueKey);
      })
      .fail(error => {
        reject(error);
      });
  });
};

module.exports = {
  getConfig,
  setConfig,
  loadConfig,
  getAllUsernames,
  addNewUsername,
};
