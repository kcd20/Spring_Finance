import React, { Component } from "react";
import AssetService from "../../services/AssetService";
import {
  ArrowDownward,
  ArrowUpward,
  ArrowDropUp,
  ArrowDropDown,
} from "@mui/icons-material";
import "./asset.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();
class ListAssetComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assets: [],
      sumCurrent: 0,
      sumPurchase: 0,
      sumGain: 0,
      search: "",
      order: "asc",
      sortColumn: "",
      setVisible: "",
    };
    if (cookies.get("userName") === undefined) {
      this.props.history.push("/login");
    }

    this.addAsset = this.addAsset.bind(this);
    this.updateAsset = this.updateAsset.bind(this);
    this.deleteAsset = this.deleteAsset.bind(this);
    this.viewAssetInfo = this.viewAssetInfo.bind(this);
  }

  componentDidMount() {
    AssetService.getAssets().then((res) => {
      this.setState({ assets: res.data });

      let totalCurr = 0;
      let totalPur = 0;
      let totalGain = 0;
      for (let i = 0; i < this.state.assets.length; i++) {
        totalCurr +=
          this.state.assets[i].latestPrice * this.state.assets[i].holdings;
        this.setState({ sumCurrent: totalCurr });

        totalPur +=
          this.state.assets[i].purchasePrice * this.state.assets[i].holdings;
        this.setState({ sumPurchase: totalPur });
      }

      totalGain = totalCurr - totalPur;
      this.setState({ sumGain: totalGain });
    });
  }

  addAsset() {
    this.props.history.push("/save-asset/add");
  }

  updateAsset(assetId) {
    this.props.history.push(`/save-asset/${assetId}`);
  }

  deleteAsset(assetId) {
    let text = "Do you want to delete this asset?";
    if (window.confirm(text) === true) {
      AssetService.deleteAsset(assetId).then((res) => {
        this.setState({
          assets: this.state.assets.filter(
            (asset) => asset.assetId !== assetId
          ),
        });
        window.location.reload();
      });
    } else {
      return;
    }
  }

  displayArrow(gain) {
    if (gain >= 0) {
      return <ArrowUpward style={{ color: "green" }} />;
    } else {
      return <ArrowDownward style={{ color: "red" }} />;
    }
  }

  viewAssetInfo(ticker) {
    this.props.history.push(`/assets/info/${ticker}`);
  }

  inputChange = (e) => {
    this.setState({ search: e.target.value });
  };

  renderTable(asset) {
    if (
      this.state.search !== "" &&
      asset.symbol.toLowerCase().indexOf(this.state.search.toLowerCase()) ===
        -1 &&
      this.state.search !== "Stocks" &&
      this.state.search !== "Crypto"
    ) {
      return null;
    }

    if (this.state.search === "Stocks" && asset.type === "Crypto") {
      return null;
    }

    if (this.state.search === "Crypto" && asset.type === "Stock") {
      return null;
    }

    return (
      <tr key={asset.assetId}>
        <td>{asset.symbol}</td>
        <td>{asset.holdings}</td>
        <td>{asset.datePurchased}</td>
        <td>{asset.holdingPeriod}</td>
        <td>{asset.purchasePrice}</td>
        <td>{asset.latestPrice}</td>
        <td value={asset.gainValue}>
          {asset.gainValue} {this.displayArrow(asset.gainValue)}
        </td>
        <td value={asset.gain}>
          {asset.gain}% {this.displayArrow(asset.gain)}
        </td>
        <td value={asset.totalGain}>
          {asset.totalGain} {this.displayArrow(asset.totalGain)}
        </td>
        <td value={asset.currentValue}>{asset.currentValue}</td>
        <td>
          <button
            onClick={() => this.updateAsset(asset.assetId)}
            className="btn btn-info"
          >
            {" "}
            Update{" "}
          </button>
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => this.deleteAsset(asset.assetId)}
            className="btn btn-danger"
          >
            Delete{" "}
          </button>
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => this.viewAssetInfo(asset.symbol)}
            className="btn btn-success"
          >
            Info
          </button>
        </td>
      </tr>
    );
  }

  sortBySymbol() {
    this.setState({ sortColumn: "symbol" });
    const { assets, order } = this.state;
    assets.sort((a, b) => {
      const isReversed = order === "asc" ? 1 : -1;
      return isReversed * a.symbol.localeCompare(b.symbol);
    });

    if (this.state.order === "asc") this.setState({ order: "desc" });
    else this.setState({ order: "asc" });
  }

  sortByHoldings() {
    this.setState({ sortColumn: "holdings" });
    const { assets, order } = this.state;
    let result = 0;
    assets.sort((a, b) => {
      const isReversed = order === "asc" ? 1 : -1;
      if (a.holdings < b.holdings) result = -1;
      else result = 1;
      return isReversed * result;
    });

    if (this.state.order === "asc") this.setState({ order: "desc" });
    else this.setState({ order: "asc" });
  }

  sortByDate() {
    this.setState({ sortColumn: "date" });
    const { assets, order } = this.state;
    let result = 0;
    assets.sort((a, b) => {
      const isReversed = order === "asc" ? 1 : -1;
      if (a.datePurchased < b.datePurchased) result = -1;
      else result = 1;
      return isReversed * result;
    });

    if (this.state.order === "asc") this.setState({ order: "desc" });
    else this.setState({ order: "asc" });
  }

  sortByPurchasePrice() {
    this.setState({ sortColumn: "purchasePrice" });
    const { assets, order } = this.state;
    let result = 0;
    assets.sort((a, b) => {
      const isReversed = order === "asc" ? 1 : -1;
      if (a.purchasePrice < b.purchasePrice) result = -1;
      else result = 1;
      return isReversed * result;
    });

    if (this.state.order === "asc") this.setState({ order: "desc" });
    else this.setState({ order: "asc" });
  }

  sortByLatestPrice() {
    this.setState({ sortColumn: "latestPrice" });
    const { assets, order } = this.state;
    let result = 0;
    assets.sort((a, b) => {
      const isReversed = order === "asc" ? 1 : -1;
      if (a.latestPrice < b.latestPrice) result = -1;
      else result = 1;
      return isReversed * result;
    });

    if (this.state.order === "asc") this.setState({ order: "desc" });
    else this.setState({ order: "asc" });
  }

  sortByGainValue() {
    this.setState({ sortColumn: "gainValue" });
    const { assets, order } = this.state;
    let result = 0;
    assets.sort((a, b) => {
      const isReversed = order === "asc" ? 1 : -1;
      if (a.gainValue < b.gainValue) result = -1;
      else result = 1;
      return isReversed * result;
    });

    if (this.state.order === "asc") this.setState({ order: "desc" });
    else this.setState({ order: "asc" });
  }

  sortByGain() {
    this.setState({ sortColumn: "gain" });
    const { assets, order } = this.state;
    let result = 0;
    assets.sort((a, b) => {
      const isReversed = order === "asc" ? 1 : -1;
      if (a.gain < b.gain) result = -1;
      else result = 1;
      return isReversed * result;
    });

    if (this.state.order === "asc") this.setState({ order: "desc" });
    else this.setState({ order: "asc" });
  }

  sortByHoldingPeriod() {
    this.setState({ sortColumn: "holdingPeriod" });
    const { assets, order } = this.state;
    let result = 0;
    assets.sort((a, b) => {
      const isReversed = order === "asc" ? 1 : -1;
      if (a.holdingPeriod < b.holdingPeriod) result = -1;
      else result = 1;
      return isReversed * result;
    });

    if (this.state.order === "asc") this.setState({ order: "desc" });
    else this.setState({ order: "asc" });
  }

  sortByTotalGain() {
    this.setState({ sortColumn: "totalGain" });
    const { assets, order } = this.state;
    let result = 0;
    assets.sort((a, b) => {
      const isReversed = order === "asc" ? 1 : -1;
      if (a.totalGain < b.totalGain) result = -1;
      else result = 1;
      return isReversed * result;
    });

    if (this.state.order === "asc") this.setState({ order: "desc" });
    else this.setState({ order: "asc" });
  }

  sortByCurrentValue() {
    this.setState({ sortColumn: "currentValue" });
    const { assets, order } = this.state;
    let result = 0;
    assets.sort((a, b) => {
      const isReversed = order === "asc" ? 1 : -1;
      if (a.currentValue < b.currentValue) result = -1;
      else result = 1;
      return isReversed * result;
    });

    if (this.state.order === "asc") this.setState({ order: "desc" });
    else this.setState({ order: "asc" });
  }

  displaySortArrow(order, column) {
    if (order === "desc" && this.state.sortColumn === column) {
      return <ArrowDropUp />;
    } else if (order === "asc" && this.state.sortColumn === column) {
      return <ArrowDropDown />;
    } else {
      return;
    }
  }

  totalGain(gain) {
    if (gain >= 0) {
      return "Total Gain: $";
    } else {
      return "Total Loss: $";
    }
  }

  render() {
    return (
      <div>
        <br></br>
        <h2 className="text-center">My Assets (USD)</h2>

        <h3>Total Current Value: ${this.state.sumCurrent.toFixed(2)}</h3>

        <h3>Total Purchase Value: ${this.state.sumPurchase.toFixed(2)}</h3>

        <h3>
          {this.totalGain(this.state.sumGain.toFixed(2))}
          {this.state.sumGain.toFixed(2)}
        </h3>

        <div className="row"></div>
        <br></br>
        <div className="row1">
          <input
            type="text"
            value={this.state.search}
            placeholder="Search by Symbol"
            onChange={this.inputChange}
          ></input>
          &emsp;
          <button
            className="btn btn-secondary"
            value={""}
            onClick={this.inputChange}
          >
            &ensp; Show All &ensp;
          </button>
          &emsp;
          <button
            className="btn btn-info"
            value={"Stocks"}
            onClick={this.inputChange}
          >
            Show Stocks
          </button>
          &emsp;
          <button
            className="btn btn-warning"
            value={"Crypto"}
            onClick={this.inputChange}
          >
            Show Crypto
          </button>
          <div className="row2">
            <button className="btn btn-primary" onClick={this.addAsset}>
              &ensp; Add Asset &ensp;
            </button>
          </div>
        </div>
        <br></br>
        <div className="row">
          <table className="table table-striped tabled-bordered">
            <thead>
              <tr>
                <th onClick={() => this.sortBySymbol()} className="head">
                  Asset Symbol{" "}
                  {this.displaySortArrow(this.state.order, "symbol")}
                </th>
                <th
                  onClick={() => this.sortByHoldings("holdings")}
                  className="head"
                >
                  Asset Holdings{" "}
                  {this.displaySortArrow(this.state.order, "holdings")}
                </th>
                <th onClick={() => this.sortByDate()} className="head">
                  Date Purchased{" "}
                  {this.displaySortArrow(this.state.order, "date")}
                </th>
                <th onClick={() => this.sortByHoldingPeriod()} className="head">
                  Holding Period (Days){" "}
                  {this.displaySortArrow(this.state.order, "holdingPeriod")}
                </th>
                <th onClick={() => this.sortByPurchasePrice()} className="head">
                  Asset Purchase Price{" "}
                  {this.displaySortArrow(this.state.order, "purchasePrice")}
                </th>
                <th onClick={() => this.sortByLatestPrice()} className="head">
                  Asset Latest Price{" "}
                  {this.displaySortArrow(this.state.order, "latestPrice")}
                </th>
                <th onClick={() => this.sortByGainValue()} className="head">
                  Asset Gain/Loss{" "}
                  {this.displaySortArrow(this.state.order, "gainValue")}
                </th>
                <th onClick={() => this.sortByGain()} className="head">
                  Asset Gain/Loss (%){" "}
                  {this.displaySortArrow(this.state.order, "gain")}
                </th>
                <th onClick={() => this.sortByTotalGain()} className="head">
                  Total Asset Gain/Loss{" "}
                  {this.displaySortArrow(this.state.order, "totalGain")}
                </th>
                <th onClick={() => this.sortByCurrentValue()} className="head">
                  Current Value{" "}
                  {this.displaySortArrow(this.state.order, "currentValue")}
                </th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {this.state.assets.map((asset) => {
                return this.renderTable(asset);
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListAssetComponent;
