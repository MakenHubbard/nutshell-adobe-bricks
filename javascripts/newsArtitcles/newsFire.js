const firebase = require('../firebase/firebaseApi/');

let firebaseConfig = {};

const checkConfig = () => {
  console.log(firebaseConfig);
  console.log(firebase.getConfig());
  firebaseConfig = firebase.getConfig();
};

const getArticles = () => {
  const allNewsArray = [];
  return new Promise((resolve,reject) => {
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/articles.json`,
    })
      .done((allNewsObject) => {
        if (allNewsObject !== null) {
          Object.keys(allNewsObject).forEach((fbkey) => {
            allNewsObject[fbkey].id = fbkey;
            allNewsArray.push(allNewsObject[fbkey]);
            console.log(allNewsArray);
          });
        }
        resolve(allNewsArray);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const firebaseCRUD = () => {
  checkConfig();
  getArticles();
};

module.exports = firebaseCRUD;
