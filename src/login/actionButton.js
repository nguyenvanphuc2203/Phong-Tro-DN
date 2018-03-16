import React, { Component } from 'react';


export default class actionButton extends Component{
    constructor(props){
        super(props);

    }
    responseFacebook (response){
        console.log(response);
    }
    render(){
        return (
           <div class="actionbutton">
            <div class="action-button action-button-main">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="action-button-child create-dashboard">
                <img src="http://image.flaticon.com/icons/svg/204/204324.svg"/>
                <p>Dashboard</p>
            </div>
            <div class="action-button-child create-teacher">
                <img src="http://image.flaticon.com/icons/svg/194/194933.svg"/>
                <p>Teacher</p>
            </div>
            <div class="action-button-child create-student">
                <img src="http://image.flaticon.com/icons/svg/194/194935.svg"/>
                <p>Student</p>
            </div>
            <div class="action-button-child create-school">
                <img src="http://image.flaticon.com/icons/svg/234/234606.svg"/>
                <p>School</p>
            </div>
            <div class="action-button-child create-sports">
                <img src="http://image.flaticon.com/icons/svg/194/194933.svg"/>
                <p>Sports</p>
            </div>
            <div class="action-button-child create-account">
                <img src="http://image.flaticon.com/icons/svg/204/204309.svg"/>
                <p>Account</p>
            </div>
            <div class="action-button-child create-logout">
                <img src="http://image.flaticon.com/icons/svg/174/174309.svg"/>
                <p>Logout</p>
            </div>

           </div>
        )
    }
}

