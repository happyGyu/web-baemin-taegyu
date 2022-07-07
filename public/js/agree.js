import { $, $All } from "./domUtil.js";

const handleMasterCheckboxClick = (checkboxes, $masterCheckbox) => {
  Array.from(checkboxes).forEach(
    (checkbox) => (checkbox.checked = $masterCheckbox.checked)
  );
};

const isAllchecked = (checkboxes) => {
  return Array.from(checkboxes).every((checkbox) => checkbox.checked);
};

const handleCheckboxesContainerClick = (
  checkboxes,
  slaveCheckboxes,
  requiredCheckboxes,
  $masterCheckbox,
  $nextButton,
  { target }
) => {
  if (target.type !== "checkbox") return;
  if (target.classList.contains("master-checkbox")) {
    handleMasterCheckboxClick(checkboxes, target);
  }
  $nextButton.disabled = !isAllchecked(requiredCheckboxes);
  $masterCheckbox.checked = isAllchecked(slaveCheckboxes);
};

const init = () => {
  const $checkboxesContainer = $(".checkboxes-container");
  const $masterCheckbox = $(".master-checkbox");
  const checkboxes = $All(".checkbox");
  const slaveCheckboxes = $All(".slave-checkbox");
  const requiredCheckboxes = $All(".required-checkbox");
  const $nextButton = $(".next-button");

  $checkboxesContainer.addEventListener(
    "click",
    handleCheckboxesContainerClick.bind(
      null,
      checkboxes,
      slaveCheckboxes,
      requiredCheckboxes,
      $masterCheckbox,
      $nextButton
    )
  );
};

init();
