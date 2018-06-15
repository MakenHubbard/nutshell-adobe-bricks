// Andy Million
// eventsData will retrieve a list of eventsData
// and display them. The users will be able to interact
// with the events (CRUD).

const eventsDataGateKP = require ('./eventsDatagatekeeper');

// this is called from ../auth/authEvents
const requestEventsFromFirebase = () => {
  eventsDataGateKP.callFirebase();
};

module.exports = {
  requestEventsFromFirebase,
};
