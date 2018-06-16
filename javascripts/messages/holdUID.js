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
