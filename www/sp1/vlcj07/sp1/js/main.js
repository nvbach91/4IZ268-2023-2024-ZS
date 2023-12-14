const mobileMenu = document.getElementById('mobile-menu');

const toggleMenu = () => {
  if (mobileMenu.style.display === "flex") {
    mobileMenu.style.display = "none";
  } else {
    mobileMenu.style.display = "flex";
  }
}

document.getElementById('hamburger-menu').addEventListener('click', toggleMenu);