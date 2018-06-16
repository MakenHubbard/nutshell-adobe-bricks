const getMsgData = require('./messagesFirebaseApi');
const dom = require('./messagesDom');
const UIDS = require('./holdUID');

const showMessages = () => {
  getMsgData.getAllMessages().then((results) => {
    dom.buildMessagesDomString(results);
  })
    .catch((error) => {
      console.error(error);
    });
};

const newMessageInputField = () => {
  $(document).on('click', '#add-message', (e) => {
    $('#createButt').addClass('hide');
    $('#MessageTextField').removeClass('hide');
    $('#p-title').addClass('hide');
  });
};

const saveButtonEvent = () => {
  $(document).on('click', '#createdMessage', (e) => {
    $('#createButt').removeClass('hide');
    $('#MessageTextField').addClass('hide');
    $('#p-title').removeClass('hide');
    const message = $('#newMessageTextField').val();
    const uid = UIDS.getMessageUID();
    const newTime = moment();
    const addedMessage = {
      message: message,
      userUid: uid,
      timestamp: newTime,
      isEdited: false,
    };
    sendNewMessage(addedMessage);
  });
};

const editMessageInputField = () => {
  $(document).on('click', '#editButt', (e) => {
    $('#editButt').addClass('hide');
    $('#deleteButt').addClass('hide');
    $('#saveEdit').removeClass('hide');
    $('#changeMessageTextField').removeClass('hide');
    $('#userMessage').addClass('hide');
  });
};

const sendNewMessage = (addedMessage) => {
  getMsgData.saveCreatedMessageToFirebase(addedMessage)
    .then((result) => {
      showMessages();
    })
    .catch((error) => {
      console.error(error);
    });
};

const initializer = () => {
  newMessageInputField();
  editMessageInputField();
  saveButtonEvent();
};

module.exports = {
  showMessages,
  initializer,
};
