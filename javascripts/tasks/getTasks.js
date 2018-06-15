// Gets task list from database and prints to dom
// Michael Clark

const {getConfig,} = require('../firebase/firebaseApi');
const dom = require('./dom');

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
const showTasks = () => {
  loadTasks().then(tasks => {
    dom.domBuilder(tasks);
  }).catch(err => {
    console.error('Error in showMessages', err);
  });
};

module.exports = {
  showTasks,
};
