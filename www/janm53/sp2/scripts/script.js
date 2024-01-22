var totalStockValue = 0;
var totalExpenses = 0;
var stockData = []; // Initialize an array to store stock data

document.addEventListener('DOMContentLoaded', function() {
    // Load data from localStorage for Expenses
    var storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    // Load stock data from localStorage
    stockData = JSON.parse(localStorage.getItem('stockData')) || [];

    // Initialize the Chart for Finance Dashboard
    var financeChartCtx = document.getElementById('financeChart').getContext('2d');
    var financeChart = new Chart(financeChartCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Monthly Expenses',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Initialize the Chart for Stock Dashboard
    var stockChartCtx = document.getElementById('stockChart').getContext('2d');
    var stockChart = new Chart(stockChartCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Stock Value',
                data: [],
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Load and display previous stock data
    loadAndDisplayPreviousStockData();

    function loadAndDisplayPreviousStockData() {
        stockData.forEach(function(stock) {
            addStockDataToListAndChart(stock.name, stock.shares, stock.openPrice);
        });
    }

    function addExpenseToListAndChart(name, amount) {
        var listItem = document.createElement('li');
        listItem.textContent = name + ': ' + amount.toFixed(2) + 'Kč';
        document.getElementById('transactionList').appendChild(listItem);

        financeChart.data.labels.push(name);
        financeChart.data.datasets[0].data.push(totalExpenses);
        financeChart.update();
    }

    function addExpensesSequentially(index = 0) {
        if (index < storedExpenses.length) {
            var expense = storedExpenses[index];
            totalExpenses += expense.amount;
            addExpenseToListAndChart(expense.name, expense.amount);
            setTimeout(() => addExpensesSequentially(index + 1), 100);
        }
    }

    addExpensesSequentially();

    document.getElementById('transactionForm').addEventListener('submit', function(event) {
        event.preventDefault();
        var expenseName = document.getElementById('expenseName').value;
        var expenseAmount = parseFloat(document.getElementById('expenseAmount').value);

        totalExpenses += expenseAmount;
        storedExpenses.push({ name: expenseName, amount: expenseAmount });
        localStorage.setItem('expenses', JSON.stringify(storedExpenses));

        addExpenseToListAndChart(expenseName, expenseAmount);
    });

    document.getElementById('stockForm').addEventListener('submit', function(event) {
        event.preventDefault();
        var stockName = document.getElementById('stockSymbol').value;
        var stockShares = parseFloat(document.getElementById('stockShares').value);

        var currentDate = new Date();
        while (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
            currentDate.setDate(currentDate.getDate() - 1);
        }

        var lastTradingDay = currentDate.toISOString().slice(0, 10);

        const apiKey = 'yfUHNJHMGIHmxuAkSr116dBNp8jFfNU0';
        let apiUrl = `https://api.polygon.io/v1/open-close/${stockName}/${lastTradingDay}?adjusted=true&apiKey=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'OK') {
                    var openPrice = data.open;
                    addStockDataToListAndChart(stockName, stockShares, openPrice);

                    // Store stock data in memory
                    stockData.push({
                        name: stockName,
                        shares: stockShares,
                        openPrice: openPrice
                    });

                    // Save stockData to localStorage
                    localStorage.setItem('stockData', JSON.stringify(stockData));
                } else {
                    console.error('API request failed.');
                }
            })
            .catch(error => {
                console.error('An error occurred:', error);
            });
    });

    function addStockDataToListAndChart(name, shares, openPrice) {
        // Calculate the total value of the current stock purchase
        var currentTotalValue = openPrice * shares;

        // Add the current total value to the totalStockValue
        totalStockValue += currentTotalValue;

        // Create a new list item with the current total value
        var listItem = document.createElement('li');
        listItem.textContent = name + ' - Shares: ' + shares + ' - Open Price: ' + openPrice.toFixed(2) + ' USD - Total Value: ' + currentTotalValue.toFixed(2) + ' USD';

        // Append the list item to the stockList
        document.getElementById('stockList').appendChild(listItem);

        // Update the stockChart with the new total value
        stockChart.data.labels.push(name);
        stockChart.data.datasets[0].data.push(totalStockValue);
        stockChart.update();
    }
});
