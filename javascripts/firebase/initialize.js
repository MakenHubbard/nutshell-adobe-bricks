const firebaseApi = require('../firebase/firebaseApi');
const {checkLoginStatus,} = require('../auth/auth');

const initialize = () => {
  firebaseApi.loadConfig().then(firebaseConfig => {
    firebaseApi.setConfig(firebaseConfig);
    firebase.initializeApp(firebaseConfig);
    checkLoginStatus();
  }).catch(err => {
    console.error('Error initializing Firebase', err);
  });
};
module.exports = {
  initialize,
};
