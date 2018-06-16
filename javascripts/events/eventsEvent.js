// Andy Million
// Handles user events
const eventsDataGateKP = require ('./eventsDatagatekeeper');
const eventsDom = require('./eventsDom');

const bindEventsData = () => {
  $('#events-view').on('click', '.CLASSNAME-HERE', e => {
    $('#events-view-nav').removeClass('hide');
    eventsDataGateKP.requestEventGET();
  });
  $('#events-view').on('click', '#events-add-new', e => {
    $('#events-view-nav').addClass('hide');
    eventsDom.buildEventInputForm();

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
  $('#events-view').on('click', '#event-btn-add-new', e => {
    const eventToAdd = {
      'event': `${$('#eventName').val()}`,
      'location': `${$('#eventLocation').val()}`,
      'startDate': `${$('#eventDate').val()}`,
      'userUid': ``,
    };
    eventsDataGateKP.requestEventPOST(eventToAdd);
  });

};

module.exports = {
  bindEventsData,
};
