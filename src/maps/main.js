import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store/store';
import toastr from 'toastr';
import $ from "jquery";
import axios from 'axios';
import Maps from './maps';
import LoginFacebook from '../login/loginFacebook';

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false
    }
    toastr.success('Click vào nhà trọ để xem chi tiết!');
  }
  toggle(){
    $("#wrapper").toggleClass("toggled");
  }

  render() {
    return (
      <div className="maps">
        <div className="searchbox">
          <a  onClick={this.toggle}  id="menu-toggle">
            <i className="fas fa-2x fa-bars"></i>
          </a>
          
        </div>
        <div className="login-facebook">
            <LoginFacebook/>
        </div>
        <Maps/>
      </div>
    );
  }
}
export default connect((state)=>state)(Main)
