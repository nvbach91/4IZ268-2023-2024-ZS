document.addEventListener("DOMContentLoaded", function () {
    // ... (your existing code for displaying gallery items)

    // Mobile menu toggle
    const menuToggle = document.getElementById("menu-toggle");
    const navList = document.getElementById("nav-list");

    menuToggle.addEventListener("click", function () {
        navList.classList.toggle("show");
    });
});
