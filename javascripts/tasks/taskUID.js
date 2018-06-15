// Holds the UID for this module
// Michael Clark

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
