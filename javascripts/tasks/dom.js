const {getTaskUID,} = require('./taskUID');

const domBuilder = (taskList) => {
  let domString = '';
  taskList.forEach(task => {
    if (task.userUid === getTaskUID()) {
      domString +=
      `<div class="col-lg-3 col-md-4 task" id="${task.id}">
        <div class="panel panel-default">
          <div class="panel-body">
            ${task.isCompleted ? `<del><span class="task-item">${task.task}</span></del>` : `<span class="task-item">${task.task}</span>`}
            <span class="glyphicon glyphicon-trash delete-task"></span>
          </div>
        </div>
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
