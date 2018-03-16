import React, { Component } from 'react';
import { BrowserRouter as Router,Route,Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store';
import $ from "jquery";
import toastr from 'toastr';
import ImageUpload from './imageUpload';


class FromChoThue extends Component {
  constructor(props){
    super(props);

  }
  postItem(){
    // post data to server node 
    fetch('https://phongtro-nodejs.herokuapp.com/postitem', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lat: this.refs.lat.value,
        lng: this.refs.lng.value,
        title: this.refs.title.value,
        price: this.refs.price.value,
      }),
    });
    toastr.error('vui lòng điền đầy đủ thông tin !')
  }
  render() {
    console.log(this.props.location.lat())
    return (
        <div class="form-post">
          <div class="row">
            <div class="col-md-6">
              <input class="input-post" ref="lat" type="hidden" placeholder="lat" value={this.props.location.lat()}/>
              <input class="input-post" ref="lng" type="hidden" placeholder="lng" value={this.props.location.lng()}/>
              <input class="input-post" ref="location" type="text" placeholder="vị trí" value={this.props.formatted_address}/>
              <input class="input-post" ref="title" type="text" placeholder="Tiêu đề tin"/>
              <input class="input-post" ref="price"  placeholder="Giá/Tháng"/>
              <input class="input-post" type="text" placeholder="Số Điện thoại * bắt buộc"/>
              <input class="input-post" type="text" placeholder="Wifi"/>
              <input class="input-post" type="text" placeholder="Gác lửng"/>
              <input class="input-post" type="text" placeholder="Giờ giấc"/>
              <input  onClick={this.postItem.bind(this)}  class="btn btn-success button-input-post" type="submit" value="ĐĂNG TIN!"/>
            </div>
            <div class="col-md-6">
              <div class="imageUpload">
                <ImageUpload/>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default FromChoThue;
