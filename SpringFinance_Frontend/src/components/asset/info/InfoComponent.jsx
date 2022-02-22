import React, { Component } from "react";
import GraphComponent from "./GraphComponent";
import NewsComponent from "./NewsComponent";
import "./info.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class InfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { ticker: this.props.match.params.ticker };
    if (cookies.get("userName") === undefined) {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <div className="info">
        <h1>{this.state.ticker} News and Prediction</h1>
        <GraphComponent ticker={this.state.ticker} />
        <NewsComponent ticker={this.state.ticker} />
      </div>
    );
  }
}
export default InfoComponent;
