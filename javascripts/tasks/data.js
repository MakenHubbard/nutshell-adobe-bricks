// CRUD functions and initializer
// Michael Clark

const {getConfig,} = require('../firebase/firebaseApi');
const dom = require('./dom');

const deleteTask = (taskId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'DELETE',
      url: `${getConfig().databaseURL}/tasks/${taskId}.json`,
    }).done(response => {
      resolve(response);
    }).fail(err => {
      reject(err);
    });
  });
};
const removeTask = (taskId) => {
  return deleteTask(taskId).then(result => {
    showTasks();
  }).catch(err => {
    console.error('Error deleting task');
  });
};
const putNewTask = (modTaskObj, taskId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'PUT',
      url: `${getConfig().databaseURL}/tasks/${taskId}.json`,
      data: JSON.stringify(modTaskObj),
    }).done(response => {
      resolve(response);
    }).fail(err => {
      reject(err);
    });
  });
};
const updateTask = (modTaskObj, taskId) => {
  putNewTask(modTaskObj, taskId).then(result => {
    showTasks();
  }).catch(err => {
    console.error('Error updating task', err);
  });
};
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
  updateTask,
  removeTask,
  initTasks,
};
