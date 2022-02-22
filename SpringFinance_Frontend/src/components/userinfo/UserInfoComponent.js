import React, { Component , useState, useEffect} from 'react';
import UserService from '../../services/UserInfoService';
import {Card, Table, Form, Col, Row, Button, FloatingLabel, InputGroup, FormControl} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faSave, faUndo} from '@fortawesome/free-solid-svg-icons';

import {Container, Paper} from '@material-ui/core';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import Cookies from "universal-cookie";
import UserInfoService from '../../services/UserInfoService';

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
  }



initialState = {
    firstName: '', lastName: '', additionalInformation: '', ageType: '', cash: '', riskLevel: '', interest1: '', interest2: '', interest3: ''
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
        alert(" Your details has been updated successfully!!");
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
                <Card.Header><FontAwesomeIcon icon={faList}/> Update Details Form</Card.Header>
                <Card.Body>
                    <Form onReset={this.resetUser} onSubmit={this.submitUser} id="userFormId">

                        <br/>
                        <br/>

                        <Form.Label as={Col}>Enter Cash:</Form.Label>
                          <InputGroup className="mb-3">
                          
                            <InputGroup.Text>$</InputGroup.Text>
                            <FormControl required type="number" value={this.state.cash}  autoComplete="off"
                            name="cash" onChange={this.updateInfo}  placeholder="Cash Amount"  aria-label="Amount (to the nearest dollar)" />
                            <InputGroup.Text>.00</InputGroup.Text>
                        </InputGroup>
                        <br/>
                        <Form.Label as={Col}>Portfolio stocks looses half its value over the next 12 months, what will you do?</Form.Label>
                        <br/>
                        <Form.Control required as="select" type="select" name="riskLevel" onChange={this.updateInfo} value={this.state.riskLevel}>
                            <option value="null">-Select Option-</option>
                            <option value="Sell remaining portfolio and move to cash (Very Low)">Sell remaining portfolio and move to cash</option>
                            <option value="Sell some assets and hold the rest (Low)">Sell some assets and hold the rest</option>
                            <option value="Do nothing and wait it out (Moderate)">Do nothing and wait it out</option>
                            <option value="Buy more assets (High)">Buy more assets</option>
                            <option value="Buy everything you can and buy even more (Very High)">Buy everything you can and buy even more</option>
                        </Form.Control>

                        <br/>
                        <br/>
                        
                        <Form.Label as={Col}>Please Select 3 of your interests</Form.Label>
                        <br/>
                        <Row className="mb-3">
                        <Form.Group as={Col}>
                        <Form.Control required as="select" type="select" name="interest1" onChange={this.updateInfo} value={this.state.interest1}>
                            <option value="null">-Select Interest-</option>
                            <option value="cryptocurrency">Cryptocurrency</option>
                            <option value="technology">Technology</option>
                            <option value="bonds">Bonds</option>
                            <option value="etf">ETFs</option>
                            <option value="options">Options</option>
                            <option value="forex">Forex</option>
                            <option value="stocks">Stocks</option>
                            <option value="asia">Asia Market</option>
                            <option value="china">China Market</option>
                            <option value="europe">Europe Market</option>
                            <option value="us">US Market</option>
                            <option value="the fed">The Fed</option>
                            <option value="reit">REIT</option>
                        </Form.Control>
                        </Form.Group>
                        <br/>
                        <br/>
                        <Form.Group as={Col}>
                        <Form.Control required as="select" type="select" name="interest2" onChange={this.updateInfo} value={this.state.interest2}>
                            <option value="null">-Select Interest-</option>
                            <option value="cryptocurrency">Cryptocurrency</option>
                            <option value="technology">Technology</option>
                            <option value="bonds">Bonds</option>
                            <option value="etf">ETFs</option>
                            <option value="options">Options</option>
                            <option value="forex">Forex</option>
                            <option value="stocks">Stocks</option>
                            <option value="asia">Asia Market</option>
                            <option value="china">China Market</option>
                            <option value="europe">Europe Market</option>
                            <option value="us">US Market</option>
                            <option value="the fed">The Fed</option>
                            <option value="reit">REIT</option>
                        </Form.Control>
                        </Form.Group>
                        <br/>
                        <br/>
                        <Form.Group as={Col}>
                        <Form.Control required as="select" type="select" name="interest3" onChange={this.updateInfo} value={this.state.interest3}>
                            <option value="null">-Select Interest-</option>
                            <option value="cryptocurrency">Cryptocurrency</option>
                            <option value="technology">Technology</option>
                            <option value="bonds">Bonds</option>
                            <option value="etf">ETFs</option>
                            <option value="options">Options</option>
                            <option value="forex">Forex</option>
                            <option value="stocks">Stocks</option>
                            <option value="asia">Asia Market</option>
                            <option value="china">China Market</option>
                            <option value="europe">Europe Market</option>
                            <option value="us">US Market</option>
                            <option value="the fed">The Fed</option>
                            <option value="reit">REIT</option>
                        </Form.Control>
                        </Form.Group>
                    </Row>
                        <br/>
                        <br/>

                        <FloatingLabel controlId="floatingTextarea2">
                            <Form.Control
                            as="textarea"
                            name="additionalInformation"
                            autoComplete="off"
                            //value={this.values.additionalInformation}
                            value={this.state.additionalInformation}
                            //onChange={(e)=> setAdditionalInformation(e.target.value)}
                            onChange={this.updateInfo} 
                            placeholder="Add Additional Information Here"
                            style={{ height: '100px' }}
                            />
                        </FloatingLabel>
                    
                    <Button size = "sm" variant="success" type="submit" ><FontAwesomeIcon icon={faSave}/> Update Details</Button>
                    <br/>
                    <br/>
                    </Form>
                </Card.Body>
                <Card.Footer style={{"textAlign": "center"}}>
                    
                </Card.Footer>
            </Card>
        )
    }
}

//export default UserInfoComponent