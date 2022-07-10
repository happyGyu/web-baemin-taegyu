import { $, addOrRemoveClass } from "./domUtil.js";

const init = () => {
  const $loginForm = $(".login-form");
  const $idInput = $(".login-input__id");
  const $pwInput = $(".login-input__pw");

  $loginForm.addEventListener(
    "submit",
    handleLoginSubmit.bind(null, $idInput, $pwInput)
  );

  $loginForm.addEventListener("input", handleFormInput);
};

const handleLoginSubmit = ($idInput, $pwInput, event) => {
  const isIdValid = checkInputValidity($idInput);
  const isPwValid = checkInputValidity($pwInput);
  if (!isIdValid || !isPwValid) {
    event.preventDefault();
  }
  handleInputError($idInput, !isIdValid);
  handleInputError($pwInput, !isPwValid);
};

const checkInputValidity = (input) => {
  return input.value.length > 0;
};

const handleInputError = ($input, isError) => {
  const $alertMessage = getInputAlertMessageDOM($input);
  addOrRemoveClass($alertMessage, "hidden", !isError);
  addOrRemoveClass($input, "login-input--error", isError);
};

const getInputAlertMessageDOM = ($input) => {
  const $alertMessage = $input
    .closest(".input-container")
    .querySelector(".input-alert-message");
  return $alertMessage;
};

const handleFormInput = ({ target }) => {
  const $alertMessage = getInputAlertMessageDOM(target);
  addOrRemoveClass($alertMessage, "hidden", true);
  addOrRemoveClass(target, "login-input--error", false);
};

init();
