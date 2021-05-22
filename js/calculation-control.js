import {
  CALC_ACTIONS,
  CALC_NUMBERS,
  CALC_OPERATIONS,
  CURRENT_NUMBER,
} from "./helpers.js";
import { ScreenControl } from "./screen-control.js";

/**
 * All the operations performed by the and buttons will be generated in this file
 *
 * - Sum
 * - Subtraction
 * - Division
 * - Multiplication
 */

class Calculation {
  leftNumber = "0";
  rightNumber = null;
  operator = null;
  currentNumber = CURRENT_NUMBER.left;

  // TODO: Implement common function to run operation.
  Sum = () => {
    const result = Number(this.leftNumber) + Number(this.rightNumber);
    ScreenControl.setResult(result);
    this.resetAll(false);
  };

  Subtract = () => {
    const result = Number(this.leftNumber) - Number(this.rightNumber);
    ScreenControl.setResult(result);
    this.resetAll(false);
  };

  Division = () => {
    const result = Number(this.leftNumber) / Number(this.rightNumber);
    ScreenControl.setResult(result);
    this.resetAll(false);
  };

  Multiplication = () => {
    const result = Number(this.leftNumber) * Number(this.rightNumber);
    ScreenControl.setResult(result);
    this.resetAll(false);
  };

  /**
   * Handle action based on value
   */
  handleActionType = (value) => {
    if (CALC_NUMBERS[value] !== undefined) {
      this.setNumber(value);
    } else if (CALC_ACTIONS[value]) {
      this.mapActionButton(value);
    } else if (CALC_OPERATIONS[value]) {
      this.setOperation(value);
    }
  };

  /**
   * Set the number in memory and on the display
   */
  setNumber = (value) => {
    if (!this.operator) {
      this.leftNumber =
        this.leftNumber && this.leftNumber !== "0"
          ? this.leftNumber + value
          : value;
      this.currentNumber = CURRENT_NUMBER.left;
      ScreenControl.setResult(this.leftNumber);
      ScreenControl.setOperation("");
    } else {
      this.rightNumber = this.rightNumber ? this.rightNumber + value : value;
      this.currentNumber = CURRENT_NUMBER.right;
      ScreenControl.setResult(this.rightNumber);
      this.setOperation(this.operator);
    }
  };

  /**
   * Set the action in memory and on screen
   */
  mapActionButton = (action) => {
    switch (action) {
      case CALC_ACTIONS.reset:
      case CALC_ACTIONS.Escape:
        this.resetAll();
        break;
      case CALC_ACTIONS.del:
      case CALC_ACTIONS.Backspace:
        this.removeNumber();
        break;
      case CALC_ACTIONS["."]:
        this.addPeriod();
        break;
      case CALC_ACTIONS["="]:
        this.resolveOperation();
        break;
      default:
        break;
    }
  };

  /**
   * Run specific action to resolve operation
   */
  resolveOperation = () => {
    if (this.leftNumber && this.operator && this.rightNumber) {
      switch (this.operator) {
        case CALC_OPERATIONS["*"]:
        case CALC_OPERATIONS["x"]:
          this.Multiplication();
          break;
        case CALC_OPERATIONS["+"]:
          this.Sum();
          break;
        case CALC_OPERATIONS["/"]:
          this.Division();
          break;
        case CALC_OPERATIONS["-"]:
          this.Subtract();
          break;
        default:
          break;
      }
    }
  };

  /**
   * Set operator and show operation in display
   */
  setOperation = (operator) => {
    if (this.leftNumber) {
      this.operator = operator;
      ScreenControl.setOperation(
        `${this.leftNumber} ${this.operator} ${this.rightNumber || ""}`
      );
    }
  };

  /**
   * Initialize all values
   */
  resetAll = (cleanScreen = true) => {
    if (cleanScreen) {
      ScreenControl.resetScreen();
    }
    this.leftNumber = null;
    this.rightNumber = null;
    this.operator = null;
    this.currentNumber = CURRENT_NUMBER.left;
  };

  /**
   * Remove left or right number one by one
   */
  removeNumber = () => {
    if (this.leftNumber && this.currentNumber === CURRENT_NUMBER.left) {
      const currentValue = this.leftNumber;
      this.leftNumber = null;
      this.setNumber(currentValue.slice(0, -1));
    }

    if (this.rightNumber && this.currentNumber === CURRENT_NUMBER.right) {
      const currentValue = this.rightNumber;
      this.rightNumber = null;
      this.setNumber(currentValue.slice(0, -1));
    }
  };

  /**
   * Add point to decimal operator
   */
  addPeriod = () => {
    if (
      this.currentNumber === CURRENT_NUMBER.left &&
      this.leftNumber &&
      !this.leftNumber.includes(".")
    ) {
      this.setNumber(".");
    }

    if (
      this.currentNumber === CURRENT_NUMBER.right &&
      this.rightNumber &&
      !this.rightNumber.includes(".")
    ) {
      this.setNumber(".");
    }
  };
}

export const CalculationControl = new Calculation();
