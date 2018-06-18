const firebaseApi = require('./newsFire');

const saveArticleEvent = () => {
  $(document).on('click','#newArticle', (e) => {
    e.preventDefault();
    $('.collapse').collapse('toggle');
    const titleInput = $('#title').val();
    const urlInput = $('#url').val();
    const synopsisInput = $('#synopsis').val();

    const articleToAdd = {
      title: titleInput ,
      synopsis: synopsisInput,
      url: urlInput,
    };
    firebaseApi.saveArticles(articleToAdd)
      .then(() => {
        firebaseApi.getArticles();
      })
      .catch((error) => {
        console.error('error in saving article', error);
      });
  });
};

const deleteArticleEvent = () => {
  $(document).on('click', '.deleteArticle', (e) => {
    e.preventDefault();
    const articleToDeleteId = e.target.dataset.firebaseId;
    firebaseApi.deleteArticle(articleToDeleteId)
      .then(() => {
        firebaseApi.getArticles();
      })
      .catch((error) => {
        console.error('error', error);
      });
  });
};

// const showHideNewsFeed = () => {
//   $(document).on('click','#plus', (e) => {
//     // $('#newsFeed').toggle();
//   });
// };

// const favImageError = () => {
//   $(document).on('error','.fav', (e) => {

//   });
// };

const newsInitializer = () => {
  saveArticleEvent();
  deleteArticleEvent();
  // showHideNewsFeed();
  // favImageError();
};

module.exports = newsInitializer;
