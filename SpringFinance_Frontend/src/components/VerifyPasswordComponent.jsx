import React, { Component, useState, useEffect } from "react";
import UserInfoService from "../services/UserInfoService";
import {
  Card,
  Table,
  Form,
  Col,
  Row,
  Button,
  FloatingLabel,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faSave, faUndo } from "@fortawesome/free-solid-svg-icons";
import Cookies from "universal-cookie";

const cookies = new Cookies();
class VerifyPasswordComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      errors: {},
    };
    if (cookies.get("userName") === undefined) {
      this.props.history.push("/login");
    }
  }

  changePwdHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  VerifyPassword = (e) => {
    e.preventDefault();
    let errors = this.formValidation();
    let user = {
      password: this.state.password,
    };
    if (this.isValid(errors)) {
      UserInfoService.verify(user).then((response) => {
        if (response.data.password === cookies.get("credential")) {
          this.props.history.push("/change-password");
        } else {
          this.invalidPwd();
        }
      });
    } else {
      let s1 = { ...this.state };
      s1.errors = errors;
      this.setState(s1);
    }
  };

  invalidPwd() {
    let text = "Your entered Password is wrong. Please try again!";
    if (window.confirm(text) === true) {
      return;
    }
  }

  formValidation = () => {
    const { password } = this.state;
    const errors = {};
    if (!password) {
      errors.password = "Password must not be blank";
    }
    return errors;
  };

  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, curr) => (errors[curr] ? acc + 1 : acc), 0);
    return count === 0;
  };

  render() {
    return (
      <Card className={"border border-dark bg-dark text-white"}>
        <Card.Header>
          <FontAwesomeIcon icon={faList} /> Reset Your Password
        </Card.Header>
        <Card.Body>
          <Form>
            <br />
            <Form.Label as={Col}>
              Please enter your current password:
            </Form.Label>
            <InputGroup className="mb-3">
              <FormControl
                required
                type="password"
                value={this.state.password}
                autoComplete="off"
                onChange={this.changePwdHandler}
                placeholder="Enter your current password"
              />
              {this.state.errors.password ? (
                <span className="text-danger">
                  {this.state.errors.password}
                </span>
              ) : (
                ""
              )}
            </InputGroup>

            <Button
              size="sm"
              type="button"
              variant="success"
              onClick={this.VerifyPassword}
            >
              Confirm
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer style={{ textAlign: "center" }}></Card.Footer>
      </Card>
    );
  }
}

export default VerifyPasswordComponent;
