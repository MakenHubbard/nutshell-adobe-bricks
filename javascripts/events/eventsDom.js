// Andy Million
// For event DOM related stuff

const events = require('./eventsUid');

const printToDom = (eventsDom, eventsId) => {
  $(eventsId).html(eventsDom);
};

const buildUpdateEventInputForm = objToUpdate => {
  let output = '';
  output = `
  <div class="col-xs-2">
    <h2 class='h2-spacing'>Update Event Details</h2>
  </div>
  <div class="col-xs-8 col-xs-offset-1" id="${objToUpdate.id}">
    <form>
      <div class="form-group form-top-padding inline-block">
        <label for="eventName" class="inline-block">Event Name: </label>
        <input type="text" class="form-control inline-block" id="eventName" placeholder="" value="${objToUpdate.event}">
      </div>
      <div class="form-group">
        <label for="eventLocation">Event Location: </label>
        <input type="text" class="form-control" id="eventLocation" placeholder="" value="${objToUpdate.location}">
      </div>
      <div class="form-group">
        <label for="eventDate">Event Date: </label>
        <input type="text" class="form-control" id="eventDate" placeholder="" value="${objToUpdate.startDate}">
      </div>
      <button class="btn btn-primary" id="event-btn-update">Update</button>
      <button class="btn btn-danger" id="event-btn-cancel-new">Cancel</button>
    </form>
  </div>`;
  printToDom(output, '#events-view-data');
};

const buildEventInputForm = () => {
  let output = '';
  output = `
  <div class="col-xs-2">
    <h2 class='h2-spacing'>Enter Event Details</h2>
  </div>
  <div class="col-xs-8 col-xs-offset-1">
    <form>
      <div class="form-group form-top-padding">
        <label for="eventName">Event Name: </label>
        <input type="text" class="form-control" id="eventName" placeholder="Name">
      </div>
      <div class="form-group">
        <label for="eventLocation">Event Location: </label>
        <input type="text" class="form-control" id="eventLocation" placeholder="Location">
      </div>
      <div class="form-group">
        <label for="eventDate">Event Date: </label>
        <input type="text" class="form-control" id="eventDate" placeholder="Date">
      </div>
      <button class="btn btn-primary" id="event-btn-add-new">Submit</button>
      <button class="btn btn-danger" id="event-btn-cancel-new">Cancel</button>
    </form>
  </div>`;
  printToDom(output, '#events-view-data');
};

const printButtonsOrNot = inputEvent => {
  if (inputEvent.userUid === events.getUid()) {
    // if true, the logged in user can edit/delete event
    const output = `
    <span class="glyphicon glyphicon-pencil" title="Edit This Event" aria-hidden="true"></span>
    <span class="glyphicon glyphicon-trash" title="Delete This Event" aria-hidden="true"></span>`;
    return output;
  } else {
    // else, the user cannot edit/delete the event
    const output = `<span class="glyphicon glyphicon-pencil gray" title="You do not have permission to edit this event" aria-hidden="true" disabled></span>
    <span class="glyphicon glyphicon-trash gray" title="You do not have permission to delete this event" aria-hidden="true" disabled></span>`;
    return output;
  }
};

const buildAllEventsString = (inputEvents) => {
  const matchedArray = [];
  let output = '';
  const loggedInUser = events.getUid();
  const friendArray = events.getFriends();
  // Iterate through filtered/unfiltered list
  inputEvents.forEach(event => {
    friendArray.forEach(friend => {
      if (loggedInUser === event.userUid || event.userUid === friend) {
        matchedArray.push(event);
      }
    });
  });
  const uniqueMatchedArray = [...new Set(matchedArray),];
  uniqueMatchedArray.forEach(event => {
    output += `
    <div class="panel panel-default panel-event col-sm-4" id="${event.id}" data-uid="${event.userUid}">
        <div class="panel-body">
          <h4 class="event-name text-center">${event.event}</h4>
          <p class="event-location">${event.location}</p>
          <p class="event-date">${event.startDate}</p>
        </div>

        <div class="panel-footer text-center">
          ${printButtonsOrNot(event)}
        </div>
        </div>`;
    printToDom(output, '#events-view-data');
  });
};

module.exports = {
  buildAllEventsString,
  buildEventInputForm,
  buildUpdateEventInputForm,
};
