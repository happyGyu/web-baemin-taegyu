const handleInputboxKeydown = (
  $submitBtn,
  selectCheckerType,
  { target, data }
) => {
  const onlyPhoneNum = target.value.replaceAll("-", "");
  if (isNaN(data) || onlyPhoneNum.length > 11) {
    target.value = target.value.slice(0, -1);
    return;
  }
  target.value = formatPhoneNum(onlyPhoneNum);
  const isValid = isValidPhoneNumber(onlyPhoneNum);
  selectCheckerType(isValid);
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

const toggleChecker = ($validChecker, $invalidChecker, isValid) => {
  const visibleElement = isValid ? $validChecker : $invalidChecker;
  const hiddenElement = isValid ? $invalidChecker : $validChecker;
  visibleElement.classList.remove("hidden");
  hiddenElement.classList.add("hidden");
};

const handleResetBtnClick = ($smartInputbox, e) => {
  e.preventDefault();
  $smartInputbox.value = "";
};

const handleSubmitBtnClick = (
  $certificationNumContainer,
  $certificationNumInput,
  e
) => {
  e.preventDefault();
  e.target.classList.add("hidden");
  $certificationNumContainer.classList.remove("hidden");
  setCertificationInputValue($certificationNumInput);
};

const setCertificationInputValue = ($certificationNumInput) => {
  const newCertificationNumString = getCertificationNumString();
  setTimeout(() => {
    $certificationNumInput.value = newCertificationNumString;
  }, 2000);
};

const getCertificationNumString = () => {
  const randomNum = Math.floor(Math.random() * 10000);
  const formattedNumString = String(randomNum).padStart(4, "0");
  return formattedNumString;
};

const init = () => {
  const $smartInputbox = document.querySelector(".smart-input__inputbox");
  const $submitBtn = document.querySelector(".smart-input__submit-btn");
  const $resetBtn = document.querySelector(".smart-input__reset-btn");
  const $validChecker = document.querySelector(
    ".smart-input__validity-checker--valid"
  );
  const $invalidChecker = document.querySelector(
    ".smart-input__validity-checker--invalid"
  );
  const $certificationNumContainer = document.querySelector(
    ".certification-num-container"
  );
  const $certificationNumInput = document.querySelector(
    ".certification-num-input"
  );

  const $reissueBtn = document.querySelector(".certification-num-reissue-btn ");
  const selectCheckerType = toggleChecker.bind(
    null,
    $validChecker,
    $invalidChecker
  );

  $smartInputbox.addEventListener(
    "input",
    handleInputboxKeydown.bind(null, $submitBtn, selectCheckerType)
  );
  $resetBtn.addEventListener(
    "click",
    handleResetBtnClick.bind(null, $smartInputbox)
  );

  $submitBtn.addEventListener(
    "click",
    handleSubmitBtnClick.bind(
      null,
      $certificationNumContainer,
      $certificationNumInput
    )
  );

  $reissueBtn.addEventListener(
    "click",
    setCertificationInputValue.bind(null, $certificationNumInput)
  );
};

init();
