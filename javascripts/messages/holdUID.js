// Maken - just to set n get the uid ids we need so circles dont happen
let uid = '';

const setMessageUID = (newUID) => {
  uid = newUID;
};

const getMessageUID = () => {
  return uid;
};

module.exports = {
  setMessageUID,
  getMessageUID,
};
