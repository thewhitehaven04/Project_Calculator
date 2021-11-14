import { screenPanelInput } from "../../screen-panel/__input/screen-panel__input.js";

const digitControls = document.querySelector(".math-controls");

digitControls.addEventListener("click", (event) => {
  if (event.target.matches(".math-controls__button_digit")) {
    const symbolToAdd = event.target.innerText;
    screenPanelInput.value = screenPanelInput.value + symbolToAdd;
  }
});
