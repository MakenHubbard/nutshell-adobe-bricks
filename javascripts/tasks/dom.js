const {getTaskUID,} = require('./taskCore');

const domBuilder = (taskList) => {
  let domString = '';
  taskList.forEach(task => {
    if (task.userUid === getTaskUID()) {
      domString +=
      `<div class="col-md-3 task" id="${task.id}">
        <span class="task-item">${task.task}</span>
        <span class="glyphicon glyphicon-trash"></span>
      </div>`;
    }
  });
  writeTasks(domString);
};
const writeTasks = (domString) => {
  $('#tasks').html(domString);
};
module.exports = {
  domBuilder,
};
