// Andy Million
// Handles user events
const eventsDataGateKP = require ('./eventsDatagatekeeper');
const eventsDom = require('./eventsDom');
const auth = require('../auth/auth');

const canUserModifyEvents = idToTest => {
  console.log('current user:', auth.getUID());
  console.log('testing user------', idToTest);
  if (auth.getUID() === idToTest) {
    return true;
  } else {
    return false;
  }
};

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
    const messageCreator = eventToTrash.data('uid');
    if (canUserModifyEvents(messageCreator)) {
      eventsDataGateKP.requestEventDELETE(eventToTrash[0].id);
    }
  });

  $('#events-view').on('click', '.glyphicon-pencil', e => {
    const t = $(e.target).closest('.panel');
    const objToUpdate = {
      'id': $(e.target).closest('div[id]'),
      'event': t.find('.event-name').text(),
      'location': t.find('.event-location').text(),
      'startDate': t.find('.event-date').text(),
    };
    $('#events-header-buttons').addClass('hide');
    $('#events-view-data').html('');
    eventsDom.buildUpdateEventInputForm(objToUpdate);
  });

  $('#events-view').on('click', '#event-btn-add-new', e => {
    $('#events-header-view').addClass('hide');
    const eventToAdd = {
      'event': `${$('#eventName').val()}`,
      'location': `${$('#eventLocation').val()}`,
      'startDate': `${$('#eventDate').val()}`,
      'userUid': auth.getUID(),
    };
    eventsDataGateKP.requestEventPOST(eventToAdd);
    eventsDataGateKP.requestEventGET();
    $('#events-header-view').removeClass('hide');
  });

  $('#events-view').on('click', '#event-btn-update', e => {
    const eventId = $(e.target).closest('div[id]');
    const eventToUpdate = {
      'event': $('#eventName').val(),
      'location': $('#eventLocation').val(),
      'startDate': $('#eventDate').val(),
      'id': eventId,
      'userUid': '',
    };
    $('#events-header-view').removeClass('hide');
    $('#events-header-buttons').removeClass('hide');
    $('#events-view-nav').removeClass('hide');
    eventsDataGateKP.requestEventPUT(eventToUpdate);
    eventsDataGateKP.requestEventGET();
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
