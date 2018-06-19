// Andy Million
// Handles user events

const eventsDataGateKP = require ('./eventsDatagatekeeper');
const eventsDom = require('./eventsDom');
const eventsUid = require('./eventsUid');

const canUserModifyEvents = idToTest => {
  if (eventsUid.getUid() === idToTest) {
    return true;
  } else {
    return false;
  }
};

const bindEventsData = () => {
  $('#events-view').on('click', '#events-view-nav', e => {
    e.preventDefault();
    $('#events-header-buttons').removeClass('hide');
    $('#events-header-view').removeClass('hide');
    $('#events-view-data').removeClass('hide');
    eventsDataGateKP.requestEventGET();
  });

  $('#events-view').on('click', '#events-add-new', e => {
    $('#events-header-buttons').removeClass('hide');
    $('#events-view-data').removeClass('hide');
    eventsDom.buildEventInputForm();
  });

  $('#events-view').on('click', '.glyphicon-trash', e => {
    const t = $(e.target).closest('.panel-event');
    const messageCreator = t.data('uid');
    if (canUserModifyEvents(messageCreator)) {
      eventsDataGateKP.requestEventDELETE(t[0].id);
    } else {
      $('#events-view-data').html('<h3>You do not have permission to delete this event.</h3>');
    }
  });

  $('#events-view').on('click', '.glyphicon-pencil', e => {
    const t = $(e.target).closest('.panel-event');
    const messageCreator = t.data('uid');
    let eventId = $(e.target).closest('div[id]');
    eventId = eventId[0].id;
    if (canUserModifyEvents(messageCreator)) {
      const objToUpdate = {
        'id': eventId,
        'event': t.find('.event-name').text(),
        'location': t.find('.event-location').text(),
        'startDate': t.find('.event-date').text(),
        'userUid': t.data('uid'),
      };
      $('#events-header-buttons').addClass('hide');
      $('#events-view-data').html('');
      eventsDom.buildUpdateEventInputForm(objToUpdate);
    } else {
      $('#events-view-data').html('<h3>You do not have permission to edit this event.</h3>');
    }
  });

  $('#events-view').on('click', '#event-btn-add-new', e => {
    $('#events-header-view').addClass('hide');
    const eventToAdd = {
      'event': `${$('#eventName').val()}`,
      'location': `${$('#eventLocation').val()}`,
      'startDate': `${$('#eventDate').val()}`,
      'userUid': eventsUid.getUid(),
    };
    eventsDataGateKP.requestEventPOST(eventToAdd);
    eventsDataGateKP.requestEventGET(eventsUid.getUid());
    $('#events-header-view').removeClass('hide');
  });

  $('#events-view').on('click', '#event-btn-update', e => {
    let eventId = $(e.target).closest('div');
    eventId = eventId[0].id;
    const eventToUpdate = {
      'event': $('#eventName').val(),
      'location': $('#eventLocation').val(),
      'startDate': $('#eventDate').val(),
      'userUid': eventsUid.getUid(),
    };
    $('#events-header-view').removeClass('hide');
    $('#events-header-buttons').removeClass('hide');
    $('#events-view-nav').removeClass('hide');
    eventsDataGateKP.requestEventPUT(eventToUpdate, eventId);
    // eventsDataGateKP.requestEventGET(auth.getUID());
  });

  $('#events-view').on('click', '#event-btn-cancel-new', e => {
    e.preventDefault();
    $('#events-header-buttons').removeClass('hide');
    $('#events-view-data').html('');
    $('#eventName').val('');
    $('#eventLocation').val('');
    $('#eventDate').val('');
    eventsDataGateKP.requestEventGET(eventsUid.getUid());
  });
};

module.exports = {
  bindEventsData,
};
