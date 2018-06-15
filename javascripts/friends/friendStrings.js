const createCurrentFriendListItem = (friendUid, friendDisplayName) => {
  return `
  <li class="list-group-item current-friend-item" data-friend-uid="${friendUid}">
    ${friendDisplayName}
    <button class="btn btn-danger delete-friend-button">Delete</button>
  </li>`;
};

module.exports = {
  createCurrentFriendListItem,
};
