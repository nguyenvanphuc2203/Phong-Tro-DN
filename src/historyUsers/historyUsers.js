import React, { Component } from 'react';
import { SERVER_URL } from '../config';

export default class HistoryUsers extends Component{
    constructor(props){
        super(props);
        this.state = {
            allUsers : []
        }
    }
    componentDidMount(){
        fetch( SERVER_URL+'/users' )
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          this.setState({allUsers:responseJson})
        })
        .catch((error) => {
          console.error(error);
        });
    }
    render(){
        return (
            <div className="">
                <button type="button" className="btn slide-toggle">Users Activity</button>
                <br/>
                <div className="box">
                    <div className="box-inner">
                        <ul class="list-group">
                            {
                                this.state.allUsers.map(user => 
                                    <a href={'http://fb.com/'+user.id} target="blank">
                                        <li class="list-group-item ">
                                        <img className="image-user-history" src={user.picture.data.url} width="300px" />
                                        {user.name}
                                        </li>
                                    </a>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}