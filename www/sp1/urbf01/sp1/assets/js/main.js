const button = document.querySelector("#togglerBtn");
const navigation = document.querySelector("#navbarCollapse");
const dropdownButtons = document.querySelectorAll(".dropdown-link svg");

button.addEventListener("click", () => {
  navigation.classList.toggle("show");
});

dropdownButtons.forEach((button) => {
  const dropdownId = button.getAttribute("data-target");
  const dropdown = document.querySelector("#" + dropdownId);

  button.addEventListener("click", () => {
    closeOpenedDropdowns(dropdownId);
    button.classList.toggle("rotate");
    dropdown.classList.toggle("show");
    console.log("opened/closed");
  });
});

function closeOpenedDropdowns(dropdownId) {
  dropdownButtons.forEach((button) => {
    if (button.getAttribute("data-target") !== dropdownId) {
      const dropdown = document.querySelector("#" + button.getAttribute("data-target"));

      if (button.classList.contains("rotate")) {
        button.classList.remove("rotate");
        dropdown.classList.remove("show");
        console.log("removed");
      }
    }
  });
}
