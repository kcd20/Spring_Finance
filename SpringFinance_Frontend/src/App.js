import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HeaderComponent from './components/header/HeaderComponent'
import FooterComponent from './components/FooterComponent';
import DashboardMainComponent from './components/dashboard/DashboardMainComponent';
import ListAssetComponent from './components/asset/ListAssetComponent';
import CreateAssetComponent from './components/asset/CreateAssetComponent';
import InfoComponent from './components/asset/info/InfoComponent';
import UserInfoComponent from './components/userinfo/UserInfoComponent';
import UserProfileComponent from './components/userinfo/UserProfileComponent';
import LoginComponent from './components/LoginComponent';
import Watch from './components/watchlist/Watch';
import RegisterComponent from './components/RegisterComponent';
import RegisterSuccessComponent from './components/RegisterSuccessComponent';
import ChangePasswordComponent  from './components/ChangePasswordComponent';
import VerifyPasswordComponent from './components/VerifyPasswordComponent';

function App() {
  return (
    <div className="App">
      <Router>
        <HeaderComponent />     
          <div className="container">

            <Switch>
                <Route path = "/" exact component = {LoginComponent}></Route>
                <Route path = "/dashboard" component = {DashboardMainComponent}></Route>
                <Route path = "/assets" exact component = {ListAssetComponent}></Route>
                <Route path = "/login" exact component = {LoginComponent}></Route>
                <Route path = "/verify-password" exact component = {VerifyPasswordComponent}></Route>
                <Route path = "/change-password" exact component = {ChangePasswordComponent}></Route>
                <Route path = "/register" component = {RegisterComponent}></Route>
                <Route path = "/register-success" component = {RegisterSuccessComponent}></Route>
                <Route path = "/save-asset/:assetId" component = {CreateAssetComponent}></Route>
                <Route path = "/assets/info/:ticker" component = {InfoComponent}></Route>
                <Route path = "/userinfo" component = {UserInfoComponent}></Route>
                <Route path = "/userprofile" component = {UserProfileComponent}></Route>
                <Route exact path = "/watchlist"> <Watch/> </Route>
                <Route exact path = "/watchlist/:add"> <Watch/> </Route>
            </Switch>
          </div>
        <FooterComponent />  
      </Router>
    </div>
  );
}

export default App;
