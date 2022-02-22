import React, { Component } from "react";
import "./dashboard.css";
import FeaturedItems from "./FeaturedItemsComponent";
import Chart from "./chart/Chart";
import Cookies from "universal-cookie";

const cookies = new Cookies();
class DashboardMainComponent extends Component {
  constructor(props) {
    super(props);
    if (cookies.get("userName") === undefined) {
      this.props.history.push("/login");
    }
  }
  render() {
    return (
      <div className="home">
        <FeaturedItems />
        <Chart />
      </div>
    );
  }
}
export default DashboardMainComponent;
