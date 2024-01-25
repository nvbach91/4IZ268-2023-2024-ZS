// CurrencyRow.js
import React from "react";
import { Row, Col, Form } from "react-bootstrap";

function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount,
  } = props;

  return (
    <Row className="currency-row">
      <Col xs={6} className="text-center">
        <Form.Group controlId="currency">
          <Form.Label>Select Currency</Form.Label>
          <Form.Control
            as="select"
            value={selectedCurrency}
            onChange={onChangeCurrency}
          >
            {currencyOptions.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Col>
      <Col xs={6} className="text-center">
        <Form.Group controlId="amount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            value={isNaN(amount) ? "" : amount}
            onChange={onChangeAmount}
          />
        </Form.Group>
      </Col>
    </Row>
  );
}

export default CurrencyRow;
