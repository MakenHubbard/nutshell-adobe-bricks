const auth = require('../javascripts/auth/authEvents');
const firebaseInit = require('../javascripts/firebase/initialize');
const taskEvents = require('./tasks/events');
const friendEvents = require('./friends/friendEvents');

firebaseInit.initialize();
taskEvents.attachEvents();
auth.authEvents();
friendEvents.initFriendEvents();
