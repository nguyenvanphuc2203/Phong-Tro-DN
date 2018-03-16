import React, { Component } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import FacebookLogin from 'react-facebook-login';

class loginFacebook extends Component{
    constructor(props){
        super(props)
        this.state = {
            isLogin : false
        }
    }
    responseFacebook (response){
        console.log(response)
        var { dispatch } = this.props;
        dispatch({ type : 'LOGIN' , info: response} );
        this.setState({isLogin:true})
        toastr.success('Đăng nhập '+response.name,'SUCCESS' )
        console.log('Cập nhật thông tin '+response.name+' vào store thành công!')
    }
    logout(){
        var { dispatch } = this.props;
        this.setState({isLogin:false})
        dispatch({ type : 'LOGIN' , info: {name:"USERNAME", picture : { data : { url:"https://i.imgur.com/xuNCUjB.png"}}}} );
        toastr.warning('BẠN ĐÃ ĐĂNG XUẤT! ','THÀNH CÔNG' )
    }
    render(){
        if ( this.state.isLogin )
        return(
            
            <button onClick={this.logout.bind(this)} class="btn btn-success">
                <img src={this.props.user.picture.data.url} width="35px" />
                 ĐĂNG XUẤT
            </button>
        )
        else
        return (
            <FacebookLogin
                appId="1604253832985899"
                autoLoad={true}
                fields="name,email,picture"
                icon="fab fa-facebook "
                callback={this.responseFacebook.bind(this)} />
        )
    }
}

export default connect( (state) => state)(loginFacebook)