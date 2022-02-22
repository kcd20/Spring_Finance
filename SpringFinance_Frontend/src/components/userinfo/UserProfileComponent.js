import React, { Component , useState, useEffect} from 'react';
import UserService from '../../services/UserInfoService';
import {Card, Table, Form, Col, Row, Button, FloatingLabel, Carousel, InputGroup, FormControl, Modal, show, ListGroup, ListGroupItem, Popover, OverlayTrigger} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faSave, faUndo, faUser} from '@fortawesome/free-solid-svg-icons';

import {Container, Paper} from '@material-ui/core';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import Cookies from "universal-cookie";
import UserInfoService from '../../services/UserInfoService';
import AssetService from "../../services/AssetService";

const cookies = new Cookies();
export default class User extends React.Component{

constructor(props){
    super(props);
    this.state = this.initialState;//{firstName:'', lastname:'', additionalInformation: ''}; //Where you store state objects
    this.updateInfo = this.updateInfo.bind(this);
    this.submitUser = this.submitUser.bind(this);
     if (cookies.get("userName") === undefined) {
      this.props.history.push("/login");
    }
}

 componentDidMount() {
    UserInfoService.getUsersById(cookies.get("userId")).then((response) =>{
         this.setState({firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        ageType: response.data.ageType,
                        cash:response.data.cash,
                        riskLevel:response.data.riskLevel,
                        interest1:response.data.interest1,
                        interest2:response.data.interest2,
                        interest3:response.data.interest3,
                        additionalInformation:response.data.additionalInformation
                                    }); 
    })

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

initialState = {
    firstName: '', lastName: '', additionalInformation: '', ageType: '', cash: 0, riskLevel: '', interest1: '', interest2: '', interest3: ''
    , assets: [],
    sumCurrent: 0,
    sumPurchase: 0,
    sumGain: 0,
    sum: 0,
}

Sum=()=>{
  var n1 = this.state.cash;
  var n2 = this.state.sumCurrent;

  var R = n1 + n2;
  this.setState({sum: R});
}


submitUser = event => {
    
    event.preventDefault();
    
    const user = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        additionalInformation: this.state.additionalInformation,
        ageType:this.state.ageType,
        cash:this.state.cash,
        riskLevel:this.state.riskLevel,
        interest1:this.state.interest1,
        interest2:this.state.interest2,
        interest3:this.state.interest3
    };


    UserInfoService.updateUser(cookies.get("userId"),user).then((response) =>{
        alert(" Your personal details was updated successfully!!");
    })

}

updateInfo(event){
    this.setState({
        [event.target.name]:event.target.value
    });
}




render(){

        //const{firstName, lastName, additionalInformation} = this.stats;

        return(
          
            <Card className={"border border-dark bg-dark text-white"}>
              
                <Card.Header><FontAwesomeIcon icon={faUser}/> <br/>{this.state.firstName}'s Profile</Card.Header>
                <Card.Body>
                <Carousel fade>
                    <Carousel.Item style={{'height':"300px"}} >
                    <br/>
                    <br/>
                    <br/>
                    <h5>You have ${this.state.cash.toFixed(2)} in Cash</h5>
                    <br/>
                    <Button onClick={this.Sum}>Reveal Net Worth</Button>
                    <br/>
                    <br/> 
                    <h5> ${this.state.sum.toFixed(2)}</h5>
                    </Carousel.Item>
                    <Carousel.Item style={{'height':"300px"}} >
                      <br/>
                      <br/>
                      <br/>
                    <h5>Your interests are:</h5> 
                      <br/>
                      <Card.Text>{this.state.interest1}</Card.Text>
                      <Card.Text> {this.state.interest2}</Card.Text>
                      <Card.Text> {this.state.interest3}</Card.Text>
                    </Carousel.Item>
                    <Carousel.Item style={{'height':"300px"}} >
                    <br/>
                    <br/>
                    <br/>
                    <h5>Your Risk Tolerance is: </h5>
                    <p>(In the event portfolio stocks lost half its value over the next 12 months)</p>
                    <br/>
                    <h5>{this.state.riskLevel}</h5>
                    </Carousel.Item>
                  </Carousel>
                    <br/>
                    <Card style={{ width: '65rem' }} className={"border border-dark bg-dark text-white"}>

                  </Card>
                    
                   
                </Card.Body>
                <Card.Footer style={{"textAlign": "center"}}>
                     <Form onReset={this.resetUser} onSubmit={this.submitUser} id="userFormId">
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control required type="text" name="firstName" autoComplete="off"
                            //value={this.values.firstName}
                            value={this.state.firstName} 
                            //onChange={(e)=> setFirstName(e.target.value)}
                            onChange={this.updateInfo} 
                            placeholder="First Name" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control required type="text"  autoComplete="off"
                            name="lastName" 
                            //value={this.values.lastName}
                            value={this.state.lastName}
                            //onChange={(e)=> setLastName(e.target.value)}
                            onChange={this.updateInfo} 
                            placeholder="Last Name" />
                            </Form.Group>
                        </Row>
                        
                        <Form.Label as={Col}>Age Range</Form.Label>
                        <Form.Control required as="select" type="select" name="ageType" onChange={this.updateInfo} value={this.state.ageType}>
                            <option value="null">-Select Age Type-</option>
                            <option value="18 to 25">18 to 25</option>
                            <option value="26 to 35">26 to 35</option>
                            <option value="36 to 45">36 to 45</option>
                            <option value="46 to 55">46 to 55</option>
                            <option value="56 to 70">56 to 70</option>
                            <option value="70 and above">70 and above</option>
                        </Form.Control>

                        <br/>
                        <br/>

                    <Button size = "sm" variant="success" type="submit" ><FontAwesomeIcon icon={faSave}/> Update Personal Details</Button>
                    <br/>
                    <br/>
                    </Form>
                </Card.Footer>
            </Card>
        )
    }

}

