import React, { Component } from 'react';
import AssetService from '../../../services/AssetService';
import Helmet from 'react-helmet';
import "./info.css";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

class GraphComponent extends Component {
    constructor(props) {
        super(props);
        let today = new Date();
        this.state = {
            ticker: this.props.ticker,
            forecast: "",
            data: "",
            plotscript: "",
            date: new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()),
            prediction: ""
        };
    }

    componentDidMount() {
        this.updatePrediction();
    }
    updateDate = (event) => {
        this.setState({ date: event.target.value });
        this.updatePrediction();
    }
    updatePrediction() {
        AssetService.getPrediction(this.state.ticker, this.state.date.toISOString().substring(0, 10)).then((res) => {
            this.setState({ prediction: res.data.value });
            // works with include_plotlyjs=False
            const raw = res.data.graph;
            const regScript = RegExp('<script.*>(.+?)</script>');
            this.setState({ plotscript: raw.match(regScript)[1] });
        });
        this.forceUpdate();
    }
    render() {
        const plotscript = this.state.plotscript;
        return (
            <div id="graph" className="graphComponent">
                <Helmet script={[
                    {
                        src: "https:cdn.plot.ly/plotly-2.8.3.min.js",
                        type: "text/javascript"
                    },
                    {
                        type: "text/javascript",
                        innerHTML: `${plotscript}`
                    }]}
                />
                <div className="datePicker">
                    <form>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Predict value on date:</td>
                                    <td className="col-sm-8">
                                        <DatePickerComponent
                                            value={this.state.date}
                                            format="yyyy-MM-dd"
                                            onChange={this.updateDate.bind(this)}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                  <br/>
                    <label className="prediction" id="prediction">
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(this.state.prediction)}
                    </label>
                </div>
                <br />
                <div id="plotly-plot"
                    className="plotly-graph-div"
                />
            </div>
        );
    }
}

export default GraphComponent;
