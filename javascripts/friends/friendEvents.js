const friendsCore = require('./core');

const initFriendEvents = () => {
  requestFriendEvent();
  cancelRequestEvent();
  deleteFriendEvent();
  acceptFriendEvent();
  rejectFriendEvent();
  clearRejectionEvent();
  filterSearchEvent();
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

const deleteFriendEvent = () => {
  $(document).on('click', '.delete-friend-button', e => {
    friendsCore.deleteFriend($(e.target).data('friendUid'));
  });
};

const acceptFriendEvent = () => {
  $(document).on('click', '.accept-friend-button', e => {
    friendsCore.acceptFriend($(e.target).data('friendUid'));
  });
};

const rejectFriendEvent = () => {
  $(document).on('click', '.reject-friend-button', e => {
    friendsCore.rejectFriend($(e.target).data('friendUid'));
  });
};

const clearRejectionEvent = () => {
  $(document).on('click', '.clear-rejected-friend-button', e => {
    friendsCore.clearRejection($(e.target).data('friendUid'));
  });
};

const filterSearchEvent = () => {
  $('#friend-search').on('change', () => {
    $('.available-friend-item').each(function () {
      $(this).text().slice(0, -10).toLowerCase().includes($('#friend-search').val().toLowerCase()) ? $(this).removeClass('hide') : $(this).addClass('hide');
    });
  });
};

module.exports = {
  initFriendEvents,
};
