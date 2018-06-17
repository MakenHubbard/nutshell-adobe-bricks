// Andy Million
// For event DOM related stuff

const printToDom = (eventsDom, eventsId) => {
  $(eventsId).html(eventsDom);
};

const buildUpdateEventInputForm = objToUpdate => {
  let output = '';
  output = `
  <div class="col-xs-2">
    <h2 class='h2-spacing'>Update Event Details</h2>
  </div>
  <div class="col-xs-8 col-xs-offset-1">
    <form>
      <div class="form-group form-top-padding">
        <label for="eventName">Event Name: </label>
        <input type="text" class="form-control" id="eventName" placeholder="" value="${objToUpdate.event}">
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

const buildAllEventsString = (inputEvents) => {
  let output = '';
  inputEvents.forEach((event, index) => {
    output += `
    <div class="panel panel-default panel-event col-sm-4" id="${event.id}">
      <div class="panel-body">
        <h4 class="event-name text-center">${event.event}</h4>
        <p class="event-location">${event.location}</p>
        <p class="event-date">${event.startDate}</p>
      </div>
      <div class="panel-footer text-center">
        <span class="glyphicon glyphicon-pencil" title="Edit This Event" aria-hidden="true"></span>
        <span class="glyphicon glyphicon-trash" title="Delete This Event" aria-hidden="true"></span>
      </div>
    </div>`;
  });
  printToDom(output, '#events-view-data');
};

module.exports = {
  buildAllEventsString,
  buildEventInputForm,
  buildUpdateEventInputForm,
};
