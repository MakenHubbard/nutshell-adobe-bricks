// Andy Million
// eventsData will retrieve a list of eventsData
// and display them. The users will be able to interact
// with the events (CRUD).

const firebaseApi = require('../firebase/firebaseApi');

const getEventsFromFirebase = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'GET',
      url: `${firebaseApi.getConfig.databaseURL}/events.json`,
    })
      .done(allEvents => {
        eventsDom.buildAllEventsString(allEvents);
        console.log(allEvents);
      })
      .fail(error => {
        console.error(error);
      });
  });
};

module.exports = {
  getEventsFromFirebase,
};