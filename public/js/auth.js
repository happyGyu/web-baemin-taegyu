import { $, addOrRemoveClass } from "./domUtil.js";
import {
  MAX_PHONE_NUN_LENGTH,
  MIN_PHONE_NUN_LENGTH,
  CERTIFICATION_NUM_LENGTH,
} from "./constant.js";

const init = () => {
  const $phoneNumInput = $(".smart-input__inputbox");
  const $submitBtn = $(".smart-input__submit-btn");
  const $resetBtn = $(".smart-input__reset-btn");
  const $validityChecker = $(".smart-input__validity-checker");
  const $certificationNumContainer = $(".certification-num-container");
  const $certificationNumInput = $(".certification-num-input");
  const $reissueBtn = $(".certification-num-reissue-btn");
  const $nextBtn = $(".right-header-anchor");
  const $authForm = $(".smart-input-form");

  $phoneNumInput.addEventListener(
    "input",
    handlePhoneNumInput.bind(null, $submitBtn, $validityChecker)
  );

  $resetBtn.addEventListener(
    "click",
    handleResetBtnClick.bind(null, $phoneNumInput, $validityChecker)
  );

  $submitBtn.addEventListener(
    "click",
    handleSubmitBtnClick.bind(
      null,
      $certificationNumContainer,
      $certificationNumInput,
      $phoneNumInput,
      $resetBtn,
      $nextBtn
    )
  );

  $reissueBtn.addEventListener(
    "click",
    setCertificationInputValue.bind(null, $certificationNumInput, $nextBtn)
  );

  $nextBtn.addEventListener("click", handleNextBtnClick.bind(null, $authForm));
};

const handlePhoneNumInput = (
  $submitBtn,
  $validityChecker,
  { target, data }
) => {
  const purePhoneNum = target.value.replaceAll("-", "");

  if (isNaN(data) || purePhoneNum.length > MAX_PHONE_NUN_LENGTH) {
    target.value = target.value.slice(0, -1);
    return;
  }

  target.value = formatPhoneNum(purePhoneNum);
  const isValid = checkPhoneNumValidity(purePhoneNum);
  addOrRemoveClass($validityChecker, "valid", isValid);
  $submitBtn.disabled = !isValid;
};

const formatPhoneNum = (numString) => {
  if (numString.length < MIN_PHONE_NUN_LENGTH / 2) {
    return numString;
  }
  if (numString.length < (MIN_PHONE_NUN_LENGTH * 2) / 3) {
    return [numString.slice(0, -4), "-", numString.slice(-4)].join("");
  }
  return [
    numString.slice(0, 3),
    "-",
    numString.slice(3, -4),
    "-",
    numString.slice(-4),
  ].join("");
};

const checkPhoneNumValidity = (phoneNum) => {
  return (
    phoneNum.length === MIN_PHONE_NUN_LENGTH ||
    phoneNum.length === MAX_PHONE_NUN_LENGTH
  );
};

const handleResetBtnClick = ($phoneNumInput, $validityChecker, e) => {
  e.preventDefault();
  $phoneNumInput.value = "";
  $validityChecker.classList.remove("valid");
};

const handleSubmitBtnClick = (
  $certificationNumContainer,
  $certificationNumInput,
  $phoneNumInput,
  $resetBtn,
  $nextBtn,
  event
) => {
  event.preventDefault();
  event.target.classList.add("hidden");
  $certificationNumContainer.classList.remove("hidden");
  $phoneNumInput.disabled = true;
  $resetBtn.disabled = true;
  setCertificationInputValue($certificationNumInput, $nextBtn);
};

const setCertificationInputValue = ($certificationNumInput, $nextBtn) => {
  $certificationNumInput.value = "";
  $nextBtn.disabled = true;
  setTimeout(() => {
    const newCertificationNumString = getCertificationNumString();
    $certificationNumInput.value = newCertificationNumString;
    $nextBtn.disabled = false;
  }, 2000);
};

const getCertificationNumString = () => {
  const randomNum = Math.floor(Math.random() * 10 ** CERTIFICATION_NUM_LENGTH);
  const formattedNumString = String(randomNum).padStart(
    CERTIFICATION_NUM_LENGTH,
    "0"
  );
  return formattedNumString;
};

const handleNextBtnClick = ($authForm) => {
  $authForm.submit();
};

init();
