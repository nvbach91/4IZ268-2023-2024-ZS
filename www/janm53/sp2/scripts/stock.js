function stock(){
    let stockData = [];
    let totalStockValue = 0;


        // Load stock data from localStorage
        stockData = JSON.parse(localStorage.getItem('stockData')) || [];

        // Initialize the Chart for Stock Dashboard
        let stockChartCtx = document.getElementById('stockChart').getContext('2d');
        // noinspection JSUnresolvedReference
        let stockChart = new Chart(stockChartCtx, {
            type: 'line',
            data: {
                labels: [], // Toto pole by mělo obsahovat data v opačném pořadí (od nejnovějších po nejstarší)
                datasets: [{
                    label: 'Stock Value',
                    data: [], // Toto pole by mělo obsahovat data v opačném pořadí (od nejnovějších po nejstarší)
                    backgroundColor: 'rgba(0, 123, 255, 0.2)',
                    borderColor: 'rgb(101,173,255)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: {
                        ticks: {
                            color: 'rgb(101,173,255)'
                        },
                        reverse: true // Nastavíme opačné pořadí na ose x
                    },
                    y: {
                        ticks: {
                            color: 'rgba(255, 99, 132, 1)'
                        },
                        beginAtZero: true
                    }
                }
            }
        });

        // Load and display previous stock data
        loadAndDisplayPreviousStockData();

        document.getElementById('stockForm').addEventListener('submit', function(event) {
            event.preventDefault();

            // Získat referenci na tlačítko
            let submitButton = document.getElementById('submitButton'); // Předpokládá, že máte tlačítko s ID 'submitButton'

            // Zobrazit loading animaci
            submitButton.innerHTML = '<div class="loader"></div>'; // Vložit div s třídou 'loader' do tlačítka

            let stockName = document.getElementById('stockSymbol').value;
            let stockShares = parseFloat(document.getElementById('stockShares').value);

            let currentDate = new Date();
            currentDate.setDate(currentDate.getDate() - 1);
            while (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
                currentDate.setDate(currentDate.getDate() - 1);
            }

            let lastTradingDay = currentDate.toISOString().slice(0, 10);

            const apiKey = 'yfUHNJHMGIHmxuAkSr116dBNp8jFfNU0';
            let apiUrl = `https://api.polygon.io/v1/open-close/${stockName}/${lastTradingDay}?adjusted=true&apiKey=${apiKey}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'OK') {
                        let openPrice = data.open;
                        addStockDataToListAndChart(stockName, stockShares, openPrice);

                        stockData.push({
                            name: stockName,
                            shares: stockShares,
                            openPrice: openPrice
                        });

                        localStorage.setItem('stockData', JSON.stringify(stockData));
                    } else {
                        console.error('API request failed.');
                    }

                    // Skrýt loading animaci a vrátit původní text tlačítka
                    submitButton.innerHTML = 'Add Stock';
                })
                .catch(error => {
                    console.error('An error occurred:', error);
                    // Skrýt loading animaci a vrátit původní text tlačítka v případě chyby
                    submitButton.innerHTML = 'Add Stock';
                });

            document.getElementById('stockSymbol').value = '';
            document.getElementById('stockShares').value = '';
        });

        function loadAndDisplayPreviousStockData() {
            stockData.forEach((stock)=> {
                addStockDataToListAndChart(stock.name, stock.shares, stock.openPrice);
            });
        }

        function addStockDataToListAndChart(name, shares, openPrice) {
            let currency = 'USD';
            let exchangeRate = 1.00;

            const storedExchangeRateInfo = localStorage.getItem('exchangeRateInfo');
            if (storedExchangeRateInfo) {
                const exchangeRateInfo = JSON.parse(storedExchangeRateInfo);
                currency = exchangeRateInfo.toCurrency;
                exchangeRate = exchangeRateInfo.rate;
            }

            openPrice = openPrice * exchangeRate;
            // Calculate the total value of the current stock purchase
            let currentTotalValue = openPrice * shares;

            // Add the current total value to the totalStockValue
            totalStockValue += currentTotalValue;

            // Create a new list item with the current total value
            let listItem = document.createElement('li');
            listItem.textContent = name + ' - Shares: ' + shares + ' - Open Price: ' + openPrice.toFixed(2) + ` ${currency} - Total Value: ` + currentTotalValue.toFixed(2) + ` ${currency}`;

            // Najděte první prvek v seznamu (nebo použijte .querySelector, aby se zajistilo, že zde je nějaký prvek)
            let firstListItem = document.getElementById('stockList').firstChild;

            // Vložte novou položku před první položku v seznamu
            document.getElementById('stockList').insertBefore(listItem, firstListItem);

            // Přidejte název na začátek pole labelů pro graf
            stockChart.data.labels.unshift(name);

            // Přidejte hodnotu na začátek pole dat pro graf
            stockChart.data.datasets[0].data.unshift(totalStockValue);

            // Aktualizujte graf
            stockChart.update();
        }
}
stock();