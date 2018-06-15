// Maken - Building dom View,

const { getAllUsernames, } = require('../firebase/firebaseApi');

const convertUserIdToUserName = (uid, userArray) => {
  return userArray.find((user) => {
    return user.userUid === uid;
  }).username;
};

const buildMessagesDomString = (allMessagesArray) => {
  getAllUsernames()
    .then((userArray) => {
      let string = '';
      allMessagesArray.forEach((message) => {
        const sender = convertUserIdToUserName(message.userUid, userArray);
        string += `<div class="panel panel-primary">`;
        string += `<h4 id="WhoSaidIt">${sender}</h4>`;
        string += `<p id="userMessage">${message.message}</br>${moment().format('LT')}</p>`;
        string += `<div id="buttMessagesDiv">`;
        string += `<button id="editButt" type="button" class="btn btn-default btn-xs">`;
        string += `<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit`;
        string += `</button>`;
        string += `<button id="deleteButt" type="button" class="btn btn-default btn-xs pull-right">`;
        string += `<span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete`;
        string += `</button>`;
        string += `</div>`;
        string += `</div>`;
      });
      printMessagesToDom(string);
    })
    .catch((error) => {
      console.error('error in convert id to user name function', error);
    });
};

const printMessagesToDom = (results) => {
  $('#messages-view').append(results);
};

module.exports = {
  buildMessagesDomString,
};
