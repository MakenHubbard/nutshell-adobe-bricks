// Event listeners, wrapped in attachEvents
// Michael Clark

const data = require('./data');
const {getTaskUID,} = require('./taskUID');

const addTaskEvent = () => {
  $(document).on('click', '#add-task', e => {
    const newTask = {
      task: $('#new-task').val(),
      isCompleted: false,
      userUid: getTaskUID(),
    };
    data.addNewTask(newTask);
    $('#new-task').val('');
  });
};
const updateTaskEvent = () => {
  $(document).on('click', '.task-item', e => {
    const taskToRemove = $(e.target).closest('.task');
    const taskId = taskToRemove.data().id;
    const updatedTask = {
      task: taskToRemove.find('.task-item').text(),
      isCompleted: true,
      userUid: getTaskUID(),
    };
    if ($(e.target).parent().prop('tagName') === 'DEL') {
      updatedTask.isCompleted = false;
    }
    data.updateTask(updatedTask, taskId);
  });
};
const attachEvents = () => {
  addTaskEvent();
  updateTaskEvent();
};
module.exports = {
  attachEvents,
};
