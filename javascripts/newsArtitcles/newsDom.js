const friends = require('../friends/core');

const buildUpArticle = (articlesArray) => {
  let string = '';
  for (let i = 0; i < articlesArray.length; i++) {
    string += `<div class="panel panel-default">`;
    string += `<div class="panel-body">`;
    string += `<div class="media">`;
    string += `<div class="media-left media-top">`;
    string +=  `<a href="${articlesArray[i].url}">`;
    const url = articlesArray[i].url;
    const rootUrl = url.match('^.+?[^\/:](?=[?\/]|$)');
    string +=    `<img class="media-object fav" src="${rootUrl}/favicon.ico" alt="...">`;
    string +=  `</a>`;
    string += `</div>`;
    string += `<div class="media-body">`;
    string +=  `<h4 class="media-heading">${articlesArray[i].title}</h4>`;
    string += `<p>${articlesArray[i].synopsis}</p>`;
    string += `<p>`;
    string += `<button type="button" class="btn btn-danger btn-xs deleteArticle" data-firebase-id=${articlesArray[i].id}> Delete Article</button>`;
    string += `<p>`;
    string +=  `</div>`;
    string +=  `</div>`;
    string +=  `</div>`;
    string +=  `</div>`;
  }
  printArticles(string);
};

const printArticles = (strang) => {
  $('#newsFeed').html(strang);
};

const buildUpArticle2 = (articlesArray, articlesArray2) => {
  const myfriends = friends.getFriendUids();
  let string = '';
  for (let i = 0; i < articlesArray.length; i++) {
    string += `<div class="panel panel-default">`;
    string += `<div class="panel-body">`;
    string += `<div class="media">`;
    string += `<div class="media-left media-top">`;
    string +=  `<a href="${articlesArray[i].url}">`;
    const url = articlesArray[i].url;
    const rootUrl = url.match('^.+?[^\/:](?=[?\/]|$)');
    string +=    `<img class="media-object fav" src="${rootUrl}/favicon.ico" alt="...">`;
    string +=  `</a>`;
    string += `</div>`;
    string += `<div class="media-body">`;
    string +=  `<h4 class="media-heading">${articlesArray[i].title}</h4>`;
    string += `<p>${articlesArray[i].synopsis}</p>`;
    string += `<p>`;
    string += `<button type="button" class="btn btn-danger btn-xs deleteArticle" data-firebase-id=${articlesArray[i].id}> Delete Article</button>`;
    string += `<p>`;
    string +=  `</div>`;
    string +=  `</div>`;
    string +=  `</div>`;
    string +=  `</div>`;

    for (let i = 0; i < articlesArray2.length; i++) {
      for (let j = 0; j < myfriends.length; j++) {
        if (myfriends[j] === articlesArray2[i].userUid) {
          string += `<div class="panel panel-default ${articlesArray2[i].id}">`;
          string += `<div class="panel-body">`;
          string += `<div class="media">`;
          string += `<div class="media-left media-top">`;
          string +=  `<a href="${articlesArray2[i].url}">`;
          const url = articlesArray2[i].url;
          const rootUrl = url.match('^.+?[^\/:](?=[?\/]|$)');
          string +=    `<img class="media-object fav" src="${rootUrl}/favicon.ico" alt="...">`;
          string +=  `</a>`;
          string += `</div>`;
          string += `<div class="media-body">`;
          string +=  `<h4 class="media-heading">${articlesArray2[i].title}</h4>`;
          string += `<p>${articlesArray2[i].synopsis}</p>`;
          string += `<p>`;
          string += `<button type="button" class="btn btn-danger btn-xs removeArticle" data-firebase-id=${articlesArray2[i].id}> Remove Article</button>`;
          string += `<p>`;
          string +=  `</div>`;
          string +=  `</div>`;
          string +=  `</div>`;
          string +=  `</div>`;
        }
      }
    }
  }
  printArticles2(string);
};

const printArticles2 = (strang) => {
  $('#newsFeed').html(strang);
};

module.exports = {
  buildUpArticle,
  buildUpArticle2,
};
