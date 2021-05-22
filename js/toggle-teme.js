const DEFAULT_ELEMENT_ID = "toggle-theme";

export const THEME_TYPES = {
  default: "default", // 1
  light: "light", // 2
  dark: "dark", // 3
};

/**
 * Toggle theme module
 * Is necesary create button element using attribute id = toggle-theme
 * <button id="toggle-theme">Toogle</button>
 */

class Toggle {
  $toggleThemeButton = null;
  currentTheme = THEME_TYPES.default;
  $body = document.getElementsByTagName("body")[0];

  init = (toggleElementId = DEFAULT_ELEMENT_ID) => {
    // HTML Elements
    this.setListeners();

    // SET INITIAL THEME
    this.setTheme();
  };

  /**
   * Set theme using dataset attribute in body
   * @param {*} theme Theme name
   */
  setTheme = (theme) => {
    // DEFAULT THEME
    theme = theme || localStorage.getItem("theme") || THEME_TYPES.default;

    // SET CURRENT THEME
    this.currentTheme = theme;
    this.$body.dataset["scheme"] = theme;
    localStorage.setItem("theme", theme);
  };

  /**
   * Set listener to inputs
   */
  setListeners = () => {
    const $inputs = document.querySelectorAll('input[name="toggle-theme"]');

    $inputs.forEach(($input) => {
      $input.addEventListener("change", this.handleSetCurrentTheme);
    });
  };

  /**
   * Set current theme base on value of input
   */
  handleSetCurrentTheme = ({ target }) => {
    this.setTheme(target.value);
  };
}

export const ToggleTheme = new Toggle();
