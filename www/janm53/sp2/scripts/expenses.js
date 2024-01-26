function expenses(){
    // Inicializace proměnných pro celkové výdaje, měnu a směnný kurz.
    let totalExpenses = 0;
    let currency = 'USD';
    let exchangeRate = 1.00;

    function updateExchangeRateInfo(){
        // Načte informace o směnném kurzu z lokálního úložiště, pokud jsou dostupné.
        const storedExchangeRateInfo = localStorage.getItem('exchangeRateInfo');
        if (storedExchangeRateInfo) {
            const exchangeRateInfo = JSON.parse(storedExchangeRateInfo);
            currency = exchangeRateInfo.toCurrency;
            exchangeRate = exchangeRateInfo.rate;
        }
    }

    updateExchangeRateInfo();

        // Načte data o výdajích z lokálního úložiště.
        let storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];

        // Inicializuje graf pro finanční dashboard.
        let financeChartCtx = document.getElementById('financeChart').getContext('2d');
        // noinspection JSUnresolvedReference
        let financeChart = new Chart(financeChartCtx, {
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
                    x: {
                        ticks: {
                            color: 'rgba(255, 99, 132, 1)'
                        }
                    },
                    y: {
                        ticks: {
                            color: 'rgb(101,173,255)'
                        },
                        beginAtZero: true
                    }
                }
            }
        });

        // Funkce pro konverzi částky podle směnného kurzu.
        function convertedExchangeRate(ammount, exchangeRate){
            // noinspection EqualityComparisonWithCoercionJS
            if(exchangeRate == 1.00){
                return ammount;
            }
            else if (exchangeRate > 1){
                return ammount / exchangeRate;
            }
            else {
                return ammount * exchangeRate
            }
        }

        // Přidává výdaje do seznamu a aktualizuje graf.
        function addExpenseToListAndChart(name, amount) {
            let listItem = document.createElement('li');
            listItem.textContent = name + ': ' + amount.toFixed(2) + ` ${currency}`;

            // Najděte první prvek v seznamu (nebo použijte .querySelector, aby se zajistilo, že zde je nějaký prvek)
            let firstListItem = document.getElementById('transactionList').firstChild;

            // Vložte novou položku před první položku v seznamu
            document.getElementById('transactionList').insertBefore(listItem, firstListItem);

            financeChart.data.labels.push(name);
            financeChart.data.datasets[0].data.push(totalExpenses);
            financeChart.update();
        }



        // Sekvenčně přidává výdaje z uložených dat.
        function addExpensesSequentially(index = 0) {
            if (index < storedExpenses.length) {
                let expense = storedExpenses[index];
                totalExpenses += expense.amount * exchangeRate;
                addExpenseToListAndChart(expense.name, expense.amount * exchangeRate);
                addExpensesSequentially(index + 1);
            }
        }

        // Volá funkci pro sekvenční přidávání výdajů.
        addExpensesSequentially();

        // Přidává nové výdaje po odeslání formuláře a aktualizuje graf a uložená data.
        document.getElementById('transactionForm').addEventListener('submit', function(event) {
            event.preventDefault();
            let expenseName = document.getElementById('expenseName').value;
            let expenseAmount = parseFloat(document.getElementById('expenseAmount').value);
            expenseAmount -= 2*expenseAmount;

            let convertedExpenseAmount = convertedExchangeRate(expenseAmount, exchangeRate);

            totalExpenses += expenseAmount;
            storedExpenses.push({ name: expenseName, amount: convertedExpenseAmount });
            localStorage.setItem('expenses', JSON.stringify(storedExpenses));

            addExpenseToListAndChart(expenseName, expenseAmount);

            // Vymazat hodnoty z input boxů
            document.getElementById('expenseName').value = '';
            document.getElementById('expenseAmount').value = '';
        });

        // Přidává nové příjmy po odeslání formuláře a aktualizuje graf a uložená data.
        document.getElementById('transactionIncomeForm').addEventListener('submit', function(event) {
            event.preventDefault();
            let incomeName = document.getElementById('incomeName').value;
            let incomeAmount = parseFloat(document.getElementById('incomeAmount').value);
            let convertedIncomeAmount = convertedExchangeRate(incomeAmount, exchangeRate);

            totalExpenses += incomeAmount;
            storedExpenses.push({ name: incomeName, amount: convertedIncomeAmount });
            localStorage.setItem('expenses', JSON.stringify(storedExpenses));

            addExpenseToListAndChart(incomeName, incomeAmount);

            // Vymazat hodnoty z input boxů
            document.getElementById('incomeName').value = '';
            document.getElementById('incomeAmount').value = '';
        });

}
expenses();