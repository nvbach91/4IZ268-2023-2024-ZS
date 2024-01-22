var totalExpenses = 0;

document.addEventListener('DOMContentLoaded', function() {
    // Load data from localStorage for Expenses
    var storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];

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
});
