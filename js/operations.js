export { operate };

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  if (y !== 0) {
    return x / y;
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
  }
}
