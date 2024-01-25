// App.js
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import CurrencyRow from "./CurrencyRow";
import HistoricalConverter from "./HistoricalConverter";
import Freecurrencyapi from "@everapi/freecurrencyapi-js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [leftCurrency, setLeftCurrency] = useState();
  const [rightCurrency, setRightCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInLeftCurrency, setAmountInLeftCurrency] = useState(true);

  const freecurrencyapi = new Freecurrencyapi(
    "fca_live_YqrONtuLxvqfBKMpc46gBDXNldaqh3RfbeZoLRtM"
  );

  let toAmount, fromAmount;
  if (amountInLeftCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    freecurrencyapi
      .currencies()
      .then((response) => {
        setCurrencyOptions(Object.keys(response.data));
        setLeftCurrency(Object.keys(response.data)[0]);
        setRightCurrency(Object.keys(response.data)[1]);
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  }, []);

  useEffect(() => {
    if (leftCurrency != null && rightCurrency != null) {
      freecurrencyapi
        .latest({
          base_currency: leftCurrency,
          currencies: rightCurrency,
        })
        .then((response) => {
          setExchangeRate(response.data[Object.keys(response.data)[0]]);
        })
        .catch((error) => {
          console.log(error);
          throw new Error(error);
        });
    }
  }, [leftCurrency, rightCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInLeftCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInLeftCurrency(false);
  }

  return (
    <Container className="app-container">
      <h1>Currency Converter</h1>
      <Row className="currency-row">
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={leftCurrency}
          onChangeCurrency={(e) => setLeftCurrency(e.target.value)}
          amount={fromAmount}
          onChangeAmount={handleFromAmountChange}
        />
        <div className="equals">=</div>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={rightCurrency}
          onChangeCurrency={(e) => setRightCurrency(e.target.value)}
          amount={toAmount}
          onChangeAmount={handleToAmountChange}
        />
      </Row>
      <div className="exchange-rate">
        Exchange Rate: {exchangeRate ? exchangeRate.toFixed(4) : ""}
      </div>
      <HistoricalConverter />
    </Container>
  );
}

export { App };
