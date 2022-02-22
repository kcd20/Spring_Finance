import React, { Component } from "react";
import AssetService from "../../services/AssetService";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class CreateAssetComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assetId: this.props.match.params.assetId,
      symbol: "",
      name: "",
      holdings: "",
      datePurchased: "",
      purchasePrice: "",

      errors: {},
    };
    if (cookies.get("userName") === undefined) {
      this.props.history.push("/login");
    }

    this.changeSymbolHandler = this.changeSymbolHandler.bind(this);
    this.changeHoldingsHandler = this.changeHoldingsHandler.bind(this);
    this.changePurchasePriceHandler =
      this.changePurchasePriceHandler.bind(this);
    this.saveAsset = this.saveAsset.bind(this);
  }

  componentDidMount() {
    if (this.state.assetId === "add") {
      return;
    } else {
      AssetService.getAssetById(this.state.assetId).then((res) => {
        let asset = res.data;
        this.setState({
          symbol: asset.symbol,
          holdings: asset.holdings,
          datePurchased: asset.datePurchased,
          purchasePrice: asset.purchasePrice,
          name: asset.symbol,
        });
      });
    }
  }

  formValidation = () => {
    const { symbol, holdings, datePurchased, purchasePrice } = this.state;
    const errors = {};

    if (!symbol) errors.symbol = "Symbol must not be blank";

    if (!holdings) errors.holdings = "Holdings must not be blank";
    if (isNaN(holdings)) errors.holdings = "Please enter a valid number";

    if (!datePurchased) errors.datePurchased = "Invalid date";

    if (!purchasePrice)
      errors.purchasePrice = "Purchase Price must not be blank";
    if (isNaN(purchasePrice))
      errors.purchasePrice = "Please enter a valid price";

    return errors;
  };

  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, curr) => (errors[curr] ? acc + 1 : acc), 0);
    return count === 0;
  };

  saveAsset = (e) => {
    e.preventDefault();
    let errors = this.formValidation();
    let asset = {
      symbol: this.state.symbol,
      name: this.state.symbol,
      holdings: this.state.holdings,
      datePurchased: this.state.datePurchased,
      purchasePrice: this.state.purchasePrice,
    };
    if (this.isValid(errors)) {
      if (this.state.assetId === "add") {
        AssetService.createAsset(asset).then((data) => {
          console.log(data.data);
          if (data.data === "") {
            this.invalidSymbol();
          } else {
            this.props.history.push("/assets");
          }
        });
      } else {
        AssetService.updateAsset(this.state.assetId, asset).then((data) => {
          console.log("asset => " + JSON.stringify(asset));
          this.props.history.push("/assets");
        });
      }
    } else {
      let s1 = { ...this.state };
      s1.errors = errors;
      this.setState(s1);
    }
  };

  invalidSymbol() {
    let text = "You have entered an invalid symbol. Please try again.";
    if (window.confirm(text) === true) {
      return;
    } else {
      this.props.history.push("/assets");
    }
  }

  changeSymbolHandler = (event) => {
    let valueUP = event.target.value;
    this.setState({ symbol: valueUP.toUpperCase() });
  };

  changeHoldingsHandler = (event) => {
    this.setState({ holdings: event.target.value });
  };

  changeDatePurchasedHandler = (event) => {
    this.setState({ datePurchased: event.target.value });
  };

  changePurchasePriceHandler = (event) => {
    this.setState({ purchasePrice: event.target.value });
  };

  cancel() {
    this.props.history.push("/assets");
  }

  getTitle() {
    if (this.state.assetId === "add") {
      return <h3 className="text-center">Add Asset</h3>;
    } else {
      return <h3 className="text-center">Update Asset</h3>;
    }
  }

  readonly() {
    if (this.state.assetId === "add") {
      return (
        <input
          placeholder="eg. AAPL"
          name="Name"
          className="form-control"
          style={{ textTransform: "uppercase" }}
          value={this.state.symbol}
          onChange={this.changeSymbolHandler}
        />
      );
    } else {
      return (
        <input
          placeholder="eg. AAPL"
          name="Name"
          className="form-control"
          style={{ textTransform: "uppercase" }}
          value={this.state.symbol}
          onChange={this.changeSymbolHandler}
          readOnly
        />
      );
    }
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div
              className="card col-md-4 offset-md-4"
              style={{ marginTop: "15vh" }}
            >
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Symbol:</label>
                    <div className="col-sm-8">
                      {this.readonly()}
                      {this.state.errors.symbol ? (
                        <span className="text-danger">
                          {this.state.errors.symbol}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <br></br>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {" "}
                      Holdings:{" "}
                    </label>
                    <div className="col-sm-8">
                      <input
                        placeholder="0"
                        name="Holdings"
                        className="form-control"
                        value={this.state.holdings}
                        onChange={this.changeHoldingsHandler}
                      />
                      {this.state.errors.holdings ? (
                        <span className="text-danger">
                          {this.state.errors.holdings}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <br></br>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {" "}
                      Date Purchased:{" "}
                    </label>
                    <div className="col-sm-8">
                      <DatePickerComponent
                        placeholder="Enter Date"
                        value={this.state.datePurchased}
                        format="yyyy-MM-dd"
                        onChange={this.changeDatePurchasedHandler}
                      />

                      {this.state.errors.datePurchased ? (
                        <span className="text-danger">
                          {this.state.errors.datePurchased}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <br></br>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {" "}
                      Purchase Price:{" "}
                    </label>
                    <div className="col-sm-8">
                      <input
                        placeholder="0"
                        name="PurchasePrice"
                        className="form-control"
                        value={this.state.purchasePrice}
                        onChange={this.changePurchasePriceHandler}
                      />
                      {this.state.errors.purchasePrice ? (
                        <span className="text-danger">
                          {this.state.errors.purchasePrice}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <br></br>
                  <button className="btn btn-success" onClick={this.saveAsset}>
                    &ensp; Save &ensp;
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateAssetComponent;
