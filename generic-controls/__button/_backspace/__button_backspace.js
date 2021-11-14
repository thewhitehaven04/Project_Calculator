import { screenPanelInput } from "../../../screen-panel/__input/screen-panel__input.js";

const backspace = document.querySelector(".generic-controls__button_backspace");

function clearInputWithBackSpace(event) {
  // This function implements the backspace button feature.
  let currentInputText = screenPanelInput.value;
  console.log(currentInputText);
  if (currentInputText) {
    screenPanelInput.value = currentInputText.slice(
      0,
      currentInputText.length - 1
    );
  }
}
backspace.addEventListener("click", clearInputWithBackSpace);
