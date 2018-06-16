// Andy Million
// For event DOM related stuff

const printToDom = (eventsDom, eventsId) => {
  $(eventsId).html(eventsDom);
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

const buildAllEventsString = (inputEvents) => {
  let output = `
    <div class="row events-nav-header" id="events-view-nav">
      <div class="col-xs-3" id="events-add-new">
        <h4 class="text-left">Add New Event</h4>
      </div>
      <div class="col-xs-6">
        <h2 class="text-center">Your Events</h2>
      </div>
      <div class="col-xs-3" id="events-view-all">
        <h4 class="text-right">View All Events</h4>
      </div>
    </div>
  `;
  inputEvents.forEach((event, index) => {
    if (index % 3 === 0) {
      output += `<div class="row">`;
    }
    output += `
    <div class="panel panel-default col-sm-4" id="${event.startDate}">
      <div class="panel-body">
        <h4 class="event-name text-center">${event.event}</h4>
        <p class="event-location">${event.location}</p>
        <p class="event-date">${event.startDate}</p>
      </div>
      <div class="panel-footer text-center">
        <span class="glyphicon glyphicon-pencil" title="Edit This Event" aria-hidden="true"></span>
        <span class="glyphicon glyphicon-trash" title="Delete This Event" aria-hidden="true"></span>
      </div>
    </div>
    `;
    if (index % 3 === 2) {
      output += `</div>`;
    }
  });
  printToDom(output, '#events-view-data');
};

module.exports = {
  buildAllEventsString,
  buildEventInputForm,
};
