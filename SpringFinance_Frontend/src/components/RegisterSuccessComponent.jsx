import React, { Component, useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Form,
  Col,
  Row,
  InputGroup,
  FormControl,
  Card,
  Button,
  Alert,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faSignInAlt,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import background from "../images/Bg.jpg";

class RegisterSuccessComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "86vh",
        }}
      >
        <Row className="justify-content-md-center">
          <Col xs={5}>
            <Card className="border border-dark bg-dark text-white">
              <Card.Header>
                <FontAwesomeIcon icon={faSignInAlt} /> Welcome to Spring
                Finance！
              </Card.Header>
              <Card.Body>
                Congrats! You're now part of the Spring Finance community!
              </Card.Body>
              <Link to="/login">Sign in now</Link>
              <Card.Footer style={{ "text-align": "right" }}></Card.Footer>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default RegisterSuccessComponent;
