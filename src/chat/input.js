import React, { Component } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';

const KEY_CODE_ENTER = 13;

class Input extends Component{
  constructor(props){
    super(props);
    toastr.success('switched to Chat!');
  }
  checkEnter(e){
    if (e.keyCode === KEY_CODE_ENTER ) {
      var { dispatch } = this.props;
      if( this.props.username === '' ){
        toastr.error('You Need login!');
      }else if (this.refs.messageInput.value != '' ) {
        dispatch({ type : 'SEND' , item: { "nickname" : this.props.username , "message" : this.refs.messageInput.value }} );
        document.getElementById('text').value = '';
        toastr.success('added message in the store!');
        window.scrollTo(0,document.body.scrollHeight);
      }else{
        toastr.error('input is required!');
      }
    }
  }
  render(){
    return (
      <div>
        <input onKeyUp={this.checkEnter.bind(this)} id="text" ref='messageInput' className="textarea" type="text" placeholder="Type here!"/><div class="emojis"></div>
      </div>
    )
  }
}
export default connect((state)=> state)(Input)
