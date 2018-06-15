// const firebaseApi = require('./newsFire');

const saveArticleEvent = () => {
  $(document).on('click','#newArticle', (e) => {
    e.preventDefault();
    console.log(e);
    // const articleToAdd = {
    //   // title: ,
    //   // synopsis: ,
    //   // url: ,
    // };
    // firebaseApi.saveArticles(articleToAdd)
    //   .then(() => {

    //   })
    //   .catch((error) => {
    //     console.error('error in saving article', error);
    //   });
  });
};

const newsInitializer = () => {
  saveArticleEvent();
};

module.exports = newsInitializer;
