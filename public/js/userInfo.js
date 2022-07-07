const init = () => {
  const $emailInput = document.querySelector('[name="email-input"]');
  const $birthdayInput = document.querySelector('[name="birthday-input"]');
  const $emailValidator = document.querySelector(".email-validator");
  const $additionalInfoContainer = document.querySelector(
    ".additional-info-container"
  );

  $emailValidator.addEventListener(
    "click",
    handleEmailValidatorClick.bind(null, $emailInput, $additionalInfoContainer)
  );
  $birthdayInput.addEventListener("input", handleBirthdayInput);
  $additionalInfoContainer.addEventListener(
    "input",
    debounce(handleInfoInput.bind(this), 500)
  );
};

const handleEmailValidatorClick = ($emailInput, $additionalInfoContainer) => {
  handleInputValue($emailInput);
  if (checkInputValidity($emailInput)) {
    $additionalInfoContainer.classList.remove("hidden");
  }
};

const handleBirthdayInput = (e) => {
  const target = e.target;
  const onlyNum = target.value.replaceAll(".", "");
  if (onlyNum.length > 8 || isNaN(e.data)) {
    target.value = target.value.slice(0, -1);
    return;
  }
  if (onlyNum.length < 6) {
    target.value = onlyNum;
    return;
  }
  if (onlyNum.length === 6) {
    target.value = onlyNum.slice(0, 4) + "." + onlyNum.slice(-2);
    return;
  }
  target.value =
    onlyNum.slice(0, 4) + "." + onlyNum.slice(4, -2) + "." + onlyNum.slice(-2);
};

const handleInfoInput = ({ target }) => {
  handleInputValue(target);
};

const handleInputValue = ($input) => {
  const isValid = checkInputValidity($input);
  handleInputContainer(isValid, $input);
};

const handleInputContainer = (isValueValid, $input) => {
  const $validityChecker = $input.parentElement.querySelector(
    ".smart-input__validity-checker"
  );
  const $errorMessage = $input.parentElement.querySelector(
    ".smart-input__error-message"
  );
  if (isValueValid) {
    $validityChecker.classList.add("valid");
    $errorMessage.classList.add("hidden");
  } else {
    $validityChecker.classList.remove("valid");
    $errorMessage.classList.remove("hidden");
  }
};

const checkInputValidity = ($input, e) => {
  if ($input.tagName !== "INPUT") return;
  switch ($input.name) {
    case "email-input":
      return checkEmailValidity($input.value);
    case "nickname-input":
      return checkNicknameValidity($input.value);
    case "password-input":
      return checkPasswordValidity($input.value);
    case "birthday-input":
      return checkBirthdayValidity($input.value);
  }
};

const checkEmailValidity = (emailString) => {
  const emailFormatRegExp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
  return emailFormatRegExp.test(emailString);
};

const checkNicknameValidity = (nickName) => {
  return nickName.length > 0;
};

const checkPasswordValidity = (password) => {
  const validPasswordElementTypes = [/[A-Z]/, /[a-z]/, /[0-9]/, /[^\w\s]/];
  const typeCnt = validPasswordElementTypes.reduce((acc, regex) => {
    return password.match(regex) ? ++acc : acc;
  }, 0);

  if (password.length < 10) return false;
  if (typeCnt < 2) return false;
  if (isThereSerialNum(password, 3)) return false;
  return true;
};

const isThereSerialNum = (targetString, serialLength) => {
  let serialCnt = 0;
  for (const char of targetString) {
    if (!isNaN(char)) {
      serialCnt++;
    } else {
      serialCnt = 0;
    }
    if (serialCnt >= serialLength) return true;
  }
  return false;
};

const checkBirthdayValidity = (birthday) => {
  const oldestDate = Date.parse("1920-01-01");
  const formattedBirthday = birthday.replaceAll(".", "-");
  const parsedBirthday = Date.parse(formattedBirthday);
  return (
    !isNaN(parsedBirthday) &&
    oldestDate < parsedBirthday &&
    formattedBirthday.length === 10
  );
};

const debounce = (callback, time) => {
  let debounceID;
  return (...args) => {
    if (debounceID) {
      clearTimeout(debounceID);
    }
    debounceID = setTimeout(() => callback(...args), time);
  };
};

init();
