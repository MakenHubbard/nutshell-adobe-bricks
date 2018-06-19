const firebase = require('../firebase/firebaseApi/');
const dom = require('./newsDom');

let uid = '';

const setNewsUID = (currentUid) => {
  uid = currentUid;
};
const getNewsUID = (uid) => {
  return uid;
};

let firebaseConfig = {};

const checkConfig = () => {
  firebaseConfig = firebase.getConfig();
};

const editArticle = (article, articleId) => {
  article.userUid = uid;
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'PUT',
      url: `${firebaseConfig.databaseURL}/articles/${articleId}.json`,
      data: JSON.stringify(article),
    })
      .done((uniqueKey) => {
        resolve(uniqueKey);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const getArticles = () => {
  const allNewsArray = [];
  return new Promise((resolve,reject) => {
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/articles.json?orderBy="userUid"&equalTo="${uid}"`,
    })
      .done((allNewsObject) => {
        if (allNewsObject !== null) {
          Object.keys(allNewsObject).forEach((fbkey) => {
            allNewsObject[fbkey].id = fbkey;
            allNewsArray.push(allNewsObject[fbkey]);
            // dom(allNewsArray);
          });
        }
        resolve(allNewsArray);
        getFriendsArticles(allNewsArray);
        // dom.buildUpArticle(allNewsArray);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const getFriendsArticles = (articleArray1) => {
  const allNewsFriendsArray = [];
  return new Promise((resolve,reject) => {
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/articles.json`,
    })
      .done((allNewsObject) => {
        if (allNewsObject !== null) {
          Object.keys(allNewsObject).forEach((fbkey) => {
            allNewsObject[fbkey].id = fbkey;
            allNewsFriendsArray.push(allNewsObject[fbkey]);
          });
        }
        resolve(allNewsFriendsArray);
        dom.buildUpArticle2(articleArray1,allNewsFriendsArray,uid);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const saveArticles = (newArticle) => {
  newArticle.userUid = uid;
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
  // saveArticles();
  deleteArticle();
};

module.exports = {
  firebaseCRUD,
  saveArticles,
  getArticles,
  deleteArticle,
  editArticle,
  setNewsUID,
  getNewsUID,
};
