import React, { Component } from 'react';
import Header from './header';
import Input from './input';
import MessageList from './message-list';


class Home extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (

        <div className="App">
          <p className="App-intro">
            <div className="message-list">
                <Header />
                <MessageList />
                <Input />
            </div>
          </p>
        </div>
    );
  }
}

export default Home;
