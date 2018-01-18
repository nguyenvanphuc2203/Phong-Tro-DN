import React, { Component } from 'react';
import { connect } from 'react-redux';

class MessageList extends Component{
  constructor(props){
    super(props);
  }
  render() {
    return (
        <div>
          <ol className="chat">
            {
              this.props.chat.map( content =>
                <li className="other">
                    <div className="avatar"><img src="https://i.imgur.com/5WUpcPZ.png" draggable="false"/></div>
                  <div className="msg">
                    <p >{content.nickname}</p>
                    <p>{content.message}</p>
                    <time>20:03</time>
                  </div>
                </li>
              )
            }
          </ol>
        </div>
    )
  }
}
export default connect(state => state)(MessageList)
