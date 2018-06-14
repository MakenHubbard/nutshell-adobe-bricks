// Initialize Firebase and set and get config
// Michael Clark

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

module.exports = {
  getConfig,
  setConfig,
  loadConfig,
};
