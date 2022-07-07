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
  $checkboxesContainer = document.querySelector(".checkboxes-container");
  const $masterCheckbox = document.querySelector(".master-checkbox");
  const checkboxes = document.querySelectorAll(".checkbox");
  const slaveCheckboxes = document.querySelectorAll(".slave-checkbox");
  const requiredCheckboxes = document.querySelectorAll(".required-checkbox");
  const $nextButton = document.querySelector(".next-button");

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
