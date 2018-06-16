// Andy Million
// Handles user events
const eventsDataGateKP = require ('./eventsDatagatekeeper');
const eventsDom = require('./eventsDom');

const bindEventsData = () => {
  $('#events-view').on('click', '#events-view-all', e => {
    $('#events-view-nav').removeClass('hide');
    $('#events-view-data').addClass('hide');
    eventsDataGateKP.requestEventGET();
  });
  $('#events-view').on('click', '#events-add-new', e => {
    $('#events-header-view').addClass('hide');
    eventsDom.buildEventInputForm();

    // requires input
  });
  $('#events-view').on('click', '.CLASSNAME-HERE', e => {
    eventsDataGateKP.requestEventDELETE();
    // requires input
  });
  $('#events-view').on('click', '.glyphicon-pencil', e => {
    $('#events-view-nav').addClass('hide');
    const objectToBeUpdated = {
      'event': `${$(e.target).closest('.event-name').val()}`,
      'location': `${$(e.target).closest('.event-location').val()}`,
      'startDate': `${$(e.target).closest('.event-date').val()}`,
      'userUid': ``,
    };
    eventsDom.buildUpdateEventInputForm();

    eventsDataGateKP.requestEventPUT(objectToBeUpdated);
  });
  //
  $('#events-view').on('click', '#event-btn-add-new', e => {
    $('#events-header-view').addClass('hide');
    const eventToAdd = {
      'event': `${$('#eventName').val()}`,
      'location': `${$('#eventLocation').val()}`,
      'startDate': `${$('#eventDate').val()}`,
      'userUid': ``,
    };
    eventsDataGateKP.requestEventPOST(eventToAdd);
    eventsDataGateKP.requestEventGET();
    $('#events-header-view').removeClass('hide');
  });

  $('#events-view').on('click', '#event-btn-update', e => {
    e.preventDefault();
    $('#events-header-view').removeClass('hide');
    $('#events-view-data').addClass('hide');
    const eventToUpdate = {
      'event': `${$('#eventName').val()}`,
      'location': `${$('#eventLocation').val()}`,
      'startDate': `${$('#eventDate').val()}`,
      'userUid': ``,
    };
    eventsDataGateKP.requestEventPUT(eventToUpdate);
    $('#events-header-view').removeClass('hide');
  });

  $('#events-view').on('click', '#event-btn-cancel-new', e => {
    e.preventDefault();
    $('#events-header-view').removeClass('hide');
    $('#events-view-data').html('');
    $('#eventName').val('');
    $('#eventLocation').val('');
    $('#eventDate').val('');
    eventsDataGateKP.requestEventGET();
  });
};

module.exports = {
  bindEventsData,
};
