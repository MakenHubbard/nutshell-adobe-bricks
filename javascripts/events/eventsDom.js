// Andy Million
// For event DOM related stuff

const printToDom = (eventsDom, eventsId) => {
  $(eventsId).html(eventsDom);
};

const buildEventInputForm = () => {
  let output = '';
  output = `

  `;
  printToDom(output, '#events-view-data');
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
