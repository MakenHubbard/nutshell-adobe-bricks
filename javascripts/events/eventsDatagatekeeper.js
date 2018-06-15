// Andy Million
// Typical gatekeeper, probably overkill.
const eventsDom = require('./eventsDom');

const callFirebase = () => {
  promiseFromFirebase()
    .then(allEvents => {
      return allEvents;
    })
    .then(allEvents => {
      eventsDom.buildAllEventsString(allEvents);
    })
    .catch(error => {
      console.error('Error during Firebase request', error);
    });
};

const promiseFromFirebase = () => {
  let eventsArray = [];
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'GET',
      url: `https://nutshell-df075.firebaseio.com/events.json`,
    })
      .done(allEvents => {
        if (allEvents !== null) {
          eventsArray = Object.values(allEvents);
        }
        resolve(eventsArray);
      })
      .fail(error => {
        console.error('Error in promise', error);
        reject(error);
      });
  });
};

module.exports = {
  callFirebase,
};
