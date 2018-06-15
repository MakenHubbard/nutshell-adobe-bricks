// const friendsCore = require('./core');

const swapTab = () => {
  $('.friends-tab').on('click', event => {
    $('.friends-tab').closest('li').removeClass('active');
    $(event.target).closest('li').addClass('active');
    $('.friends-panel').addClass('hide');
    $(`#${event.target.id.replace('tab', 'view')}`).removeClass('hide');
  });
};

const initFriendEvents = () => {
  swapTab();
};

module.exports = {
  initFriendEvents,
};
