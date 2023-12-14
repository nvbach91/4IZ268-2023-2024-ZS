document.querySelector('.menu-toggle').addEventListener('click', function () {
    document.querySelector('.navigation').classList.toggle('menu-open');
    console.log('clicked!');
    const currentPage = window.location.pathname;
    console.log('Current Page:', currentPage);

    const menuItems = document.querySelectorAll('.nav-menu .menu-item');
    menuItems.forEach(menuItem => {
        const link = menuItem.querySelector('a');
        const itemHref = new URL(link.getAttribute('href'), window.location.href).pathname;
        console.log('Menu Item Href:', itemHref);
        console.log(itemHref === currentPage)

        if (itemHref === currentPage) {
            menuItem.classList.add('current-page');
        } else {
            menuItem.classList.remove('current-page');
        }
    });
});
