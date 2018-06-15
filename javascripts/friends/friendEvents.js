const friendsCore = require('./core');

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
  requestFriendEvent();
  cancelRequestEvent();
};

const requestFriendEvent = () => {
  $(document).on('click', '.request-friend-button', e => {
    friendsCore.createFriendRequest($(e.target).data('friendUid'));
  });
};

const cancelRequestEvent = () => {
  $(document).on('click', '.cancel-friend-button', e => {
    friendsCore.cancelSentRequest($(e.target).data('friendUid'));
  });
};

module.exports = {
  initFriendEvents,
};
