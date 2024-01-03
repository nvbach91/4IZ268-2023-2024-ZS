$(document).ready(function () {
    // URL for the API
    const api = `https://v6.exchangerate-api.com/v6/a85eb748d50975a2e1110f63/latest/USD`;

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

    // This iteration adds all values from the 'currencies' array to the 'first' and 'second' dropdowns
    $.each(currencies, function (index, currency) {
        $('#first').append(new Option(currency, currency));
        $('#second').append(new Option(currency, currency));
    });

    // Variables to store the options that were removed from each dropdown
    let removedOptionFirst = null;
    let removedOptionSecond = null;

    // Attach an event handler to the 'change' event on the '#first' dropdown
    $('#first').on('change', function () {
        // Get the value of the selected option
        let selectedOption = $(this).val();

        // If an option was previously removed from the '#second' dropdown, append it back
        if (removedOptionSecond) {
            $('#second').append(removedOptionSecond);
            removedOptionSecond = null;
        }

        // Store the option in the '#second' dropdown that matches the selected option in the '#first' dropdown
        // This option will be removed from the '#second' dropdown to prevent the user from selecting the same currency in both dropdowns
        removedOptionSecond = $('#second option[value="' + selectedOption + '"]').detach();
    });

    // Attach an event handler to the 'change' event on the '#second' dropdown
    $('#second').on('change', function () {
        // Get the value of the selected option
        let selectedOption = $(this).val();

        // If an option was previously removed from the '#first' dropdown, append it back
        if (removedOptionFirst) {
            $('#first').append(removedOptionFirst);
            removedOptionFirst = null;
        }

        // Store the option in the '#first' dropdown that matches the selected option in the '#second' dropdown
        // This option will be removed from the '#first' dropdown to prevent the user from selecting the same currency in both dropdowns
        removedOptionFirst = $('#first option[value="' + selectedOption + '"]').detach();
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

    // Asynchronous function for currency conversion
    let convertCurrency = async () => {
        // Get the amount to convert from the '#amount' input field
        let amount = $('#amount').val();
        // Get the currency to convert from from the '#first' dropdown
        let firstCurrency = $('#first').val();
        // Get the currency to convert to from the '#second' dropdown
        let secondCurrency = $('#second').val();

        // If the amount is greater than 0, proceed with the conversion
        if (parseFloat(amount) > 0) {
            // Clear the '#messageBox' div
            $('#messageBox').html('');
            // Show the loader
            $('#loader').show();

            try {
                // Fetch the conversion rates from the API
                let data = await $.ajax({ url: api, type: 'GET' });

                // Get the exchange rate for the 'from' currency
                let fromExchangeRate = data.conversion_rates[firstCurrency];
                // Get the exchange rate for the 'to' currency
                let toExchangeRate = data.conversion_rates[secondCurrency];
                // Calculate the converted amount
                let convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
                // Display the converted amount in the '#messageBox' div
                $('#messageBox').html(`${amount} ${firstCurrency} = ${convertedAmount.toFixed(2)} ${secondCurrency}`);

                // Store the 'from' and 'to' currencies in local storage
                localStorage.setItem('firstCurrency', firstCurrency);
                localStorage.setItem('secondCurrency', secondCurrency);
            } catch (error) {
                // If an error occurs, log it to the console and display an error message in the '#messageBox' div
                console.error('Error:', error);
                $('#messageBox').text('An error occurred while fetching data. Please try again.');
            } finally {
                // Hide the loader
                $('#loader').hide();
            }
        }
    };

    // Attach the 'convertCurrency' function to the 'click' event of the '#button' button
    $('#button').click(convertCurrency);
});