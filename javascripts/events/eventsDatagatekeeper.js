const {getConfig,} = require('../firebase/firebaseApi');

//  --------- GET GET GET GET  ---------  //
const eventToGET = () => {};
const requestEventGET = () => {};
//  ------end GET GET GET GET  ---------  //

//  ---------  POST POST POST  ---------  //
const eventToPOST = addThisEvent => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: `${getConfig().databaseURL}/events.json`,
      data: JSON.stringify(newEventToAdd),
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
const eventToDELETE = deleteThisEvent => {};
const requestEventDELETE = () => {
  eventToDELETE(deleteThisEvent).then().catch();
};
//  ------end  DELETE DELETE   ---------  //

//  --------- PUT PUT PUT PUT  ---------  //
const eventToPUT = updateThisEvent => {};
const requestEventPUT = () => {
  eventToPUT(updateThisEvent).then().catch();
};
//  ------end PUT PUT PUT PUT  ---------  //

module.exports = {
  eventToGET,
  requestEventGET,
  eventToPOST,
  requestEventPOST,
  eventToDELETE,
  requestEventDELETE,
  eventToPUT,
  requestEventPUT,
};
