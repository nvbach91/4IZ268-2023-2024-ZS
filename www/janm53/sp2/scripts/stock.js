// Inicializace proměnných pro ukládání dat o akciích a jejich celkové hodnotě.
let stockData = [];
let totalStockValue = 0;

// Spuštění kódu po načtení obsahu dokumentu.
document.addEventListener('DOMContentLoaded', function() {
    // Načtení dat o akciích z lokálního úložiště.
    stockData = JSON.parse(localStorage.getItem('stockData')) || [];

    // Inicializace grafu pro dashboard akcií.
    let stockChartCtx = document.getElementById('stockChart').getContext('2d');
    let stockChart = new Chart(stockChartCtx, {
        type: 'line', // Typ grafu: čárový.
        data: {
            labels: [], // Popisky pro osu X.
            datasets: [{
                label: 'Stock Value', // Popisek datasetu.
                data: [], // Data pro graf.
                backgroundColor: 'rgba(0, 123, 255, 0.2)', // Barva pozadí.
                borderColor: 'rgba(0, 123, 255, 1)', // Barva obrysu.
                borderWidth: 1 // Šířka obrysu.
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        color: 'rgba(0, 123, 255, 1)' // Barva popisků na ose X.
                    }
                },
                y: {
                    ticks: {
                        color: 'rgba(255, 99, 132, 1)', // Barva popisků na ose Y.
                    },
                    beginAtZero: true // Začínat na ose Y od nuly.
                }
            }
        }
    });

    // Načtení a zobrazení předchozích dat o akciích.
    loadAndDisplayPreviousStockData();

    // Přidání události odeslání formuláře pro přidání nové akcie.
    document.getElementById('stockForm').addEventListener('submit', function(event) {
        event.preventDefault();
        // Získání údajů o akciích z formuláře.
        let stockName = document.getElementById('stockSymbol').value;
        let stockShares = parseFloat(document.getElementById('stockShares').value);

        // Výpočet posledního obchodního dne.
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 1);
        while (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
            currentDate.setDate(currentDate.getDate() - 1);
        }
        let lastTradingDay = currentDate.toISOString().slice(0, 10);

        // Dotaz na API pro získání dat o akciích.
        const apiKey = 'yfUHNJHMGIHmxuAkSr116dBNp8jFfNU0';
        let apiUrl = `https://api.polygon.io/v1/open-close/${stockName}/${lastTradingDay}?adjusted=true&apiKey=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Zpracování odpovědi a přidání akcie.
                if (data.status === 'OK') {
                    let openPrice = data.open;
                    addStockDataToListAndChart(stockName, stockShares, openPrice);
                    // Ukládání dat o akciích do paměti a lokálního úložiště.
                    stockData.push({
                        name: stockName,
                        shares: stockShares,
                        openPrice: openPrice
                    });
                    localStorage.setItem('stockData', JSON.stringify(stockData));
                } else {
                    console.error('API request failed.');
                }
            })
            .catch(error => {
                console.error('An error occurred:', error);
            });
    });

    // Funkce pro načtení a zobrazení předchozích dat o akciích.
    function loadAndDisplayPreviousStockData() {
        stockData.forEach((stock) => {
            addStockDataToListAndChart(stock.name, stock.shares, stock.openPrice);
        });
    }

    // Funkce pro přidání dat o akciích do seznamu a grafu.
    function addStockDataToListAndChart(name, shares, openPrice) {
        // Zpracování směnného kurzu.
        let currency = 'USD';
        let exchangeRate = 1.00;
        const storedExchangeRateInfo = localStorage.getItem('exchangeRateInfo');
        if (storedExchangeRateInfo) {
            const exchangeRateInfo = JSON.parse(storedExchangeRateInfo);
            currency = exchangeRateInfo.toCurrency;
            exchangeRate = exchangeRateInfo.rate;
        }

        openPrice = openPrice * exchangeRate;
        // Výpočet celkové hodnoty akcií.
        let currentTotalValue = openPrice * shares;
        totalStockValue += currentTotalValue;
        // Přidání informací o akciích do seznamu a aktualizace grafu.
        let listItem = document.createElement('li');
        listItem.textContent = name + ' - Shares: ' + shares + ' - Open Price: ' + openPrice.toFixed(2) + ` ${currency} - Total Value: ` + currentTotalValue.toFixed(2) + ` ${currency}`;
        document.getElementById('stockList').appendChild(listItem);
        stockChart.data.labels.push(name);
        stockChart.data.datasets[0].data.push(totalStockValue);
        stockChart.update();
    }
});
