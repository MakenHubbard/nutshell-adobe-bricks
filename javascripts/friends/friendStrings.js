const createCurrentFriendListItem = (friendUid, friendDisplayName) => {
  return `
  <li class="list-group-item current-friend-item">
    ${friendDisplayName}
    <button class="btn btn-danger delete-friend-button" data-friend-uid="${friendUid}">Delete</button>
  </li>`;
};

const createAvailableFriendListItem = (friendUid, friendDisplayName) => {
  return `
  <li class="list-group-item available-friend-item">
    ${friendDisplayName}
    <button class="btn btn-primary request-friend-button" data-friend-uid="${friendUid}">Request</button>
  </li>`;
};

const createPendingFriendListItem = (friendUid, friendDisplayName) => {
  return `
  <li class="list-group-item pending-friend-item">
    ${friendDisplayName}
    <button class="btn btn-danger reject-friend-button" data-friend-uid="${friendUid}">Reject</button>
    <button class="btn btn-success accept-friend-button" data-friend-uid="${friendUid}">Accept</button>
  </li>`;
};

const createSentFriendListItem = (friendUid, friendDisplayName) => {
  return `
  <li class="list-group-item sent-friend-item">
    ${friendDisplayName}
    <button class="btn btn-danger cancel-friend-button" data-friend-uid="${friendUid}">Cancel</button>
  </li>`;
};

const createRejectedFriendListItem = (friendUid, friendDisplayName) => {
  return `
  <li class="list-group-item rejected-friend-item">
    ${friendDisplayName}
    <button class="btn btn-warning clear-rejected-friend-button" data-friend-uid="${friendUid}">Clear</button>
  </li>`;
};

module.exports = {
  createCurrentFriendListItem,
  createAvailableFriendListItem,
  createPendingFriendListItem,
  createSentFriendListItem,
  createRejectedFriendListItem,
};
