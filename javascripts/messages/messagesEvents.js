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
  $(document).on('click', '.editButt', (e) => {
    const messageClickedToEdit = $(e.target).closest('.mess');
    messageClickedToEdit.find('.editButt').addClass('hide');
    messageClickedToEdit.find('.deleteButt').addClass('hide');
    messageClickedToEdit.find('.saveEdit').removeClass('hide');
    messageClickedToEdit.find('.changeMessageTextField').removeClass('hide');
    messageClickedToEdit.find('.userMessage').addClass('hide');
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

const deleteMessagesFromFirebase = () => {
  $(document).on('click', '#deleteButt', (e) => {
    console.log(e);
    const messageToDelete = $(e.target).closest('.mess').data('firebaseId');
    getMsgData.deleteMessageFromDb(messageToDelete)
      .then(() => {
        showMessages();
      })
      .catch((error) => {
        console.error('something went wrong the delete message from firebase function', error);
      });
  });
};

const initializer = () => {
  newMessageInputField();
  editMessageInputField();
  saveButtonEvent();
  deleteMessagesFromFirebase();
};

module.exports = {
  showMessages,
  initializer,
};
