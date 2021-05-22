class Screen {
  $screen = document.getElementById("calc-result");
  $screenOperation = document.getElementById("calc-operation");

  setOperation = (operation) => {
    this.$screenOperation.innerText = operation;
  };

  /**
   * Set result on screen
   */
  setResult = (value) => {
    this.$screen.innerText = value || "0";
  };

  /**
   * reset all values
   */
  resetScreen = () => {
    this.setOperation("");
    this.setResult("0");
  };
}

export const ScreenControl = new Screen();
