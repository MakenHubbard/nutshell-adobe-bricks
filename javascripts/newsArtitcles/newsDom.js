const buildUpArticle = (articlesArray) => {
  console.log(articlesArray);

  let string = '';
  string += `<div class="media">`;
  string += `<div class="media-left media-middle">`;
  string +=  `<a href="#">`;
  string +=    `<img class="media-object" src="..." alt="...">`;
  string +=  `</a>`;
  string += `</div>`;
  string += `<div class="media-body">`;
  string +=  `<h4 class="media-heading">Middle aligned media</h4>`;
  string +=  `</div>`;
  string +=  `</div>`;
  return string;
};

module.exports = buildUpArticle;
