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
    this.$toggleThemeButton = document.getElementById(toggleElementId);

    // ADD LISTENER IN TOGGLE THEME BUTTON
    if (!this.$toggleThemeButton) {
      console.warn(
        `You must create an element with the if ${toggleElementId} to change the theme`
      );
    } else {
      this.$toggleThemeButton.addEventListener("click", this.toggleTheme);
    }

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
   * Toggle theme circular change (1, 2, 3, 1, 2, 3...)
   */
  toggleTheme = () => {
    switch (this.currentTheme) {
      case THEME_TYPES.default:
        this.setTheme(THEME_TYPES.light);
        break;
      case THEME_TYPES.light:
        this.setTheme(THEME_TYPES.dark);
        break;
      default:
        this.setTheme(THEME_TYPES.default);
        break;
    }
  };
}

export const ToggleTheme = new Toggle();
