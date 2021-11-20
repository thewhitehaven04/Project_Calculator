import { operate } from "./operations/operations.js";

const screenPanelInput = document.querySelector(".screen-panel__input");
screenPanelInput.value = null;

const operators = document.querySelectorAll(".operators__button");

const buttonEquals = document.querySelector(
  ".math-controls__button_type_equals"
);

const comma = document.querySelector(".math-controls__button_type_comma");
const backspace = document.querySelector(".generic-controls__button_backspace");
const ceButton = document.querySelector("#CE");

const mathControls = document.querySelector(".math-controls");
/** The 'state' object is responsible for keeping track of the calculator's state
 */
let state = {
  firstOperand: "",
  secondOperand: "",
  op: null,
  /** The function assign the result of an operation to the first operand and nullifies
   * both the second operand and the next operation for them to be defined
   * according to user input
   * @param {String} operator - operation to be performed.
   */
  performOp: function (operator) {
    if (this.secondOperand & this.op) {
      this.firstOperand = operate(
        this.firstOperand,
        this.secondOperand,
        this.op
      );
      this.secondOperand = null;
    }
    this.op = operator;
  },
  /** The function updates one of the operands depending on whether or not the operation
   * has been previously specified by user input. If the operator has been specified, then the second opperand is appended to.
   * Otherwise, the first operand is.
   */
  appendOperand: function (value) {
    if (!this.op) {
      this.firstOperand = this.firstOperand + value;
    } else {
      this.secondOperand = this.secondOperand + value;
    }
  },
  /** The function performs the operation specified earlier and
   * assigns the result to the first operand.
   */
  performEqual: function () {
    if (this.secondOperand & !(this.op === null)) {
      this.firstOperand = operate(
        this.firstOperand,
        this.secondOperand,
        this.op
      );
      this.secondOperand = "";
      this.op = null;
    }
  },
  toStringRepresentation: function () {
    if (this.op) {
      return `${this.firstOperand}${this.op}${this.secondOperand}`;
    } else {
      return `${this.firstOperand}`;
    }
  },
  cleanState: function () {
    this.firstOperand = "";
    this.secondOperand = "";
    this.op = null;
  },
};

operators.forEach((operator) => {
  /** This listener implements math operator features: when a user clicks on one of the buttons,
   * the calculator state is updated. If both the operator and the second operand have been previously specified,
   * then the operation result is assigned to the first operand.
   */
  operator.addEventListener("click", (event) => {
    const operator = event.target.dataset.operation;
    state.performOp(operator);
  });

  operator.addEventListener(
    "click",
    (event) => (screenPanelInput.value = state.firstOperand + state.op)
  );
});

buttonEquals.addEventListener("click", (event) => {
  state.performEqual();
  screenPanelInput.value = state.toStringRepresentation();
});

mathControls.addEventListener("click", (event) => {
  /** This listener implements calculator digits feature.
   * A digit is added to the display each time a user clicks on it.
   */
  if (event.target.matches(".math-controls__button_type_digit")) {
    const symbolToAdd = event.target.innerText;
    state.appendOperand(symbolToAdd);
    screenPanelInput.value = state.toStringRepresentation();
  }
});

comma.addEventListener("click", (event) => {
  /**  This listener implements the comma feature. 
    If the input field is empty, the comma is not added to the text value
    If the input field already contains a comma in the current operand, the comma is not added as well.
    */
  let inputTextContent = screenPanelInput.value;
  const regExp = new RegExp("([*-+/])?(\\d+)\\.(\\d*)$");
  if (!inputTextContent.match(regExp) & inputTextContent) {
    console.log(`Text content: ${inputTextContent}`);
    console.dir(inputTextContent.match(regExp));
    screenPanelInput.value = inputTextContent + ".";
  }
});

backspace.addEventListener("click", (event) => {
  // This function implements the backspace button feature.
  let currentInputText = screenPanelInput.value;
  console.log(currentInputText);
  if (currentInputText) {
    screenPanelInput.value = currentInputText.slice(
      0,
      currentInputText.length - 1
    );
  }
});

ceButton.addEventListener("click", (event) => {
  state.cleanState();
  screenPanelInput.value = state.toStringRepresentation();
});
