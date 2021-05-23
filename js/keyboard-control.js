import { CalculationControl } from "./calculation-control.js";

class KeyPad {
  init = () => {
    this.setButtonListener();
    document.addEventListener("keyup", this.handleKeyUp);
    document.addEventListener("keydown", this.handleKeyDown);
  };

  /**
   * Set listener on all buttons
   */
  setButtonListener = () => {
    const $buttons = document.querySelectorAll(".cacl__button");

    for (let i = 0; i < $buttons.length; i++) {
      $buttons[i].addEventListener("click", this.handleButtonClick);
    }
  };

  /**
   * Call actions by button type
   */
  handleButtonClick = ({ target }) => {
    const { value } = target;
    CalculationControl.handleActionType(value);
  };

  /**
   * handle key up
   */
  handleKeyUp = ({ key }) => {
    console.log(key);

    CalculationControl.handleActionType(key);
    this.handleRemoveActivebuttonClass(key);
  };

  /**
   * handle key down
   */
  handleKeyDown = ({ key }) => {
    this.handleAddActivebuttonClass(key);
  };

  /**
   * Add button active class
   */
  handleAddActivebuttonClass = (key) => {
    const button = document.querySelector(`button[value="${key}"]`);
    if (button && !button.classList.contains("active")) {
      button.classList.add("active");
    }
  };

  /**
   * Remove button active class
   */
  handleRemoveActivebuttonClass = (key) => {
    const button = document.querySelector(`button[value="${key}"]`);
    if (button && button.classList.contains("active")) {
      button.classList.remove("active");
    }
  };
}

export const Keyboard = new KeyPad();
