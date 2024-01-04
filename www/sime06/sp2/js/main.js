$(document).ready(function () {
    // An array of available currencies
    let currencies = [
        'USD',
        'EUR',
        'JPY',
        'GBP',
        'CNY',
        'AUD',
        'CAD',
        'CHF',
        'HKD',
        'NZD',
        'CZK'
    ];

    // Retrieve the last selected currencies from localStorage, or default to 'EUR' and 'USD'
    let lastFirstCurrency = localStorage.getItem('firstCurrency') || 'EUR';
    let lastSecondCurrency = localStorage.getItem('secondCurrency') || 'USD';

    // Retrieve the conversion history from localStorage, or initialize it to an empty array
    let conversionHistory = JSON.parse(localStorage.getItem('conversionHistory')) || [];

    // This iteration adds all values from the 'currencies' array to the 'first' and 'second' dropdowns
    $.each(currencies, function (index, currency) {
        $('#first').append(new Option(currency, currency));
        $('#second').append(new Option(currency, currency));
    });

    // Variables to store the options that were disabled in each dropdown
    let disabledOptionFirst = null;
    let disabledOptionSecond = null;

    // Attach an event handler to the 'change' event on the '#first' dropdown
    $('#first').on('change', function () {
        // Get the value of the selected option
        let selectedOption = $(this).val();

        // If an option was previously disabled in the '#second' dropdown, enable it
        if (disabledOptionSecond) {
            $('#second option[value="' + disabledOptionSecond + '"]').prop('disabled', false);
            disabledOptionSecond = null;
        }

        // Store the value of the option in the '#second' dropdown that matches the selected option in the '#first' dropdown
        // This option will be disabled in the '#second' dropdown to prevent the user from selecting the same currency in both dropdowns
        disabledOptionSecond = selectedOption;
        $('#second option[value="' + selectedOption + '"]').prop('disabled', true);
    });

    // Attach an event handler to the 'change' event on the '#second' dropdown
    $('#second').on('change', function () {
        // Get the value of the selected option
        let selectedOption = $(this).val();

        // If an option was previously disabled in the '#first' dropdown, enable it
        if (disabledOptionFirst) {
            $('#first option[value="' + disabledOptionFirst + '"]').prop('disabled', false);
            disabledOptionFirst = null;
        }

        // Store the value of the option in the '#first' dropdown that matches the selected option in the '#second' dropdown
        // This option will be disabled in the '#first' dropdown to prevent the user from selecting the same currency in both dropdowns
        disabledOptionFirst = selectedOption;
        $('#first option[value="' + selectedOption + '"]').prop('disabled', true);
    });

    // Set the value of the 'first' and 'second' dropdowns to the last selected currencies
    $('#first').val(lastFirstCurrency);
    $('#second').val(lastSecondCurrency);

    // Trigger the 'change' event for both dropdowns to remove the selected options from the other dropdowns when the page loads
    $('#first').trigger('change');
    $('#second').trigger('change');

    // Attach an event handler to the 'keydown' event on the '#amount' input field
    $('#amount').on('keydown', function (e) {
        // If the key pressed is '-' or ',', prevent the keydown event
        // This effectively prevents the user from entering '-' or ',' into the input field
        if (e.key === '-' || e.key === ',') {
            e.preventDefault();
        }
    });

    // Attach an event handler to the 'paste' event on the '#amount' input field
    $('#amount').on('paste', function (e) {
        // Get the data from the clipboard
        let pastedData = e.originalEvent.clipboardData.getData('text');
        // If the pasted data includes '-' or ',', prevent the paste event
        // This effectively prevents the user from pasting '-' or ',' into the input field
        if (pastedData.includes('-') || pastedData.includes(',')) {
            e.preventDefault();
        }
    });

    // Attach an event handler to the 'drop' event on the '#amount' input field
    $('#amount').on('drop', function (e) {
        // Get the data from the drag operation
        let droppedData = e.originalEvent.dataTransfer.getData('text');
        // If the dropped data includes '-' or ',', prevent the drop event
        // This effectively prevents the user from dropping text that includes '-' or ',' into the input field
        if (droppedData.includes('-') || droppedData.includes(',')) {
            e.preventDefault();
        }
    });

    // Set the 'autocomplete' attribute of the '#amount' input field to 'off'
    $('#amount').attr('autocomplete', 'off');

    $('#amount').on('focusout', function () {
        let firstCurrentValue = $(this).val(); // Get the current value of the input field

        // If the value starts with '.', remove the entire value
        // If the value is a decimal number with unnecessary '0's at the start, replace them with a single one
        // If the value is an integer with unnecessary '0's at the start, remove them
        // If the value is a float number with unnecessary '0's at the end, remove them
        if (firstCurrentValue.startsWith('.')) {
            $(this).val('');
        } else if (/^0+\d*\./.test(firstCurrentValue)) {
            $(this).val(parseFloat(firstCurrentValue).toString());
        } else if (/^0+\d+$/.test(firstCurrentValue)) {
            $(this).val(parseInt(firstCurrentValue, 10));
        } else if (/\.\d+0+$/.test(firstCurrentValue)) {
            $(this).val(parseFloat(firstCurrentValue).toString());
        }

        // Convert the value to a number
        let secondCurrentValue = parseFloat($(this).val());

        // If the value is not a number or is less than or equal to 0, remove the entire value
        if (isNaN(secondCurrentValue) || secondCurrentValue <= 0) {
            $(this).val('');
        }
    });

    // Define the asynchronous function convertCurrency
    let convertCurrency = async () => {
        // Get the values from the input field and the two select fields
        let amount = $('#amount').val();
        let firstCurrency = $('#first').val();
        let secondCurrency = $('#second').val();

        // Construct the API URL using the first currency
        const api = `https://v6.exchangerate-api.com/v6/a85eb748d50975a2e1110f63/latest/${firstCurrency}`;

        // Get the current date and format it as YYYY-MM-DD
        let currentDate = new Date();
        // Convert the date to ISO format and split it at the 'T' character to get the date part
        let formattedDate = currentDate.toISOString().split('T')[0];

        // Check if the entered amount is greater than 0
        if (parseFloat(amount) > 0) {
            // Clear the message box and show the loader
            $('#messageBox').html('');
            $('#loader').show();

            // Try to fetch the conversion rates from the API, catch any errors that occur -> move to 'catch' block
            try {
                // AJAX request to the API, two properties are set: url and type, await = request either fullfilled or rejected
                let data = await $.ajax({ url: api, type: 'GET' });

                // Get the exchange rate for the second currency from the API response
                let toExchangeRate = data.conversion_rates[secondCurrency];
                // Calculate the converted amount by multiplying the amount by the exchange rate
                let convertedAmount = amount * toExchangeRate;

                // Selector, content of innerHTML, display the converted amount and the exchange rate
                $('#messageBox').html(`${amount} ${firstCurrency} = ${convertedAmount.toFixed(2)} ${secondCurrency}<br>(Exchange rate valid on ${formattedDate})`);

                // Create a new object to hold the conversion history entry
                let newEntry = {
                    date: formattedDate,
                    amount: amount,
                    fromCurrency: firstCurrency,
                    toCurrency: secondCurrency,
                    convertedAmount: convertedAmount.toFixed(2)
                };

                // Get the date one year ago
                let oneYearAgo = new Date();
                // Calculate the date one year ago by subtracting 365 days from the current date
                oneYearAgo.setDate(oneYearAgo.getDate() - 365);
                // Convert the date to ISO format and split it at the 'T' character to get the date part in string
                let oneYearAgoFormatted = oneYearAgo.toISOString().split('T')[0];
                // Remove entries from the conversion history that are older than one year
                // Takes an entry and checks if the date is greater than or equal to one year ago
                conversionHistory = conversionHistory.filter(entry => entry.date >= oneYearAgoFormatted);

                // Add the new entry to the conversion history array
                conversionHistory.push(newEntry);

                // Store the conversion history and the last selected currencies in local storage
                // JSON.stringify = convert a JavaScript object to a JSON string
                localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory));
                localStorage.setItem('firstCurrency', firstCurrency);
                localStorage.setItem('secondCurrency', secondCurrency);

            } catch (error) {
                // If an error occurs during the API request, log the error and display an error message
                console.error('Error:', error);
                // To not repeatedly select the same element, store it in a variable
                let messageBox = $('#messageBox');
                messageBox.text('An error occurred while fetching data. Please try again.');
            } finally {
                // Hide the loader
                $('#loader').hide();
            }
        }
    }
    $('#button').click(convertCurrency);

    let showConversionHistory = () => {
        // Retrieve the array of conversion history entries from localStorage, or initialize it to an empty array
        // Parse the JSON string to convert it to a JavaScript object
        let conversionHistory = JSON.parse(localStorage.getItem('conversionHistory')) || [];

        // Sort the history by date in ascending order
        // This subtracts the date of the first entry from the date of the second entry, less than 0 = first entry is older than second entry
        conversionHistory.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Create a string to hold the HTML for the history
        let historyHtml = '';

        // Loop through the history for each entry
        for (let entry of conversionHistory) {
            // Add an HTML string for each entry to the historyHtml string
            historyHtml += `<p>${entry.date}: ${entry.amount} ${entry.fromCurrency} = ${entry.convertedAmount} ${entry.toCurrency}</p>`;
        }

        // Display the history on the page
        $('#historyBox').html(historyHtml);
    }

    // Attach the showConversionHistory function to a button click event
    $('#historyButton').click(showConversionHistory);
});