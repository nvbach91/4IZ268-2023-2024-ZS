import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Freecurrencyapi from "@everapi/freecurrencyapi-js";

function HistoricalConverter(props) {
  // const [baseCurrency, setBaseCurrency] = useState("");
  // const [targetCurrency, setTargetCurrency] = useState("");
  const [date, setDate] = useState("");
  const [exchangeRate, setExchangeRate] = useState(null);

  const freecurrencyapi = new Freecurrencyapi(
    "fca_live_YqrONtuLxvqfBKMpc46gBDXNldaqh3RfbeZoLRtM",
  );

  const handleConvert = async () => {
    // setBaseCurrency(props.baseCurrency);
    // setTargetCurrency(props.targetCurrency);
    if (props.baseCurrency && props.targetCurrency && date) {
      try {
        // console.log(date);
        // console.log(parseInt(date));
        // console.log(parseInt(date.slice(0, 5)));
        // console.log((date.slice(5,6)));
        // console.log(parseInt(date.slice(7, 9)))
        // if (parseInt(date.slice(0, 5)) < 2021) {
        //    throw new Error("Date shouldn't be older than 01.01.2021");
        // }
        // console.log(props.baseCurrency);
        // console.log(props.targetCurrency);
        const response = await freecurrencyapi.latest({
          base_currency: props.baseCurrency,
          currencies: props.targetCurrency,
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
        <h6>Pick a date from 01.01.2021 till today</h6>
        {exchangeRate !== null && (
          <div className="historical-result">
            <h3>Historical Exchange Rate</h3>
            <p>{exchangeRate.toFixed(2)}</p>
          </div>
        )}
        <Form>
          {/*<Form.Group controlId="baseCurrency">*/}
          {/*  <Form.Label>Base Currency</Form.Label>*/}
          {/*  <Form.Control*/}
          {/*    type="text"*/}
          {/*    value={baseCurrency}*/}
          {/*    onChange={(e) => setBaseCurrency(e.target.value)}*/}
          {/*  />*/}
          {/*</Form.Group>*/}
          {/*<Form.Group controlId="targetCurrency">*/}
          {/*  <Form.Label>Target Currency</Form.Label>*/}
          {/*  <Form.Control*/}
          {/*    type="text"*/}
          {/*    value={targetCurrency}*/}
          {/*    onChange={(e) => setTargetCurrency(e.target.value)}*/}
          {/*  />*/}
          {/*</Form.Group>*/}

          <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              min="2021-01-01"
              max={new Date().toISOString().slice(0, 10)}
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
