import React, { Component } from 'react';
import ChoThue from './chothue/mainChothue';
import Maps from './maps/main';
import { BrowserRouter as Router,Route,Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import toastr from 'toastr';
import './App.css';
import ChatBox from './chatbox/chatbox';

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-bottom-right",
  "preventDuplicates": true,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
  }
// toastr config
class App extends Component {
  constructor(props){
    super(props);
    
  }
  
  render() {
    console.log(this.props.user)
    return (
      <Router>
        <Provider store={store}>
        <div id="wrapper">
            <div id="sidebar-wrapper">
                <ul className="sidebar-nav ">
                    <li className="sidebar-brand">
                    </li>
                    <li className="timtro_li">
                       <Link to="/"><i className="far fa-handshake"></i> TÌM TRỌ NGAY</Link>
                    </li>
                    <li className="chothuetro_li">
                        <a><Link to="/ChoThue"><i className="fas fa-bullhorn"></i> ĐĂNG TIN CHO THUÊ</Link></a>
                    </li>
                    <li>
                       <a onClick={()=>{toastr.error('Copyright Phuc nguyen')}}> ABOUT</a>
                    </li>
                    <ChatBox />
                </ul>
            </div>
            <div className="content">
              <Route exact path="/" component={Maps}/>
              <Route exact path="/ChoThue" component={ChoThue}/>
            </div>
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;