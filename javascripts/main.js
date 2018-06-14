const auth = require('../javascripts/auth/authEvents');
const firebaseApi = require('../javascripts/firebase/firebaseApi');
firebaseApi.initialize();
auth.authEvents();
