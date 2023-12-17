const api = `https://v6.exchangerate-api.com/v6/a85eb748d50975a2e1110f63/latest/USD`;

currencies = [
    "EUR",
    "CZK"
]

const firstDrop = document.getElementById("first");
const secondDrop = document.getElementById("second");

const lastFirstCurrency = localStorage.getItem("firstCurrency") || "EUR";
const lastSecondCurrency = localStorage.getItem("secondCurrency") || "CZK";

currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    firstDrop.add(option);
});

currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    secondDrop.add(option);
});

firstDrop.value = lastFirstCurrency;
secondDrop.value = lastSecondCurrency;

let convertCurrency = () => {
    const amount = document.querySelector("#amount").value;
    const firstCurrency = firstDrop.value;
    const secondCurrency = secondDrop.value;

    if (parseFloat(amount) > 0) {
        fetch(api)
            .then((resp) => resp.json())
            .then((data) => {
                let fromExchangeRate = data.conversion_rates[firstCurrency];
                let toExchangeRate = data.conversion_rates[secondCurrency];
                const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
                message.innerHTML = `${amount} ${firstCurrency} = ${convertedAmount.toFixed(
                    2
                )} ${secondCurrency}`;

                localStorage.setItem("firstCurrency", firstCurrency);
                localStorage.setItem("secondCurrency", secondCurrency);
            });
    } else {
        alert("Conversion of zero and negative numbers is not allowed. Please fill in the correct amount.");
    }
};

document.querySelector("#button").addEventListener("click", convertCurrency);
window.addEventListener("load", convertCurrency);