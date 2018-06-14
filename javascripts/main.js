const auth = require('../javascripts/auth/authEvents');
const firebaseInit = require('../javascripts/firebase/initialize');
firebaseInit.initialize();
auth.authEvents();
