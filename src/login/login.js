import React, { Component } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import axios from 'axios';



class Login extends Component{

  LoginToken(){
    var url = 'https://graph.facebook.com/me?access_token='+this.refs.access_token.value;
    axios.get(url)
    .then((response) => {
        var { dispatch } = this.props;
        dispatch({ type : 'ADD_TOKEN', access_token:  this.refs.access_token.value } );
        dispatch({ type : 'ADD_USERNAME', username:  response.data.name } );
        toastr.success(response.data.name,'success auth!')
    })
    .catch((error) => {
      console.log(error);
      toastr.error(error)
    });
  }
  render(){
    return (
        <div className="container">
        <div className="input-group">
            <input id="email" type="text" className="form-control" ref="access_token" placeholder="access_token"/>
            <div class="input-group-btn">
              <button onClick={ this.LoginToken.bind(this) } class="btn btn-default" type="submit">
                <i class="glyphicon glyphicon-chevron-right"></i>
              </button>
            </div>
        </div>
        </div>
    )
  }
}
export default connect((state)=> state)(Login)
