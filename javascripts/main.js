const auth = require('../javascripts/auth/authEvents');
const firebaseInit = require('../javascripts/firebase/initialize');
const taskEvents = require('./tasks/events');
taskEvents.attachEvents();
firebaseInit.initialize();
auth.authEvents();
