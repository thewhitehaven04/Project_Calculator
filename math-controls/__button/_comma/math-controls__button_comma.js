import { screenPanelInput } from "../../../screen-panel/__input/screen-panel__input.js";

const comma = document.querySelector(".math-controls__button_type_comma");

comma.addEventListener("click", (event) => {
  /** This listener implements the comma functionality. 
  * If the input field is empty, the comma is not added to the text value
  * If the input field already contains a comma in the current operand, the comma is not added as well.
  */
  let inputTextContent = screenPanelInput.value;
  const regExp = new RegExp("([*-+/])?(\\d+)\\.(\\d*)$");
  if (!inputTextContent.match(regExp) & inputTextContent) {
    console.log(`Text content: ${inputTextContent}`);
    console.dir(inputTextContent.match(regExp));
    screenPanelInput.value = inputTextContent + ".";
  }
});
