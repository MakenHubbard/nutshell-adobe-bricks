// Andy Million
// eventsData will retrieve a list of eventsData
// and display them. The users will be able to interact
// with the events (CRUD).

const eventsDataGateKP = require ('./eventsDatagatekeeper');

// this is called from ../auth/authEvents
const firebaseGET = () => {
  eventsDataGateKP.requestEventGET();
};
const firebasePOST = () => {
  eventsDataGateKP.requestEventPOST();
};
const firebaseDELETE = () => {
  eventsDataGateKP.requestEventDELETE();
};
const firebasePUT = () => {
  eventsDataGateKP.requestEventPUT();
};

module.exports = {
  firebaseGET,
  firebasePOST,
  firebaseDELETE,
  firebasePUT,
};
