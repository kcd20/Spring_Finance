import React, { Component, useState, useEffect } from "react";
import CommonService from "../services/CommonService";
import Cookies from "universal-cookie";
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

const cookies = new Cookies();
class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    if (cookies.get("userName") === undefined) {
      this.props.history.push("/login");
    } else {
      this.props.history.push("/dashboard");
    }

    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changePwdHandler = this.changePwdHandler.bind(this);
  }

  login = (e) => {
    //Check error before the login form submission
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password,
    };

    CommonService.login(user).then((data) => {
      console.log(data.data);
      if (data.data === "") {
        this.invalidUser();
      } else {
        CommonService.login(user).then((res) => {
          this.props.history.push("/dashboard");
        });
      }
    });
  };

  invalidUser() {
    let text = "Your Email or Password is wrong. Please try again!";
    if (window.confirm(text) === true) {
      return;
    }
  }

  resetLoginForm = (e) => {
    this.setState({ email: "", password: "" });
  };

  changeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  changePwdHandler = (event) => {
    this.setState({ password: event.target.value });
  };

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
                <FontAwesomeIcon icon={faSignInAlt} /> Login to Spring Finance
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="text"
                      name="Email"
                      value={this.state.email}
                      onChange={this.changeEmailHandler}
                      className={"bg-dark text-white"}
                      placeholder="Enter Email Address"
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="password"
                      name="pwd"
                      value={this.state.password}
                      onChange={this.changePwdHandler}
                      className={"bg-dark text-white"}
                      placeholder="Enter Password"
                    />
                  </Form.Group>

                  <Button
                    size="sm"
                    type="button"
                    variant="success"
                    onClick={this.login}
                    className="Btn1"
                    disabled={
                      this.state.email.length === 0 ||
                      this.state.password.length === 0
                    }
                  >
                    <FontAwesomeIcon icon={faSignInAlt} />
                    Login
                  </Button>
                  <Button
                    size="sm"
                    type="button"
                    variant="info"
                    onClick={this.resetLoginForm}
                    disabled={
                      this.state.email.length === 0 &&
                      this.state.password.length === 0
                    }
                  >
                    <FontAwesomeIcon icon={faUndo} /> Reset
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer style={{ "text-align": "right" }}></Card.Footer>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default LoginComponent;
