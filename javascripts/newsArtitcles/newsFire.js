const firebase = require('../firebase/firebaseApi/');
const dom = require('./newsDom');
let firebaseConfig = {};

// let uid = '';

const checkConfig = () => {
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

const deleteArticle = (articleId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'DELETE',
      url: `${firebaseConfig.databaseURL}/articles/${articleId}.json`,
    })
      .done(() => {
        resolve();
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
  deleteArticle();
};

module.exports = {
  firebaseCRUD,
  saveArticles,
  getArticles,
  deleteArticle,
};
