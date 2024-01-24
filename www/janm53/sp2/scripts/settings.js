// Funkce pro načtení směnného kurzu z API a uložení do lokálního úložiště.
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
            document.getElementById('exchangeRate').textContent = `1 ${fromCurrency} = ${exchangeRate} ${toCurrency}`;
            // Uložení měn do lokálního úložiště.
            localStorage.setItem('fromCurrency', fromCurrency);
            localStorage.setItem('toCurrency', toCurrency);
            // Obnovení stránky pro aktualizaci informací.
            window.location.reload();
        })
        .catch(error => {
            // Zpracování chyb při načítání dat.
            console.error('Error:', error);
            document.getElementById('exchangeRate').textContent = 'Error fetching data';
        });
}

// Načtení aktuálního směnného kurzu a měn z lokálního úložiště.
let fromCurrency = localStorage.getItem('fromCurrency');
let toCurrency = localStorage.getItem('toCurrency');

// Nastavení výchozích hodnot měn, pokud nejsou v lokálním úložišti.
if (!fromCurrency) {
    fromCurrency = 'USD'; // Výchozí hodnota měny "from".
}
if (!toCurrency) {
    toCurrency = 'USD'; // Výchozí hodnota měny "to".
}
if (exchangeRate) {
    document.getElementById('exchangeRate').textContent = `1 ${fromCurrency} = ${exchangeRate} ${toCurrency}`;
}

// Zobrazení aktuální měny na stránce.
document.getElementById('currentCurrency').textContent = `Current Currency: ${toCurrency}`;

// Přidání události pro odeslání formuláře s nastavením měny.
document.getElementById('settingsForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const currencyNameInput = document.getElementById('currencyName');
    let toCurrency = currencyNameInput.value.toUpperCase();
    // Spuštění funkce pro načtení a aktualizaci směnného kurzu.
    fetchExchangeRate(fromCurrency, toCurrency);
});
