const firebase = require('../firebase/firebaseApi/');
const dom = require('./newsDom');
let firebaseConfig = {};

// let uid = '';

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
            dom(allNewsArray);
          });
        }
        resolve(allNewsArray);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const saveArticles = (newArticle) => {
  return new Promise((resolve,reject) => {
    $.ajax({
      method: 'POST',
      url: `${firebaseConfig.databaseURL}/articles.json`,
      data: JSON.stringify(newArticle),

    })
      .done((uniqueKey) => {
        resolve(uniqueKey);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const firebaseCRUD = () => {
  checkConfig();
  getArticles();
  saveArticles();
};

module.exports = {
  firebaseCRUD,
  saveArticles,
};
