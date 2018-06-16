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

module.exports = {
  getAllMessages,
};
