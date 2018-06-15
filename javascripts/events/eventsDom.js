// Andy Million
// For event DOM related stuff

const printAllEventsToDom = (eventsDom, eventsId) => {
  $(eventsId).html(eventsDom);
};

const buildAllEventsString = (inputEvents) => {

  let output = '';

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
        <span class="glyphicon glyphicon-plus" title="Add New Event" aria-hidden="true"></span>
        <span class="glyphicon glyphicon-pencil" title="Edit This Event" aria-hidden="true"></span>
        <span class="glyphicon glyphicon-trash" title="Delete This Event" aria-hidden="true"></span>
      </div>
    </div>
    `;

    if (index % 3 === 2) {
      output += `</div>`;
    }
  });

  printAllEventsToDom(output, '#events-view');
};

module.exports = {
  buildAllEventsString,
};
