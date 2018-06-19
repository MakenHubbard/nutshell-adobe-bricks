// Andy Million
// Call promises and call firebase in here

const eventsDom = require('./eventsDom');
// const {getConfig,} = require('../firebase/firebaseApi');

//  --------- GET GET GET GET  ---------  //
const eventToGET = () => {
  const eventsArray = [];
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'GET',
      url: `https://nutshell-df075.firebaseio.com/events.json`,
    })
      .done(allEvents => {
        if (allEvents !== null) {
          Object.keys(allEvents).forEach(firebaseKey => {
            allEvents[firebaseKey].id = firebaseKey;
            eventsArray.push(allEvents[firebaseKey]);
          });
          resolve(eventsArray);
        }
      })
      .fail(error => {
        console.error('Error in promise', error);
        reject(error);
      });
  });
};
const requestEventGET = () => {
  eventToGET()
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
//  ------end GET GET GET GET  ---------  //

//  ---------  POST POST POST  ---------  //
const eventToPOST = addThisEvent => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: `https://nutshell-df075.firebaseio.com/events.json`,
      data: JSON.stringify(addThisEvent),
    })
      .done(result => {
        resolve(result);
      })
      .fail(err => {
        console.error(err);
        reject(err);
      });
  });
};
const requestEventPOST = addThisEvent => {
  eventToPOST(addThisEvent)
    .then(results => {
      // print to DOM
    })
    .catch(err => {
      console.error('Error on POST process, ', err);
    });
};
//  ------end  POST POST POST  ---------  //

//  ---------  DELETE DELETE   ---------  //
const eventToDELETE = deleteThisEvent => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'DELETE',
      url: `https://nutshell-df075.firebaseio.com/events/${deleteThisEvent}.json`,
    })
      .done(result => {
        resolve(result);
      })
      .fail(err => {
        console.error(err);
        reject(err);
      });
  });
};
const requestEventDELETE = deleteThisEventId => {
  eventToDELETE(deleteThisEventId)
    .then(() => {
      requestEventGET();
    })
    .catch(error => {
      console.error('Error on DELETE process', error);
    });
};
//  ------end  DELETE DELETE   ---------  //

//  --------- PUT PUT PUT PUT  ---------  //
const eventToPUT = updateThisEvent => {};
const requestEventPUT = updateThisEvent => {
  eventToPUT(updateThisEvent).then().catch();
};
//  ------end PUT PUT PUT PUT  ---------  //

module.exports = {
  requestEventGET,
  requestEventPOST,
  requestEventDELETE,
  requestEventPUT,
};
