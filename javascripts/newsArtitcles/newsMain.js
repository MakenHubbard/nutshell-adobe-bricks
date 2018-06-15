const fire = require('./newsFire');
const events =  require('./newsEvents');

const initializarNews = () => {
  fire.firebaseCRUD();
  events();
};

module.exports = initializarNews;
