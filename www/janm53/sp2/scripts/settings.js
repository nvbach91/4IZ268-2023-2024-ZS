function settings(){
    // Funkce pro načtení směnného kurzu z API a uložení do lokálního úložiště.
    let currencyNameInput = localStorage.getItem('toCurrency');
    const getExchangeRate = document.getElementById('exchangeRate');
    const getCurrencyName = document.getElementById('currencyName');
    const getCurrentCurrency = document.getElementById('currentCurrency');

    // Získání uložených dat ze Local Storage
    const exchangeRateInfo = JSON.parse(localStorage.getItem('exchangeRateInfo'));

    function fetchExchangeRate(fromCurrency, toCurrency) {
        // Dotaz na API pro získání směnného kurzu.
        fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=Y10F3YZMEMIM7Q22`)
            .then(response => response.json())
            .then(data => {
                // Zpracování odpovědi a uložení směnného kurzu.
                const exchangeRate = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
                const exchangeRateInfo = {
                    fromCurrency,
                    toCurrency,
                    rate: exchangeRate
                };
                localStorage.setItem('exchangeRateInfo', JSON.stringify(exchangeRateInfo));
                // Aktualizace textu na stránce s novým směnným kurzem.
                getExchangeRate.textContent = `1 ${fromCurrency} = ${exchangeRate} ${toCurrency}`;
                // Uložení měn do lokálního úložiště.
                localStorage.setItem('fromCurrency', fromCurrency);
                localStorage.setItem('toCurrency', toCurrency);
                // Obnovení stránky pro aktualizaci informací.
                resetApp();
                stock();
                expenses();
                settings();
                darkMode();
            })
            .catch(error => {
                // Zpracování chyb při načítání dat.
                console.error('Error:', error);
                getExchangeRate.textContent = 'Error fetching data';
            });
    }

// Načtení aktuálního směnného kurzu a měn z lokálního úložiště.
    let fromCurrency = localStorage.getItem('fromCurrency');
    let toCurrency = localStorage.getItem('toCurrency');
    let exchangeRate = exchangeRateInfo.rate;

// Nastavení výchozích hodnot měn, pokud nejsou v lokálním úložišti.
    if (!fromCurrency) {
        fromCurrency = 'USD'; // Výchozí hodnota měny "from".
    }
    if (!toCurrency) {
        toCurrency = 'USD'; // Výchozí hodnota měny "to".
    }
    if (exchangeRate) {
        getExchangeRate.textContent = `1 ${fromCurrency} = ${exchangeRate} ${toCurrency}`;
    }

// Zobrazení aktuální měny na stránce.
    getCurrentCurrency.textContent = `Current Currency: ${toCurrency}`;

// Přidání události pro odeslání formuláře s nastavením měny.
    document.getElementById('settingsForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const newCurrencyNameInput = getCurrencyName.value.toUpperCase();

        // Pouze pokud nová měna se liší od té stávající, vyvoláme aktualizaci.
        if (newCurrencyNameInput !== currencyNameInput) {
            currencyNameInput = newCurrencyNameInput;
            // Spuštění funkce pro načtení a aktualizaci směnného kurzu.
            fetchExchangeRate(fromCurrency, currencyNameInput);
        }
        getCurrencyName.value = '';
    });

}
settings();