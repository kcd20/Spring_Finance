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
import { Container, Paper } from "@material-ui/core";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
class ChangePasswordComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      passwordConfirm: "",
      errors: {},
    };
    if (cookies.get("userName") === undefined) {
      this.props.history.push("/login");
    }
  }

  changenNewPwdHandler = (event) => {
    this.setState({ newPassword: event.target.value });
  };

  changeConfirmPwdHandler = (event) => {
    this.setState({ passwordConfirm: event.target.value });
  };

  ResetPassword = (e) => {
    e.preventDefault();
    let errors = this.formValidation();
    let user = {
      password: this.state.newPassword,
    };
    if (this.isValid(errors)) {
      UserInfoService.resetUserPwd(cookies.get("userId"), user).then(
        (response) => {
          alert(
            " You have successfully reset your password please log in again!!"
          );
          cookies.remove("userName", { path: "/" });
          cookies.remove("userId", { path: "/" });
          cookies.remove("credential", { path: "/" });
          this.props.history.push("/login");
        }
      );
    } else {
      let s1 = { ...this.state };
      s1.errors = errors;
      this.setState(s1);
    }
  };

  formValidation = () => {
    const { newPassword, passwordConfirm } = this.state;
    const errors = {};

    if (!newPassword)
      errors.newPassword = "Your new Password must not be blank";

    if (passwordConfirm !== newPassword) {
      errors.passwordConfirm =
        "Please make sure your input password is the same as the new password";
    } else if (!passwordConfirm) {
      errors.passwordConfirm = "Password must not be blank";
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
            <br />
            <Form.Label as={Col}>Please enter your new password:</Form.Label>
            <InputGroup className="mb-3">
              <FormControl
                required
                value={this.state.newPassword}
                type="password"
                autoComplete="off"
                onChange={this.changenNewPwdHandler}
                placeholder="Enter your new password"
              />
              {this.state.errors.newPassword ? (
                <span className="text-danger">
                  {this.state.errors.newPassword}
                </span>
              ) : (
                ""
              )}
            </InputGroup>
            <br />
            <Form.Label as={Col}>Please confirm your new password:</Form.Label>
            <InputGroup className="mb-3">
              <FormControl
                required
                type="password"
                value={this.state.passwordConfirm}
                autoComplete="off"
                onChange={this.changeConfirmPwdHandler}
                placeholder="Confirm your new password"
              />
              {this.state.errors.passwordConfirm ? (
                <span className="text-danger">
                  {this.state.errors.passwordConfirm}
                </span>
              ) : (
                ""
              )}
            </InputGroup>

            <Button
              size="sm"
              type="button"
              variant="success"
              onClick={this.ResetPassword}
            >
              Reset Password
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer style={{ textAlign: "center" }}></Card.Footer>
      </Card>
    );
  }
}

export default ChangePasswordComponent;
