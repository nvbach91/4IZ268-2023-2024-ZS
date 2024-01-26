// ExchangeRateCalculator.js
// ExchangeRateCalculator.js
import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Freecurrencyapi from "@everapi/freecurrencyapi-js";
import CurrencyRow from "./CurrencyRow";

function ExchangeRateCalculator() {
  const [baseCurrency, setBaseCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [exchangeRate, setExchangeRate] = useState(null);

  const freecurrencyapi = new Freecurrencyapi(
    "fca_live_YqrONtuLxvqfBKMpc46gBDXNldaqh3RfbeZoLRtM"
  );

  const handleConvert = async () => {
    if (baseCurrency && targetCurrency && year && month && day) {
      try {
        const response = await freecurrencyapi.history({
          base_currency: baseCurrency,
          target_currency: targetCurrency,
          year: parseInt(year),
          month: parseInt(month),
          day: parseInt(day),
        });
        const rate = response.data.conversion_rates[targetCurrency];
        setExchangeRate(rate);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Container>
      {/* ... (unchanged code) */}
    </Container>
  );
}

export default ExchangeRateCalculator;
