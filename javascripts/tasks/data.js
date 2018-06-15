// CRUD functions and initializer
// Michael Clark

const {getConfig,} = require('../firebase/firebaseApi');
const dom = require('./dom');

const postNewTask = (newTaskObj) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: `${getConfig().databaseURL}/tasks.json`,
      data: JSON.stringify(newTaskObj),
    }).done(response => {
      resolve(response);
    }).fail(err => {
      reject(err);
    });
  });
};
const addNewTask = (newTask) => {
  postNewTask(newTask).then(result => {
    showTasks();
  }).catch(err => {
    console.error('Error adding task', err);
  });
};

const getTasks = () => {
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
  getTasks().then(tasks => {
    dom.domBuilder(tasks);
  }).catch(err => {
    console.error('Error in showTasks', err);
  });
};
const initTasks = () => {
  showTasks();
};

module.exports = {
  showTasks,
  addNewTask,
  initTasks,
};
