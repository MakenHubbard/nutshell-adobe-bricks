const viewRegister = () => {
  $('#register-form').removeClass('hide');
  $('#signin-form').addClass('hide');
  $('#splash').addClass('hide');
};
const viewSignin = () => {
  $('#signin-form').removeClass('hide');
  $('#register-form').addClass('hide');
  $('#splash').addClass('hide');
};
const authEvents = () => {
  $('#jumbo-signin, #signin-link').click(viewSignin);
  $('#jumbo-register, #register-link').click(viewRegister);
};
module.exports = {
  authEvents,
};
