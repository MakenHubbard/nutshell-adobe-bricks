const firebaseApi = require('./newsFire');

const saveArticleEvent = () => {
  $(document).on('click','#newArticle', (e) => {
    e.preventDefault();
    console.log(e);
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
        // collaspe and reprint dom
      })
      .catch((error) => {
        console.error('error in saving article', error);
      });
  });
};

const showHideNewsFeed = () => {
  $(document).on('click','#plus', (e) => {
    $('#newsFeed').toggle();
  });
};

const newsInitializer = () => {
  saveArticleEvent();
  showHideNewsFeed();
};

module.exports = newsInitializer;
