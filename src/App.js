import React from "react";
import { Row } from "react-bootstrap";
import "./App.css";

import { ProductDetails, Payment } from "./components";

class App extends React.Component {
  render() {
    return (
        <Row>
          <ProductDetails />
          <Payment />
        </Row>
    );
  }
}

export default App;
