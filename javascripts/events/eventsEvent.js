// Andy Million
// Handles user events
const eventsDataGateKP = require ('./eventsDatagatekeeper');
const eventsDom = require('./eventsDom');

const bindEventsData = () => {
  $('#events-view').on('click', '.CLASSNAME-HERE', e => {
    eventsDataGateKP.requestEventGET();
  });
  $('#events-view').on('click', '.CLASSNAME-HERE', e => {
    eventsDom.buildEventInputForm();
    eventsDataGateKP.requestEventPOST();
    // requires input
  });
  $('#events-view').on('click', '.CLASSNAME-HERE', e => {
    eventsDataGateKP.requestEventDELETE();
    // requires input
  });
  $('#events-view').on('click', '.CLASSNAME-HERE', e => {
    eventsDataGateKP.requestEventPUT();
    // requires input
  });
};

module.exports = {
  bindEventsData,
};
