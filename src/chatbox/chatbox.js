import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from "socket.io-client";
import $ from "jquery";
import toastr from 'toastr';
import { SERVER_URL } from '../config';


class ChatBox extends Component{
    constructor(props){
        super(props);
        this.state = {
          messages : [],
          message: ''
        }
        this.socket = io( SERVER_URL );
    
        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });
    
        const addMessage = data => {
            $('#chatscroll').animate({ scrollTop: $(document).height() }, "slow");
            $('#chatinput').val('');
            console.log(data.message);
            this.setState({messages: [...this.state.messages, {"content" : data.message, picture: data.picture }]});
            console.log(this.state.messages);
        };
        this.sendMessage = ev => {
          if (ev.key === 'Enter') {
            if (this.props.user.name === 'NO_USERNAME')
              toastr.error('Vui lòng đăng nhập để chat','hi')
            else
              this.socket.emit('SEND_MESSAGE', {
                message: this.refs.messageInput.value,
                picture: this.props.user.picture.data.url
              })
          }
          
        }
    }
    responseFacebook (response){
        console.log(response);
    }
    render(){
        return (
            <div className="chatbox">
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
                 <div className="chat-container">
                   <div className="chat chat-left"> =))</div>
                 </div>
               </div>
               {this.state.messages.map((message, index) =>
                  ( message.picture === this.props.user.picture.data.url ) ? 
                    <div className="chat-container-right" key={index}>
                      <div className="chat chat-right" >{message.content} </div>
                      <img src={message.picture} alt="" />
                    </div>
                    :
                    <div className="chat-container" key={index}>
                      <img src={message.picture} alt="" />
                      <div className="chat chat-left" >{message.content} </div>
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