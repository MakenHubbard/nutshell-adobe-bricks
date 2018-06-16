const auth = require('../javascripts/auth/authEvents');
const firebaseInit = require('../javascripts/firebase/initialize');
const friendEvents = require('./friends/friendEvents');
const eventsEvents = require('./events/eventsEvent');

firebaseInit.initialize();
auth.authEvents();
friendEvents.initFriendEvents();
eventsEvents.bindEventsData();
