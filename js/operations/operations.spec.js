const operate = require("./operations");

test("Addition works with integers", () => {
  expect(operate(2, 1, "+")).toBe(3);
});

test("Addition works with floats", () => {
  expect(operate(2.0, 1.5, "+")).toBeCloseTo(3.5, 3);
});

test("Addition works with strings", () => {
  expect(operate("2", "1.1", "+")).toBeCloseTo(3.1, 3);
});

test("Returns the non-zero result when the other operand is equal to zero", () => {
  expect(operate(2, 0, "+")).toBe(2);
});

test("Subtraction works with integers", () => {
  expect(operate(11, 1, "-")).toBe(10);
});

test("Subtraction works with floats", () => {
  expect(operate(9.0, 1.5, "-")).toBeCloseTo(7.5, 3);
});

test("Subtraction works with strings", () => {
  expect(operate("8", "1.7", "-")).toBeCloseTo(6.3, 3);
});

test("Multiplication works with postives", () => {
  expect(operate(8, 3, "*")).toEqual(24);
});

test("Multiplication works with negatives", () => {
  expect(operate(8, -3, "*")).toEqual(-24);
});

test("Multiplication works with negatives if represented as a string", () => {
  expect(operate(8, "-12", "*")).toEqual(-196);
});

test("Multiplication returns zero when one of the operands is equal to zero", () => {
  expect(operate(2, 0, "*")).toEqual(0);
});

test("Multiplication returns zero when both operands are equal to zero", () => {
  expect(operate(0, 0, "*")).toEqual(0);
});

test("Multiplcation works with strings", () => {
  expect(operate(3, "2", "*")).toEqual(6);
});

test("Multiplication returns the value of the first operand when the second one is equal to 1", () => {
  expect(operate(14, 1, "*")).toEqual(14);
});

test("Multiplcation works with floats", () => {
  expect(operate(2.4, 3.6, "*")).toEqual(2.4 * 3.6);
});

test("Division works with integers", () => {
  expect(operate(8, 4, "/")).toEqual(2);
});

test("Division works with floats", () => {
  expect(operate(12, 2.5, "/")).toEqual(12 / 2.5);
});

test("Division works with strings", () => {
  expect(operate("12", "6", "/")).toEqual(2);
});

test("Division throws an error when attempting to divide by zero", () => {
  expect(operate(12, 0, "/")).toThrowError("to zero");
});

test("Division throws an error when both operands equal to zero", () => {
  expect(operate(0, 0, "/")).toThrowError("zero");
});

test("operate throws an error when attempting to use an unsupported operator", () => {
  expect(operate(5, 1, "kek")).toThrowError("This operator is not supported");
});
