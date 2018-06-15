// Event listeners, wrapped in attachEvents
// Michael Clark

const data = require('./data');
const {getTaskUID,} = require('./taskUID');

const attachEvents = () => {
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
module.exports = {
  attachEvents,
};
