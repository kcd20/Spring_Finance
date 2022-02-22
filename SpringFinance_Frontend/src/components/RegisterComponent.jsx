import React, { Component, useState, useEffect } from "react";
import CommonService from "../services/CommonService";
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
import * as EmailValidator from "email-validator";

class RegisterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirm: "",
      firstName: "",
      lastName: "",
      errors: {},
    };
  }

  resetRegisterForm = (e) => {
    this.setState({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      passwordConfirm: "",
    });
  };

  changeFirstNameHandler = (event) => {
    this.setState({ firstName: event.target.value });
  };

  changeLastNameHandler = (event) => {
    this.setState({ lastName: event.target.value });
  };
  changeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };
  changePwdHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  changePwdConfirmHandler = (event) => {
    this.setState({ passwordConfirm: event.target.value });
  };

  formValidation = () => {
    const { email, password, firstName, lastName, passwordConfirm } =
      this.state;
    const errors = {};

    if (!email) {
      errors.email = "Email must not be blank";
    } else if (!EmailValidator.validate(email)) {
      errors.email = "Invalid email address";
    }

    if (!password) errors.password = "Password must not be blank";

    if (passwordConfirm !== password) {
      errors.passwordConfirm =
        "Please make sure your input password is the same as the above one";
    } else if (!passwordConfirm) {
      errors.passwordConfirm = "Password must not be blank";
    }

    if (!firstName) errors.firstName = "Please enter your first Name";
    if (!lastName) errors.lastName = "Please enter your last Name";

    return errors;
  };

  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, curr) => (errors[curr] ? acc + 1 : acc), 0);
    return count === 0;
  };

  register = (e) => {
    e.preventDefault();
    let errors = this.formValidation();
    let user = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    };
    if (this.isValid(errors)) {
      CommonService.register(user).then((data) => {
        if (data.data === "") {
          this.invalidEmail();
        } else {
          this.props.history.push("/register-success");
        }
      });
    } else {
      let s1 = { ...this.state };
      s1.errors = errors;
      this.setState(s1);
    }
  };

  invalidEmail() {
    let text =
      "The email you entered has already been registered, please try again!";
    if (window.confirm(text) === true) {
      return;
    }
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
                <FontAwesomeIcon icon={faSignInAlt} /> Join Spring Finance :
                Make the Most of Your Investment Life!
              </Card.Header>
              <Card.Body>
                <h3 style={{ color: "DodgerBlue" }}>Registration Form:</h3>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="text"
                      value={this.state.firstName}
                      onChange={this.changeFirstNameHandler}
                      className={"bg-dark text-white"}
                      placeholder="Please input your First Name"
                    />
                    {this.state.errors.firstName ? (
                      <span className="text-danger">
                        {this.state.errors.firstName}
                      </span>
                    ) : (
                      ""
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="text"
                      value={this.state.lastName}
                      onChange={this.changeLastNameHandler}
                      className={"bg-dark text-white"}
                      placeholder="Please input your Last Name"
                    />
                    {this.state.errors.lastName ? (
                      <span className="text-danger">
                        {this.state.errors.lastName}
                      </span>
                    ) : (
                      ""
                    )}
                  </Form.Group>

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
                      placeholder="Set your Email Address"
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                    {this.state.errors.email ? (
                      <span className="text-danger">
                        {this.state.errors.email}
                      </span>
                    ) : (
                      ""
                    )}
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
                      placeholder="Set your Password"
                    />
                    {this.state.errors.password ? (
                      <span className="text-danger">
                        {this.state.errors.password}
                      </span>
                    ) : (
                      ""
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm your Password</Form.Label>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="password"
                      value={this.state.passwordConfirm}
                      onChange={this.changePwdConfirmHandler}
                      className={"bg-dark text-white"}
                      placeholder="Input your Password again"
                    />
                    {this.state.errors.passwordConfirm ? (
                      <span className="text-danger">
                        {this.state.errors.passwordConfirm}
                      </span>
                    ) : (
                      ""
                    )}
                  </Form.Group>

                  <Button
                    size="sm"
                    type="button"
                    variant="success"
                    onClick={this.register}
                  >
                    <FontAwesomeIcon icon={faSignInAlt} />
                    Register
                  </Button>
                  <Button
                    size="sm"
                    type="button"
                    variant="info"
                    onClick={this.resetRegisterForm}
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

export default RegisterComponent;
