// Event listeners, wrapped in attachEvents
// Michael Clark

const data = require('./data');
const {getTaskUID,} = require('./taskUID');

const addTaskEvent = () => {
  $(document).on('click keypress', e => {
    if (($(document.activeElement).is('#new-task') && e.key === 'Enter') || $(e.target).is('#add-task')) {
      const newTask = {
        task: $('#new-task').val(),
        isCompleted: false,
        userUid: getTaskUID(),
      };
      data.addNewTask(newTask);
      $('#new-task').val('');
    }
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
const deleteTaskEvent = () => {
  $(document).on('click', '.delete-task', e => {
    const taskToRemove = $(e.target).closest('.task');
    const taskId = taskToRemove.data().id;
    data.removeTask(taskId).then(r => {
      taskToRemove.remove();
    }).catch(err => {
      console.error('Error in deleteTaskEvent', err);
    });
  });
};
const attachEvents = () => {
  addTaskEvent();
  updateTaskEvent();
  deleteTaskEvent();
};
module.exports = {
  attachEvents,
};
