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
};

init();
