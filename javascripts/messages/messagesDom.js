// Maken - Building dom View

const buildMessagesDomString = (allMessagesArray) => {
  let string = '';
  allMessagesArray.forEach((message) => {
    string += `<div class="panel panel-primary">`;
    string += `<h4 id="WhoSaidIt">userNameHere</h4>`;
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
};

const printMessagesToDom = (results) => {
  $('#messages-view').append(results);
};

module.exports = {
  buildMessagesDomString,
};
