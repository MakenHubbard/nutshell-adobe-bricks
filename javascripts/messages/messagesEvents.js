const getMsgData = require('./messagesFirebaseApi');
const dom = require('./messagesDom');

const showMessages = () => {
  getMsgData.getAllMessages().then((results) => {
    dom.buildMessagesDomString(results);
  })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  showMessages,
};
