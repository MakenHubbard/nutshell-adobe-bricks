let uid = '';

const setTaskUID = (currentUid) => {
  uid = currentUid;
};
const getTaskUID = () => {
  return uid;
};

module.exports = {
  getTaskUID,
  setTaskUID,
};
