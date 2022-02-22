import React, { Component } from 'react';
import "./dashboard.css"
import {ArrowDownward, ArrowUpward} from '@mui/icons-material';
import AssetService from '../../services/AssetService';

class FeaturedItems extends Component {
    constructor(props){
        super(props)
            this.state={
                assets: [],
                maxName: "",
                max: 0,
                minName: "",
                min: 0,
                sum: 0,
                totalPurchase: 0,
                currentValue: 0,
                datePurchasedMax: "",
                datePurchasedMin: ""
        }
    }

    componentDidMount(){
        AssetService.getAssets().then((res) => {
            this.setState({assets: res.data});
            let totalGain = 0;
            let tp = 0;
            let cv = 0;
            let maxValue = this.state.assets[0].gain;
            let minValue = this.state.assets[0].gain;

            for (let i= 0; i< this.state.assets.length; i++){               

                let latestPrice = this.state.assets[i].latestPrice;
                let purchasePrice = this.state.assets[i].purchasePrice;

                if (this.state.assets[i].gain >= maxValue){
                    maxValue = this.state.assets[i].gain
                    this.setState({max: maxValue});
                    this.setState({maxName: this.state.assets[i].symbol});
                    this.setState({datePurchasedMax: this.state.assets[i].datePurchased})
                }

                if (this.state.assets[i].gain <= minValue){
                    minValue = this.state.assets[i].gain
                    this.setState({min: minValue});
                    this.setState({minName: this.state.assets[i].symbol});
                    this.setState({datePurchasedMin: this.state.assets[i].datePurchased})
                }

                let holdings = this.state.assets[i].holdings;
                totalGain += (latestPrice * holdings) - (purchasePrice * holdings);
                this.setState({sum : totalGain});

                tp += (purchasePrice * holdings)
                this.setState({totalPurchase : tp});

                cv += (latestPrice * holdings);
                this.setState({currentValue : cv});

            }

        })
    }

    getTitle(){
        if(this.state.sum > 0){
            return "Total Asset Gain"
        } else {
            return "Total Asset Loss"
        }
    }

    getDiffPercent(totalPurchase, currentValue){
        return (currentValue-totalPurchase)/totalPurchase * 100
    }

    displayArrow(gain){
        if(gain >= 0){
            return <ArrowUpward style={{color: "green"}}/>
        } else {
            return <ArrowDownward style={{color: "red"}} />
        }
    }

    render() {
        return(
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Best Performing Asset</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{this.state.maxName}</span>
                    <span className="featuredMoneyRate">
                        {this.state.max}% {this.displayArrow(this.state.max)}
                    </span>
                </div>
                <span className="featuredSub">Compared to Purchase Price on {this.state.datePurchasedMax}</span>
            </div>
    
            <div className="featuredItem">
                <span className="featuredTitle">Worst Performing Asset</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{this.state.minName} </span>
                    <span className="featuredMoneyRate">
                        {this.state.min}% {this.displayArrow(this.state.min)}
                    </span>
                </div>
                <span className="featuredSub">Compared to Purchase Price on {this.state.datePurchasedMin}</span>
            </div>
    
            <div className="featuredItem">
                <span className="featuredTitle">{this.getTitle()}</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{(this.state.sum).toFixed(2)}</span>
                    <span className="featuredMoneyRate">{this.getDiffPercent(this.state.totalPurchase, this.state.currentValue).toFixed(2)}% {this.displayArrow(this.getDiffPercent(this.state.totalPurchase,this.state.currentValue))}
                    </span>
                </div>
                <span className="featuredSub">Compared to Total Purchase Value</span>
            </div>
        </div>

        
      ) 
    }
}

export default FeaturedItems;
