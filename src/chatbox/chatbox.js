import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from "socket.io-client";
import $ from "jquery";


class ChatBox extends Component{
    constructor(props){
        super(props);
        this.state = {
          messages : [
            { "content" : " hello" }
          ],
          message: ''
        }
        this.socket = io('localhost:8080');
    
        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });
    
        const addMessage = data => {
            $('#chatscroll').animate({ scrollTop: $(document).height() }, "slow");
            $('#chatinput').val('');
            console.log(data.message);
            this.setState({messages: [...this.state.messages, {"content" : data.message}]});
            console.log(this.state.messages);
        };
        this.sendMessage = ev => {
          if (ev.key === 'Enter') {
            this.socket.emit('SEND_MESSAGE', {
              message: this.refs.messageInput.value
            })
          }
          
        }
    }
    responseFacebook (response){
        console.log(response);
    }
    render(){
        return (
            <div className="chatbox wow slideInRight">
            <div className="chatlist" id="chatscroll">
             <div className="chat-container">
                 <div className="chat chat-left">
                   <img src={this.props.user.picture.data.url} width="50px" alt="" />
                 </div>
               </div>

               <div className="chat-container">
                 <div className="chat chat-left">ngũ hành sơn con trọ không? </div>
               </div>

               <div className="chat-container">
                 <div className="chat chat-right">ạ ? </div>
               </div>

               <div className="chat-container">
                 <div className="chat chat-right">sml? </div>
               </div>
               <div className="chat-container">
                 <div className="chat-container">
                   <div className="chat chat-left">=))</div>
                 </div>
               </div>
               {this.state.messages.map((message, index) =>
                  <div className="chat-container" key={index}>
                   <div className="chat chat-right">{message.content} </div>
                  </div>
               )}
            </div>
            <div >
             <input className="chatinput" id="chatinput" onKeyPress={this.sendMessage.bind(this)} ref="messageInput" placeholder="type to chat to everyone!" />
            </div>
         </div>
        )
    }
}

export default connect( (state) => state)(ChatBox)