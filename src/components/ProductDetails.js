import React from "react";
import { Col, Form } from "react-bootstrap";

export default function ProductDetails() {
  return (
    <Col md>
      <Form.Group>
        <Form.Label>Product: </Form.Label>
        <Form.Label>Apple Iphone 12</Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label>Date : </Form.Label>
        <Form.Label>{new Date().toString()}</Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label>Amount : </Form.Label>
        <Form.Label> 1520 $</Form.Label>
      </Form.Group>
    </Col>
  );
}
