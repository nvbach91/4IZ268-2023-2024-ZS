function resetApp() {
    const contentDiv = document.getElementById('content');

    let obsah = `<div class="flex-container">
    <div id="stockDashboard">
        <h2>Stock Dashboard</h2>
        <canvas id="stockChart"></canvas>
    </div>
    <div id="financeDashboard">
        <h2>Finance Dashboard</h2>
        <canvas id="financeChart"></canvas>
    </div>
</div>

<div class="flex-container">
    <div id="investments">
        <h2>Investments</h2>
        <form id="stockForm">
            <label for="stockSymbol"></label><input type="text" id="stockSymbol"
                                                    placeholder="Stock Symbol (e.g., AAPL)">
            <label for="stockShares"></label><input type="number" id="stockShares" placeholder="Number of Shares">
            <button id="submitButton" type="submit">Add Stock</button>
        </form>
        <ul id="stockList"></ul>
    </div>
    <div id="transactions">
        <h2>Transactions</h2>
        <form id="transactionForm">
            <label for="expenseName"></label><input type="text" id="expenseName" placeholder="Expense Name">
            <label for="expenseAmount"></label><input type="number" id="expenseAmount" placeholder="Amount">
            <button type="submit">Add Expense</button>
        </form>
        <form id="transactionIncomeForm">
            <label for="incomeName"></label><input type="text" id="incomeName" placeholder="Income Name">
            <label for="incomeAmount"></label><input type="number" id="incomeAmount" placeholder="Amount">
            <button type="submit">Add Income</button>
        </form>
        <ul id="transactionList"></ul>
        <ul id="incomeList"></ul>
    </div>
</div>

<div class="flex-container">
    <div id="settings">
        <h2>Settings</h2>
        <p id="currentCurrency"></p>
        <form id="settingsForm">
            <label for="currencyName"></label><input type="text" id="currencyName" placeholder="Currency Name">
            <button type="submit">Change Currency</button>
        </form>
        <h2>Exchange Rate:</h2>
        <p id="exchangeRate"></p>
        <button id="toggleDarkMode">Toggle Dark Mode</button>
    </div>

</div>`;

    contentDiv.innerHTML = obsah;
}

resetApp();