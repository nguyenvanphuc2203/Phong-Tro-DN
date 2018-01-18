import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store/store';
import toastr from 'toastr';
import $ from "jquery";
import axios from 'axios';


class News extends Component {
  constructor(props){
    super(props);
    this.state = {
      friendList : [
          {
          "cover": {
            "source": "https://scontent.xx.fbcdn.net/v/t31.0-8/s720x720/19055119_10155618030644238_3519481588880388082_o.jpg?oh=9c66324f699e63dc512ac83b59bf6d52&oe=5AB09479"
          },
          "name": "Hoang Anh Phan",
          "id": "793199237"
        }
      ]
    }
    toastr.success('switched to new Feed!');

  }
  loadData(){
    var access_token = this.props.access_token;
    console.log(this.props);
    var url = 'https://graph.facebook.com/me?fields=id,name,friends{cover,name}&access_token='+access_token;
    axios.get(url)
    .then((response) => {
        console.log(response.data.friends.data);
        this.setState({ friendList : response.data.friends.data });
        toastr.success(response.data.name,'Success 25 Friend !');
    })
    .catch((error) => {
      toastr.error('Bạn chưa access token!');
      console.log(error)
    });
    console.log(this.state.friendList);
  }
  FriendFilter(){
    if ( this.refs.word.value !== '' )
      {
        console.log(this.refs.word.value);
        this.state.friendList = this.state.friendList.filter(p => p.name.indexOf(this.refs.word.value) > -1 );
        this.setState(this.state.friendList);

      }else toastr.warning('input is required!');

  }
  render() {
    return (

      <div>
        <div class="news">
          <input type="text" ref="word" onKeyUp={ this.FriendFilter.bind(this) } placeholder="Filter"/>
          <input type="submit" value="Load Danh sách bạn bè" onClick={this.loadData.bind(this)} />
        </div>
      {
        this.state.friendList.map(friend =>
          <div className="news">
          <img alt="Alex" src={ friend.cover.source } draggable="false"/>
            <div className="info">
              <b>{friend.name}</b>
              <p>{friend.id}</p>
            </div>
          </div>
        )
      }
      </div>
    );
  }
}

export default connect((state)=>state)(News)
