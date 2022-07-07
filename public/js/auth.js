import { $, addOrRemoveClass } from "./domUtil.js";

const handlePhoneNumInput = (
  $submitBtn,
  $validityChecker,
  { target, data }
) => {
  const purePhoneNum = target.value.replaceAll("-", "");

  if (isNaN(data) || purePhoneNum.length > 11) {
    target.value = target.value.slice(0, -1);
    return;
  }

  target.value = formatPhoneNum(purePhoneNum);
  const isValid = isValidPhoneNumber(purePhoneNum);
  addOrRemoveClass($validityChecker, "valid", isValid);
  $submitBtn.disabled = !isValid;
};

const formatPhoneNum = (numString) => {
  if (numString.length < 6) {
    return numString;
  }
  if (numString.length < 8) {
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

const isValidPhoneNumber = (phoneNum) => {
  return phoneNum.length === 10 || phoneNum.length === 11;
};

const handleResetBtnClick = ($phoneNumInput, e) => {
  e.preventDefault();
  $phoneNumInput.value = "";
};

const handleSubmitBtnClick = (
  $certificationNumContainer,
  $certificationNumInput,
  $nextBtn,
  event
) => {
  event.preventDefault();
  event.target.classList.add("hidden");
  $certificationNumContainer.classList.remove("hidden");
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
  const randomNum = Math.floor(Math.random() * 10000);
  const formattedNumString = String(randomNum).padStart(4, "0");
  return formattedNumString;
};

const handleNextBtnClick = ($authForm) => {
  $authForm.submit();
};

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
    handleResetBtnClick.bind(null, $phoneNumInput)
  );

  $submitBtn.addEventListener(
    "click",
    handleSubmitBtnClick.bind(
      null,
      $certificationNumContainer,
      $certificationNumInput,
      $nextBtn
    )
  );

  $reissueBtn.addEventListener(
    "click",
    setCertificationInputValue.bind(null, $certificationNumInput, $nextBtn)
  );

  $nextBtn.addEventListener("click", handleNextBtnClick.bind(null, $authForm));
};

init();
