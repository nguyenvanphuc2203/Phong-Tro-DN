import React, { Component } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';

class Header extends Component{
  constructor(props){
    super(props);
  }
  clearMessage(){
    var { dispatch } = this.props;
    dispatch({ type : 'CLEAR' } );
    toastr.warning('cleared message in the store!')
  }

  render(){
    return (
          <div className="menu">
              <div className="back" onClick={ this.clearMessage.bind(this) }><i class="fa fa-chevron-left btn_back"></i> <img alt="Alex" src="https://i.imgur.com/DY6gND0.png" draggable="false"/></div>
              <div className="name">{ this.props.username ? this.props.username : "NONAME"  }</div>
              <div className="last">18:09</div>

          </div>
    )
  }
}
export default connect((state)=>{
  return state;
})(Header)
