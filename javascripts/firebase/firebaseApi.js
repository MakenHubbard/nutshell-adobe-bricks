// Initialize Firebase and set and get config
// Michael Clark
const {checkLoginStatus,} = require('../auth/auth');

let config = {};

const getConfig = () => {
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
const initialize = () => {
  loadConfig().then(firebaseConfig => {
    setConfig(firebaseConfig);
    firebase.initializeApp(firebaseConfig);
    checkLoginStatus();
  }).catch(err => {
    console.error('Error initializing Firebase', err);
  });
};
module.exports = {
  getConfig,
  initialize,
};
