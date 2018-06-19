const firebaseApi = require('./newsFire');
// const newsUID = require('./newsUID');

// let uid = newsUID.getNewsUID();

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

const removeArticle = () => {
  $(document).on('click', '.removeArticle',  (e) => {
    e.preventDefault();
    const articleToRemove = e.target.dataset.firebaseId;
    $(`.${articleToRemove}`).addClass('hide');
  });
};

const favImageError = () => {
  $(document).on('error', 'img', function () {
    $(this).attr('src', 'https://cdn3.iconfinder.com/data/icons/ballicons-reloaded-free/512/icon-70-512.png');
  });
};

// const showHideNewsFeed = () => {
//   $(document).on('click','#plus', (e) => {
//     // $('#newsFeed').toggle();
//   });
// };

const newsInitializer = () => {
  saveArticleEvent();
  deleteArticleEvent();
  // showHideNewsFeed();
  favImageError();
  removeArticle();
  // showArtciles();
};

module.exports = newsInitializer;
