const showHeader = () => {
    $('body').append(`
    <header>
        <div>
            <h1 class="page-title">TestOS</h1>
            <div class="btn btn-info"><i class="fa fa-bar-chart" aria-hidden="true"></i>Moje statistiky</div>
        </div>
    </header>
    `);
}
showHeader();

const showMenu = () => {
    $('body').append(`
    <div><h3>Vítej v TestOS! Začni tím, že si zvolíš sadu otázek, kterou se chceš naučit.</h3></div>
    <div class="subjects">
    <div class="btn btn-primary"><p>Ekonomie I.</p><p>5EN101</p></div>
    <div class="btn btn-primary"><p>Účetnictví I.</p><p>1FU201</p></div>
    <div class="btn btn-primary"><p>Něco dalšího</p><p>4XX666</p></div>
    </div>
    `);
}
showMenu();

const showDisclaimer = () => {
    $('body').append(`
    <div>Upozornění!</div>
    <div>Stránka je ve vývoji, proto vypadá jak vypadá. Je klidně možné, že stránka bude vypadat mírně odlišně, jako při minulé návštěvě. Zatím nedělá nic, než zobrazuje tuhle homescreen. Děkuji za pochopení a trpělivost.</div>
    `);
}
showDisclaimer();

const showFooter = () => {
    $('body').append(`
    <footer>Work in progress. Created by Eduard Jurášek for FIS VŠE using jQuerry and Bootstrap.</footer>
    `)
}
showFooter();

