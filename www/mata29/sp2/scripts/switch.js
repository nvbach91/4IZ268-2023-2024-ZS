const Switch = {

  getDefaultTheme() {
    let settings = localStorage.getItem("lightSwitch");
    if (settings == "light" || settings == "dark") {
      return settings;
    }

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  },

  setup() {
    let defaultTheme = Switch.getDefaultTheme();
    $(document.documentElement).attr("data-bs-theme", defaultTheme);
    localStorage.setItem("lightSwitch", defaultTheme);
    $("#light-switch").prop("checked", (defaultTheme == "light"));

    $("#light-switch").on("click", () => {
      if ($("#light-switch").prop("checked")) {
        $(document.documentElement).attr("data-bs-theme", "light");
        localStorage.setItem("lightSwitch", "light");
      } else {
        $(document.documentElement).attr("data-bs-theme", "dark");
        localStorage.setItem("lightSwitch", "dark");
      }
    });
  }
};

$(function () {
  Switch.setup();
});