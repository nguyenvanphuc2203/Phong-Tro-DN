import React, { Component } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import axios from 'axios';
import { Redirect } from 'react-router';


class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      login : false
    }
  }
  LoginToken(){
    var url = 'https://graph.facebook.com/me?access_token='+this.refs.access_token.value;
    axios.get(url)
    .then((response) => {
        var { dispatch } = this.props;
        dispatch({ type : 'ADD_TOKEN', access_token:  this.refs.access_token.value } );
        dispatch({ type : 'ADD_USERNAME', username:  response.data.name } );
        toastr.success(response.data.name,'success auth!');
        this.setState({ login : true});
    })
    .catch((error) => {
      console.log(error);
      toastr.error(error)
    });
  }
  render(){
    if ( this.state.login ) return <Redirect to='/ChatBox'/>;
    return (
        <div className="container">
        <h3> lấy token tại <a href="https://developers.facebook.com/tools/explorer/" target="blank">ĐÂY!</a>  </h3>
        <div className="input-group">
            <input onMouseLeave={ this.LoginToken.bind(this) }  id="email" type="text" className="form-control" ref="access_token" placeholder="access_token"/>
            <div class="input-group-btn">
              <button class="btn btn-default" type="submit">
                <i class="fa fa-spinner fa-pulse fa-fw "></i>
              </button>
            </div>
        </div>
        </div>
    )
  }
}
export default connect((state)=> state)(Login)
