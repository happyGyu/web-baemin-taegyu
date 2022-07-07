const handleLoginSubmit = (
  $idInput,
  $pwInput,
  $idInputAlertMessage,
  $pwInputAlertMessage,
  e
) => {
  //e.preventDefault();
  if (!$idInput.value.length) {
    $idInputAlertMessage.classList.remove("hidden");
  } else {
    $idInputAlertMessage.classList.add("hidden");
  }
  if (!$pwInput.value.length) {
    $pwInputAlertMessage.classList.remove("hidden");
  } else {
    $pwInputAlertMessage.classList.add("hidden");
  }
};

const init = () => {
  const $loginForm = document.querySelector(".login-form");
  const $idInput = document.querySelector(".login-input__id");
  const $pwInput = document.querySelector(".login-input__pw");
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
