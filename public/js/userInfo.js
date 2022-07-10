import { $, $All, addOrRemoveClass } from "./domUtil.js";
import { debounce } from "./util.js";
import {
  BIRTHDAY_NUM_LENGTH,
  FORMATTED_BIRTHDAY_LENGTH,
  MIN_PW_ELEMENT_TYPE,
  MIN_PW_LENGTH,
  PW_SERIAL_NUM_LIMIT,
} from "./constant.js";

const init = () => {
  const $emailInput = $('[name="email-input"]');
  const $birthdayInput = $('[name="birthday-input"]');
  const $emailValidator = $(".email-validator");
  const $additionalInfoContainer = $(".additional-info-container");
  const inputList = $All(".smart-input__inputbox");
  const $submitBtn = $(".right-header-anchor");
  const $infoForm = $(".smart-input-form");

  $emailValidator.addEventListener(
    "click",
    handleEmailValidatorClick.bind(
      null,
      $emailInput,
      inputList,
      $submitBtn,
      $additionalInfoContainer
    )
  );

  $additionalInfoContainer.addEventListener(
    "input",
    debounce((e) => handleInfoInput(inputList, $submitBtn, e.target), 500)
  );

  $birthdayInput.addEventListener("input", handleBirthdayInput);

  $submitBtn.addEventListener(
    "click",
    handleSubmitBtnClick.bind(null, $infoForm)
  );
};

const handleEmailValidatorClick = (
  $emailInput,
  inputList,
  $submitBtn,
  $additionalInfoContainer
) => {
  handleInfoInput(inputList, $submitBtn, $emailInput);
  const isEmailValid = checkInputValidity($emailInput);
  addOrRemoveClass($additionalInfoContainer, "hidden", !isEmailValid);
};

const handleInfoInput = (inputList, $submitBtn, $input) => {
  checkInputValidityAndChangeState($input);
  const isAllInputValid = checkAllValidity(inputList);
  $submitBtn.disabled = !isAllInputValid;
};

const checkAllValidity = (inputList) => {
  return Array.from(inputList).every(checkInputValidity);
};

const checkInputValidityAndChangeState = ($input) => {
  const isValid = checkInputValidity($input);
  handleInputContainer(isValid, $input);
};

const handleInputContainer = (isValueValid, $input) => {
  const $inputContainer = $input.parentElement;
  const $validityChecker = $inputContainer.querySelector(
    ".smart-input__validity-checker"
  );
  const $errorMessage = $inputContainer.querySelector(
    ".smart-input__error-message"
  );
  addOrRemoveClass($validityChecker, "valid", isValueValid);
  addOrRemoveClass($errorMessage, "hidden", isValueValid);
  addOrRemoveClass($inputContainer, "smart-input--error", !isValueValid);
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

  if (password.length < MIN_PW_LENGTH) return false;
  if (typeCnt < MIN_PW_ELEMENT_TYPE) return false;
  if (isThereSerialNum(password, PW_SERIAL_NUM_LIMIT)) return false;
  return true;
};

const isThereSerialNum = (targetString, serialLength) => {
  let serialNumArr = [];
  for (const char of targetString) {
    if (isNaN(char)) {
      serialNumArr = [];
      continue;
    }

    const difference = +char - serialNumArr.at(-1);
    if (Math.abs(difference) !== 1) {
      serialNumArr = [+char];
      continue;
    }
    serialNumArr.push(+char);
    if (difference !== serialNumArr.at(-2) - serialNumArr.at(-3)) {
      serialNumArr = serialNumArr.slice(-2);
    }
    if (serialNumArr.length >= serialLength) return true;
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
    formattedBirthday.length === FORMATTED_BIRTHDAY_LENGTH
  );
};

const handleBirthdayInput = (e) => {
  const target = e.target;
  const onlyNum = target.value.replaceAll(".", "");
  if (onlyNum.length > BIRTHDAY_NUM_LENGTH || isNaN(e.data)) {
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

const handleSubmitBtnClick = ($infoForm) => {
  $infoForm.submit();
};

init();
