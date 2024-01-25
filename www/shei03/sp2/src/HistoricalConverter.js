import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Freecurrencyapi from "@everapi/freecurrencyapi-js";

function HistoricalConverter() {
  const [baseCurrency, setBaseCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [date, setDate] = useState("");
  const [exchangeRate, setExchangeRate] = useState(null);

  const freecurrencyapi = new Freecurrencyapi(
    "fca_live_YqrONtuLxvqfBKMpc46gBDXNldaqh3RfbeZoLRtM"
  );

  const handleConvert = async () => {
    if (baseCurrency && targetCurrency && date) {
      try {
        const response = await freecurrencyapi.latest({
          base_currency: baseCurrency,
          currencies: targetCurrency,
          date: date,
        });
        const rate = response.data[Object.keys(response.data)[0]];
        setExchangeRate(rate);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Row className="historical-converter">
      <Col>
        <h2>Historical Converter</h2>
        {exchangeRate !== null && (
          <div className="historical-result">
            <h3>Historical Exchange Rate</h3>
            <p>{exchangeRate.toFixed(4)}</p>
          </div>
        )}
        <Form>
          <Form.Group controlId="baseCurrency">
            <Form.Label>Base Currency</Form.Label>
            <Form.Control
              type="text"
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="targetCurrency">
            <Form.Label>Target Currency</Form.Label>
            <Form.Control
              type="text"
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleConvert}>
            Get Exchange Rate
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default HistoricalConverter;
