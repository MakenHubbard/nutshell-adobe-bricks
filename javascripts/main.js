const auth = require('../javascripts/auth/authEvents');
const firebaseInit = require('../javascripts/firebase/initialize');
const friendEvents = require('./friends/friendEvents');

firebaseInit.initialize();
auth.authEvents();
friendEvents.initFriendEvents();
