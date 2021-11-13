function add(x, y) {
  return Number.parseFloat(x) + Number.parseFloat(y);
}

function subtract(x, y) {
  return Number.parseFloat(x) - Number.parseFloat(y);
}

function multiply(x, y) {
  return Number.parseFloat(x) * Number.parseFloat(y);
}

function divide(x, y) {
  x = Number.parseFloat(x);
  y = Number.parseFloat(y);
  if (y !== 0) {
    if (x != 0) return x / y;
    else {
      throw new RangeError(
        "Both operands must not be equal to zero at the same time"
      );
    }
  } else {
    throw new RangeError("The divisor must not be equal to zero!");
  }
}

function operate(x, y, op) {
  /** The function performs basic math operations
   * @param {Number} x - first operand
   * @param {Number} y - second operand
   * @param {String} op - the string representation of a binary operator
   */
  switch (op) {
    case "+":
      return add(x, y);
    case "-":
      return subtract(x, y);
    case "*":
      return multiply(x, y);
    case "/":
      return divide(x, y);
    default:
      throw new RangeError("This operation is not supported");
  }
}

module.exports = operate;
