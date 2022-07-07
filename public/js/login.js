import { $, addOrRemoveClass } from "./domUtil.js";

const handleLoginSubmit = (
  $idInput,
  $pwInput,
  $idInputAlertMessage,
  $pwInputAlertMessage,
  event
) => {
  const isIdValid = checkInputValidity($idInput);
  const isPwValid = checkInputValidity($pwInput);
  if (!isIdValid || !isPwValid) {
    event.preventDefault();
  }
  addOrRemoveClass($idInputAlertMessage, "hidden", isIdValid);
  addOrRemoveClass($pwInputAlertMessage, "hidden", isPwValid);
};

const checkInputValidity = (input) => {
  return input.value.length > 0;
};

const init = () => {
  const $loginForm = $(".login-form");
  const $idInput = $(".login-input__id");
  const $pwInput = $(".login-input__pw");
  const $idInputAlertMessage = $idInput.nextElementSibling;
  const $pwInputAlertMessage = $pwInput.nextElementSibling;

  $loginForm.addEventListener(
    "submit",
    handleLoginSubmit.bind(
      null,
      $idInput,
      $pwInput,
      $idInputAlertMessage,
      $pwInputAlertMessage
    )
  );
};

init();
