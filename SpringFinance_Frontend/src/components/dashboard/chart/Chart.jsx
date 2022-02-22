import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar} from 'recharts';
import { PieChart, Pie } from "recharts";
import "./chart.css"
import AssetService from '../../../services/AssetService';
import React, { Component } from 'react';

class Chart extends Component {
    constructor(props){
        super(props)
            this.state={
                assets: [],
                pieChart: [],
                barChart: [],
                percentage: []
        }
    }

    componentDidMount(){
        AssetService.getAssets().then((res) => {
            this.setState({assets: res.data});
            const pieChartData = this.state.assets.map(asset => ({
                name: asset.symbol, 
                value: this.setDecimal(asset)}
            ));
            this.setState({pieChart: pieChartData});            

            const barChartData = this.state.assets.map(asset => ({name: asset.symbol, Current: asset.latestPrice, Purchase: asset.purchasePrice}));
            this.setState({barChart: barChartData});
            
            let total = 0;

            for(let i = 0; i < this.state.assets.length; i++){
                total += this.state.assets[i].currentValue;
            }

            const assetDis = this.state.assets.map(asset => ({
                name: asset.symbol,
                date: asset.datePurchased,
                value: this.setDecimalTotal(asset, total)
            }))
            this.setState({percentage: assetDis})

        })
    }

    setDecimal(asset){
        let assetDP = asset.latestPrice*asset.holdings;
        return (parseFloat(assetDP.toFixed(2)));
    }

    setDecimalTotal(asset,total){
        let assetPercent = asset.latestPrice*asset.holdings/total * 100;
        return (parseFloat(assetPercent.toFixed(2)))
    }

    render() {
        return (
        <div className = "charts">
            <div className = "chart1">
            <h2 className="chartTitle">Asset Distribution</h2>
            <div className="chart1row"> 
            <table className="assetTable">
            {this.state.percentage.map((asset => 
                <tr key={asset.name}>
                    <td className="tableRow"><span className="assetPercentageSymbol">{asset.name}</span> ({asset.date}) - {asset.value}%</td>
                </tr>))}
            </table>
            <PieChart className = "pieChart" width={550} height={400}>
                <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={this.state.pieChart}
                    cx={300}
                    outerRadius={140}
                    fill="#a09cc1"
                    label
                />
                <Tooltip />
            </PieChart>
            </div>
            </div>

            <div className = "chart2">
            <h2 className="chartTitle">Price Comparison</h2>
                <BarChart
                    width={800}
                    height={400}
                    data={this.state.barChart}
                    margin={{
                        top: 5,
                        right: 10,
                        left: 10,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Purchase" fill="#8884d8" />
                    <Bar dataKey="Current" fill="#82ca9d" />
                </BarChart>            
            </div>
            
        </div>         
        );
    }
}

export default Chart;
