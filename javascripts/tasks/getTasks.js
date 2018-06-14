const {getConfig,} = require('../firebase/firebaseApi');

const loadTasks = () => {
  const tasksList = [];
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'GET',
      url: `${getConfig().databaseURL}/tasks.json`,
    }).done(results => {
      if (results !== null) {
        Object.keys(results).forEach(key => {
          results[key].id = key;
          tasksList.push(results[key]);
        });
        resolve(tasksList);
      }
    }).fail(err => {
      reject(err);
    });
  });
};
const showMessages = () => {
  loadTasks().then(tasks => {
    console.log(tasks);
  }).catch(err => {
    console.error('Error in showMessages', err);
  });
};

module.exports = {
  showMessages,
};
