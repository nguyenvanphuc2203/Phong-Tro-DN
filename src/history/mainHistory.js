import React, { Component } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import $ from "jquery";
import axios from 'axios';
import LoginFacebook from '../login/loginFacebook';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { SERVER_URL } from '../config';



class History extends Component {
  constructor(props){
    super(props);
    this.state = {
      historyData:[],
      isOpen: false
    }
    toastr.success('Click vào nhà trọ để xem chi tiết!');
  }
  toggle(){
    $("#wrapper").toggleClass("toggled");
  }
  componentWillMount(){
     fetch(SERVER_URL+'/history/'+this.props.user.id)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({historyData:responseJson})
      })
      .catch((error) => {
        console.error(error);
      });
  }
  changeStatus(id,status){
     // post data to server node 
     fetch(SERVER_URL+'/updatestatus', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        status: !status
      }),
    });
    toastr.success('Cập nhật status thành công !',status)
    this.componentWillMount()
  }
  deleteHistory(id){
    confirmAlert({
      title: 'Xóa Tin Này!',
      message: 'Are you sure delete this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            fetch(SERVER_URL+'/delete-history', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: id
            }),
          });
          toastr.success('Xóa thành công !')
          this.componentWillMount()
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    })
  }
  render() {
    var historyView
    if (this.state.historyData == 0){
      historyView = (
        <div className="row">
          Không có lịch sử
        </div>
      )
    }else{
      historyView = (
        <div >
          {
            this.state.historyData.map((history,index)=>
              <div className="row item_history">
                <div className="col-md-3">
                  <img src="https://i.imgur.com/7IgBxnH.jpg" width="100%" />
                </div>
                <div className="col-md-6">
                 <div className="row">{history.title}</div>
                 <div className="row">{history.price}</div>
                 {
                   history.status ? 
                   <button className="btn btn-default" onClick={()=> this.changeStatus(history._id,history.status)}> Đánh dấu Đã cho thuê</button>
                   :
                   <button className="btn btn-success" onClick={()=> this.changeStatus(history._id,history.status)}> Đánh dấu Chưa cho thuê</button>
                 }
                 <button className="btn btn-danger" onClick={()=> this.deleteHistory(history._id) }>Xóa</button>
                </div>
              </div>
            )
          }
        </div>
      )
    }
    return (
      <div className="maps">
        <div className="searchbox">
          <a  onClick={this.toggle}  id="menu-toggle">
            <i className="fas fa-2x fa-bars"></i>
          </a>
        </div>
        <div className="container_history">
        {(this.props.user.name === 'NO_USERNAME') ? 
          <div className="container">
            <LoginFacebook/>
          </div> : 
          historyView
        }
        </div>
        
      </div>
    );
  }
}
export default connect((state)=>state)(History)