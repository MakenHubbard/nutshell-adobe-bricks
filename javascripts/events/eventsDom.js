// Andy Million
// For event DOM related stuff

const printAllEventsToDom = (eventsDom, eventsId) => {
  $(eventsId).html(eventsDom);
};

const buildAllEventsString = inputEvents => {
  let output = '';
  inputEvents.forEach(event => {
    output += ``;
  });

  printAllEventsToDom(output, "#events-view");
};

module.exports = {
  buildAllEventsString,
};
