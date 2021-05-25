import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
const CARD_TYPE_LENGTH = {
  Visa: 1,
  JCB: 16,
  Amex: 20,
  MasterCard: 21,
};
function CardType({ setCardType: parentSetCardType }) {
  const [cardType, setCardType] = useState([]);

  function onCardChange({ target: { value } }) {
    parentSetCardType(value);
  }
  useEffect(() => {
    axios
      .get("http://www.mocky.io/v2/5d145fa22f0000ff3ec4f030")
      .then((data) => {
        setCardType(data.data.cardTypes);
      });
  }, []);

  return (
    <Form.Group>
      <Form.Control as="select" onChange={onCardChange}>
        {cardType.map(({ id, value }) => {
          return <option key={id}>{value}</option>;
        })}
      </Form.Control>
    </Form.Group>
  );
}

function PaymentSubmitted() {
  const [data, setData] = useState({});
  useEffect(() => {
    axios
      .get("http://www.mocky.io/v2/5d8de422310000b19d2b517a")
      .then((response) => {
        setData(response.data);
      });
  }, []);

  return !data ? (
    <h1>....loading</h1>
  ) : (
    <Col
      md
      style={{
        backgroundColor: "#7693e4",
      }}
    >
      <Form.Group>
        <Form.Label>responseCode: </Form.Label>
        <Form.Label>{data.responseCode}</Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label>responseMessage : </Form.Label>
        <Form.Label>{data.responseMessage}</Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label>invoiceNo : </Form.Label>
        <Form.Label> {data.invoiceNo}</Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label>approvalCode : </Form.Label>
        <Form.Label> {data.approvalCode}</Form.Label>
      </Form.Group>
    </Col>
  );
}

function Payment() {
  const [cardType, setCardType] = useState("Visa");
  const [cardNumber, setCardNumber] = useState("");
  const [expireNumber, setExpireNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitEnable, setSubmitEnable] = useState(true);
  const [isPaymentSubmitted, setSubmitPayment] = useState(false);
  useEffect(checkButtonState, [
    cardType,
    cardNumber,
    expireNumber,
    name,
    email,
  ]);
  function onNameChange({ target: { value } }) {
    setName(value);
  }

  function onCardNumberChange({ target: { value } }) {
    setCardNumber(value);
  }

  function onDateChange({ target: { value } }) {
    setExpireNumber(value);
  }

  function onEmailChange({ target: { value } }) {
    setEmail(value);
  }

  function onSubmit(event) {
    event.preventDefault();
    setSubmitPayment(true);
  }

  function checkButtonState() {
    if (cardNumber.length && expireNumber.length && name.length) {
      if (
        !isNaN(Number(cardNumber)) &&
        CARD_TYPE_LENGTH[cardType] === cardNumber.length &&
        name.length > 0 &&
        expireNumber.includes("-")
      ) {
        if (email.length) {
          if (email.includes("@") && email.includes(".com")) {
            setSubmitEnable(false);
          } else {
            setSubmitEnable(true);
          }
        } else {
          setSubmitEnable(false);
        }
      } else {
        setSubmitEnable(true);
      }
    }
  }

  return isPaymentSubmitted ? (
    <PaymentSubmitted />
  ) : (
    <Col md>
      <Form>
        <Form.Group>
          <Form.Label>Card type</Form.Label>
          <CardType setCardType={setCardType} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="12345"
            onChange={onCardNumberChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Expire</Form.Label>
          <Form.Control
            type="month"
            placeholder="12345"
            onChange={onDateChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Guru"
            maxLength="50"
            onChange={onNameChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            onChange={onEmailChange}
          />
        </Form.Group>

        <Button onClick={onSubmit} disabled={submitEnable}>
          Confirm Payment
        </Button>
      </Form>
    </Col>
  );
}

export default Payment;
