// Andy Million
// User ID (uid) getter and setter
const core = require('../friends/core');

let uid = '';

const getFriends = () => {
  const friendUids = core.getFriendUids();
  return friendUids;
};

const setUid = inputUid => {
  uid = inputUid;
  getFriends();
};

const getUid = () => uid;

module.exports = {
  setUid,
  getUid,
  getFriends,
};
