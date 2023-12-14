document.addEventListener('DOMContentLoaded', function () {
    const button = document.querySelector("#toggle-menu")
    button.addEventListener("click", () => {
        const nav = document.querySelector("nav")
        nav.classList.toggle("hidden")
    })
});  