import { operate } from "./operations/operations.js";

const screenPanelInput = document.querySelector(".screen-panel__input");
screenPanelInput.value = null;

const operators = document.querySelectorAll(".operators__button");

const buttonEquals = document.querySelector(
  ".math-controls__button_type_equals"
);

const comma = document.querySelector(".math-controls__button_type_comma");
const backspace = document.querySelector(
  ".generic-controls__button_type_backspace"
);
const ceButton = document.querySelector("#CE");

const mathControls = document.querySelector(".math-controls");
/** The 'state' object is responsible for keeping track of the calculator's state */
let state = {
  firstOperand: "",
  secondOperand: "",
  op: null,

  /** The function assign the result of an operation to the first operand and nullifies
   * both the second operand and the next operation for them to be defined
   * according to user input
   * @param {String} operator - operation to be performed.*/
  performOp: function (operator) {
    if (!!this.firstOperand & !!this.secondOperand & !!this.op) {
      try {
        this.firstOperand = operate(
          this.firstOperand,
          this.secondOperand,
          this.op
        ).toString();
      } catch (e) {
        if (e instanceof RangeError) displayDivisionByZeroErrorMessage();
      }
      this.secondOperand = "";
    }
    this.op = operator;
  },
  /** The function updates one of the operands depending on whether or not the operation
   * has been previously specified by user input. If the operator has been specified, then the second opperand is appended to.
   * Otherwise, the first operand is.*/
  appendOperand: function (value) {
    const hasCommaRegExp = new RegExp("^(\\d+)\\.(\\d*)$");
    // const leadingZeroesRegExp = new RegExp("^0(\\d+)$");

    if (value === ".") {
      // Make sure that only one comma is allowed in an operand
      if (!this.op) {
        if (!this.firstOperand.match(hasCommaRegExp)) {
          this.firstOperand = this.firstOperand + value;
        }
      } else {
        if (!this.secondOperand.match(hasCommaRegExp)) {
          this.secondOperand = this.secondOperand + value;
        }
      }
    } else {
      if (!this.op) {
        this.firstOperand = this.firstOperand + value;
        // Remove leading zeroes
        // if (this.firstOperand.match(leadingZeroesRegExp)) {
        //   this.firstOperand = this.firstOperand.slice(1);
        // }
      } else {
        this.secondOperand = this.secondOperand + value;
        // Remove leading zeroes
        // if (this.secondOperand.match(leadingZeroesRegExp)) {
        //   this.secondOperand = this.secondOperand.slice(1);
        // }
      }
    }
  },
  /** Removes the last digit appended to either the first or the second operand. */
  removeOperand: function () {
    if (!!this.secondOperand) {
      this.secondOperand = this.secondOperand.slice(0, -1);
    } else {
      this.firstOperand = this.firstOperand.slice(0, -1);
    }
  },
  /** The function performs the operation specified earlier and
   * assigns the result to the first operand.*/
  performEqual: function () {
    if (!!this.firstOperand && !!this.secondOperand & !!this.op) {
      try {
        this.firstOperand = operate(
          this.firstOperand,
          this.secondOperand,
          this.op
        ).toString();
      } catch (e) {
        if (e instanceof RangeError) displayDivisionByZeroErrorMessage();
      }
      this.secondOperand = "";
      this.op = null;
    }
  },
  /** The function nullifies the calculator's state */
  cleanState: function () {
    this.firstOperand = "";
    this.secondOperand = "";
    this.op = null;
  },
  /** Returns the string representation of calculator state.*/
  toStringRepresentation: function () {
    const formattedNumber = (number) => {
      return number.toLocaleString("ru", { maximumFractionDigits: 3 });
    };

    let strFirstOperand = formattedNumber(this.firstOperand);

    if (!!this.op) {
      let strSecondOperand = formattedNumber(this.secondOperand);
      return `${strFirstOperand}${this.op}${strSecondOperand}`;
    } else {
      return `${strFirstOperand}`;
    }
  },
};

operators.forEach((operator) => {
  /** This listener implements math operator features: when a user clicks on one of the buttons,
   * the calculator state is updated. If both the operator and the second operand have been previously specified,
   * then the operation result is assigned to the first operand.*/
  operator.addEventListener("click", (event) => {
    const operator = event.target.dataset.operation;
    state.performOp(operator);
    cleanDivisionByZeroErrorMessage();
    screenPanelInput.value = state.toStringRepresentation();
  });
});

buttonEquals.addEventListener("click", (event) => {
  state.performEqual();
  screenPanelInput.value = state.toStringRepresentation();
});

mathControls.addEventListener("click", (event) => {
  /** This listener implements calculator digits feature.
   * A digit is added to the display each time a user clicks on it.*/
  if (event.target.matches(".math-controls__button_type_digit")) {
    const symbolToAdd = event.target.innerText;
    state.appendOperand(symbolToAdd);
    screenPanelInput.value = state.toStringRepresentation();
  }
});

comma.addEventListener("click", (event) => {
  /**  This listener implements the comma feature. 
    If the input field is empty, the comma is not added to the text value
    If the input field already contains a comma in the current operand, the comma is not added as well.*/
  state.appendOperand(".");
  screenPanelInput.value = state.toStringRepresentation();
});

/** This listener implements the backspace button feature.*/
backspace.addEventListener("click", (event) => {
  state.removeOperand();
  screenPanelInput.value = state.toStringRepresentation();
});

ceButton.addEventListener("click", (event) => {
  state.cleanState();
  screenPanelInput.value = state.toStringRepresentation();
});

/** Displays an error message upon attempting to divide by zero. */
function displayDivisionByZeroErrorMessage() {
  const warningMessageSpan = document.createElement("span");
  // Added a bit of randomness to warning messages for the sake of fun
  const warningMessageArr = [
    "Did you really think that you'd be allowed to do that? hehe",
    "Seriously?",
    "The divisor must not be equal to zero.",
    "Ain't gonna let you crash this app!",
  ];
  warningMessageSpan.textContent =
    warningMessageArr[Math.floor(warningMessageArr.length * Math.random())];

  warningMessageSpan.classList.add("error-message-pane__text");

  const errorMessageNode = document.querySelector(".error-message-pane");
  errorMessageNode.appendChild(warningMessageSpan);
}

/** Removes the division by zero error message */
function cleanDivisionByZeroErrorMessage() {
  const warningMessage = document.querySelector(".error-message-pane__text");
  if (!!warningMessage) {
    const warningMessageDiv = document.querySelector(".error-message-pane");
    warningMessageDiv.removeChild(warningMessage);
  }
}

/** This listener implements keyboard support. */
window.addEventListener("keydown", (event) => {
  const operatorKeys = ["/", "+", "-", "*"];
  const equalKeys = ["=", "Enter"];
  const buttonDigitKeys = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ".",
  ];
  const backspace = "backspace";

  if (buttonDigitKeys.includes(event.key)) {
    state.appendOperand(event.key);
    cleanDivisionByZeroErrorMessage();
  } else if (equalKeys.includes(event.key)) {
    state.performEqual();
    cleanDivisionByZeroErrorMessage();
  } else if (operatorKeys.includes(event.key)) {
    state.performOp(event.key);
  } else if (event.key === backspace) {
    state.removeOperand();
  } else return;

  screenPanelInput.value = state.toStringRepresentation();
});
