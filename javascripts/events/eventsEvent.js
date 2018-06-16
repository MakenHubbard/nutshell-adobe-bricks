// Andy Million
// Handles user events
const eventsDataGateKP = require ('./eventsDatagatekeeper');
const eventsDom = require('./eventsDom');

const bindEventsData = () => {
  $('#events-view').on('click', '#events-view-all', e => {
    $('#events-header-buttons').removeClass('hide');
    $('#events-view-data').addClass('hide');
    eventsDataGateKP.requestEventGET();
  });

  $('#events-view').on('click', '#events-add-new', e => {
    $('#events-header-buttons').removeClass('hide');
    $('#events-view-data').removeClass('hide');
    eventsDom.buildEventInputForm();
  });

  $('#events-view').on('click', '.glyphicon-trash', e => {
    const eventToTrash = $(e.target).closest('.panel-event');
    eventsDataGateKP.requestEventDELETE(eventToTrash[0].id);
  });

  $('#events-view').on('click', '.glyphicon-pencil', e => {
    e.preventDefault();
    $('#events-header-buttons').addClass('hide');
    $('#events-view-data').removeClass('hide');
    const eventToUpdate = {
      'event': `${$('#eventName').val()}`,
      'location': `${$('#eventLocation').val()}`,
      'startDate': `${$('#eventDate').val()}`,
      'userUid': ``,
    };
    console.log(eventToUpdate);
    eventsDom.buildUpdateEventInputForm(eventToUpdate);
  });

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

  });

  $('#events-view').on('click', '#event-btn-cancel-new', e => {
    e.preventDefault();
    $('#events-header-buttons').removeClass('hide');
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
