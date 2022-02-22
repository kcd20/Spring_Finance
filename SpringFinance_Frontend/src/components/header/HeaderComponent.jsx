import React, { Component } from "react";
import image from "../../images/SpringFinance_Logo.png";
import { NavLink, Link } from "react-router-dom";
import "./header.css";
import Cookies from "universal-cookie";
import UserInfoService from "../../services/UserInfoService";

const cookies = new Cookies();

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      logged: false,
      signIn: false,
      register: false,
      firstName: "",
      lastName: "",
      additionalInformation: "",
      ageType: "",
      cash: 0,
      riskLevel: "",
      interest1: "",
      interest2: "",
      interest3: "",
    };
  }
  componentDidMount() {
    this.timer = setInterval(
      function () {
        this.setState({
          username: cookies.get("userName"),
        });
        if (cookies.get("userName") === undefined) {
          this.setState({ logged: true, signIn: false, register: false });
        } else {
          this.setState({ logged: false, signIn: true, register: true });
        }
      }.bind(this),
      100
    );

    UserInfoService.getUsersById(cookies.get("userId")).then((response) => {
      this.setState({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        ageType: response.data.ageType,
        cash: response.data.cash,
        riskLevel: response.data.riskLevel,
        interest1: response.data.interest1,
        interest2: response.data.interest2,
        interest3: response.data.interest3,
        additionalInformation: response.data.additionalInformation,
      });
    });
  }

  componentDidUpdate() {}

  Logout = (event) => {
    cookies.remove("userName", { path: "/" });
    cookies.remove("userId", { path: "/" });
    cookies.remove("credential", { path: "/" });

    if (cookies.get("userName") === undefined) {
      this.setState({ logged: true });
    } else {
      this.setState({ logged: false });
    }
  };

  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark" alt="">
            <div className="container">
              <NavLink className="navbar-brand" to="/dashboard">
                <img src={image} alt="" height={70} />
              </NavLink>
            </div>

            <div className="container">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/dashboard"
                    hidden={this.state.logged}
                  >
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/assets"
                    hidden={this.state.logged}
                  >
                    My Assets
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/watchlist"
                    hidden={this.state.logged}
                  >
                    My Watchlist
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/userinfo"
                    hidden={this.state.logged}
                  >
                    Update Details
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/verify-password"
                    hidden={this.state.logged}
                  >
                    Reset Password
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/userprofile"
                    hidden={this.state.logged}
                  >
                    {cookies.get("userName")} 's Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/login"
                    onClick={this.Logout}
                    hidden={this.state.logged}
                  >
                    Sign Out
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    hidden={this.state.signIn}
                    to="/login"
                  >
                    Sign in
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    hidden={this.state.register}
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

HeaderComponent.propTypes = {};

export default HeaderComponent;
