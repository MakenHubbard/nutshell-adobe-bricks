const buildUpArticle = (articlesArray) => {
  console.log(articlesArray);
  let string = '';
  for (let i = 0; i < articlesArray.length; i++) {
    string += `<div class="media">`;
    string += `<div class="media-left media-middle">`;
    string +=  `<a href="${articlesArray[i].url}">`;
    const url = articlesArray[i].url;
    const rootUrl = url.match('^.+?[^\/:](?=[?\/]|$)');
    string +=    `<img class="media-object" src="${rootUrl}/favicon.ico" alt="...">`;
    string +=  `</a>`;
    string += `</div>`;
    string += `<div class="media-body">`;
    string +=  `<h4 class="media-heading">${articlesArray[i].title}</h4>`;
    string += `<p>${articlesArray[i].synopsis}</p>`;
    string +=  `</div>`;
    string +=  `</div>`;
  }
  printArticles(string);
};

const printArticles = (strang) => {
  $('#newsFeed').html(strang);
};

module.exports = buildUpArticle;
