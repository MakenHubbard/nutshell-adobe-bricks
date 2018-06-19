// Maken - getting messages,
const { getConfig, } = require('../firebase/firebaseApi');

const getAllMessages = () => {
  return new Promise((resolve, reject) => {
    const allMessagesArray = [];
    $.ajax({
      method: 'GET',
      url: `${getConfig().databaseURL}/messages.json`,
    })
      .done((allMessagesObj) => {
        if (allMessagesObj !== null) {
          Object.keys(allMessagesObj).forEach((fbKey) => {
            allMessagesObj[fbKey].id = fbKey;
            allMessagesArray.push(allMessagesObj[fbKey]);
          });
        }
        resolve(allMessagesArray);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const saveCreatedMessageToFirebase = (createdMessage) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: `${getConfig().databaseURL}/messages.json`,
      data: JSON.stringify(createdMessage),
    })
      .done((uniqueKey) => {
        resolve(uniqueKey);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const deleteMessageFromDb = (message) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'DELETE',
      url: `${getConfig().databaseURL}/messages/${message}.json`,
    })
      .done(() => {
        resolve();
      })
      .fail((error) => {
        reject(error);
      });
  });
};

module.exports = {
  getAllMessages,
  saveCreatedMessageToFirebase,
  deleteMessageFromDb,
};
