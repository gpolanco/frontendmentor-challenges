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
  result = null;
  currentNumber = CURRENT_NUMBER.left;

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
          this.setResult(Number(this.leftNumber) * Number(this.rightNumber));
          break;
        case CALC_OPERATIONS["+"]:
          this.setResult(Number(this.leftNumber) + Number(this.rightNumber));
          break;
        case CALC_OPERATIONS["/"]:
          this.setResult(Number(this.leftNumber) / Number(this.rightNumber));
          break;
        case CALC_OPERATIONS["-"]:
          this.setResult(Number(this.leftNumber) - Number(this.rightNumber));
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
    } else if (this.result) {
      this.operator = operator;
      this.leftNumber = this.result;
      this.currentNumber = CURRENT_NUMBER.right;

      ScreenControl.setOperation(
        `${this.result} ${this.operator} ${this.rightNumber || ""}`
      );
    }
  };

  setResult = (result) => {
    this.result = result;
    ScreenControl.setResult(this.result);
    ScreenControl.setOperation("");

    this.leftNumber = null;
    this.rightNumber = null;
    this.operator = null;
  };

  /**
   * Initialize all values
   */
  resetAll = (cleanScreen = true) => {
    ScreenControl.resetScreen();
    this.leftNumber = null;
    this.rightNumber = null;
    this.operator = null;
    this.result = null;
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
    // Add to left number
    if (
      this.currentNumber === CURRENT_NUMBER.left &&
      this.leftNumber &&
      !this.leftNumber.includes(".")
    ) {
      this.setNumber(".");
    }

    // Add to right number
    if (
      this.currentNumber === CURRENT_NUMBER.right &&
      this.rightNumber &&
      !this.rightNumber.includes(".")
    ) {
      this.setNumber(".");
    }
    if (
      (this.leftNumber && this.operator && !this.rightNumber) ||
      !this.leftNumber
    ) {
      this.setNumber("0.");
    }
  };
}

export const CalculationControl = new Calculation();
