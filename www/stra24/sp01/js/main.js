
  document.addEventListener('scroll', function () {
    const scrolled = window.scrollY;
    const parallaxBg = document.querySelector('.parallax-bg');
    parallaxBg.style.transform = 'translateY(' + scrolled * 0.5 + 'px)';
  });