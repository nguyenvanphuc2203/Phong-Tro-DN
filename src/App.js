import React, { Component } from 'react';
import Chat from './chat/home';
import News from './news/news';
import Login from './login/login';
import { BrowserRouter as Router,Route,Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import toastr from 'toastr';
import './App.css';

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
    return (
      <Router>
        <Provider store={store}>
          <div>
            <div>
              <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                  <div class="navbar-header">
                    <a class="navbar-brand" href="#">ReactJs/redux</a>
                  </div>
                  <ul class="nav navbar-nav">
                    <li class="active"><Link to="/">FriendList</Link></li>
                    <li><Link to="/ChatBox">Message</Link></li>
                  </ul>
                  <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                  </ul>
                </div>
              </nav>
            </div>

            <Route exact path="/" component={News}/>
            <Route exact path="/ChatBox" component={Chat}/>
            <Route exact path="/login" component={Login}/>
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
