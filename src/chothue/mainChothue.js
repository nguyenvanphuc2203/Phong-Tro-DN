import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store/store';
import toastr from 'toastr';
import $ from "jquery";
import axios from 'axios';
import Maps from './mapsChothue';
import LoginFacebook from '../login/loginFacebook';
class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,

    }
    toastr.success('Drag To Pick Location!','MẸO !');
  }
  toggle(){
    $("#wrapper").toggleClass("toggled");
  }
  postItem(){

  }
  render() {
    return (
      <div className="maps">
        <div className="searchbox">
          <a  onClick={this.toggle}  id="menu-toggle">
            <i class="fas fa-2x fa-bars"></i>
          </a>
        </div>
        {(this.props.user.name === 'NO_USERNAME') ? 
          <div className="container">
            <LoginFacebook/>
          </div> : 
          <Maps/>
        }
      </div>
    );
  }
}
export default connect((state)=>state)(Main)
