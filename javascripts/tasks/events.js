const attachEvents = () => {
  $('.task-item').click(e => {
    const taskId = $(e.target).closest('.task').data().id;
    console.log(taskId);
  });
};
module.exports = {
  attachEvents,
};
