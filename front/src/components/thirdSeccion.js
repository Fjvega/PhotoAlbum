import React, { Component } from "react";
import "../CSS/navbar.css";
import "../CSS/thirdSeccion.css";
import Animate from "animate.css-react";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { IP } from '../Resources'

class ThirdSeccion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      password2: "",
      usernameLog: "",
      passwordLog: ""
    };

    this.handleChange=this.handleChange.bind(this);
    this.handleLog=this.handleLog.bind(this);
    this.handleRegister=this.handleRegister.bind(this);


  }
  handleChange(event) {
    
    let nam = event.target.name;
    let val = event.target.value;


    this.setState({[nam]: val});
    console.log(this.state)
  }

  state = {
    username: 'hola',
    password: '',
    password2: '',
    usernameLog: '',
    passwordLog: ''
  };



  handleLog() {
    const that = this;
    if (
      this.state.usernameLog !== "" &&
      this.state.passwordLog !== "" 
    ) {
        var options = {
            method: 'POST',
            body:
            JSON.stringify({'username':this.state.usernameLog,
            'password':this.state.passwordLog}),
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Content-Type':'application/json; charset=utf-8',
                'Accept': 'application/json',
              
            },
            json: true,
            json:'true',

          };
          
                fetch(IP+'/users/log', options)
                  .then(response => response.json())
                  .then(success => {
                      console.log(success['state'])
                      if(success['state']=='success')
                      {
                        NotificationManager.success("Success", "Log");
                        localStorage.setItem('sessionId',success['token']);
                        that.props.log()
                      }else
                      {
                        NotificationManager.error("Error", "Password and username dont match");
                        

                      }
                   
                  })
                  .catch(error => {console.log(error)
                    NotificationManager.error('Try it later', 'Something wrong happend');
                    
                
                })
  
    }else
    {
        NotificationManager.error("Error", "Empty fields");
    }
  }

  handleRegister() {
    const that = this;
    if (
      this.state.password !== "" &&
      this.state.password2 !== "" &&
      this.state.username !== ""
    ) {
      if (this.state.password != this.state.password2) {
        NotificationManager.error("Error", "Password dont match");
      }else
      {

        var options = {
            method: 'POST',
            body:
            JSON.stringify({'username':this.state.user,
            'password':this.state.password}),
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Content-Type':'application/json; charset=utf-8',
                'Accept': 'application/json',
              
            },
            json: true,
            json:'true',

          };
          
                fetch(IP+'/users/add', options)
                  .then(response => response.json())
                  .then(success => {
                      console.log(success['state'])
                      if(success['state']=='success')
                      {
                        NotificationManager.success("Success", "You create a new user");
                        that.setState({username:'',password:'',password2:''});                
                      }else
                      {
                        NotificationManager.error("Error", "You already have a account with this email");
                        that.setState({username:'',password:'',password2:''}); 

                      }
                   
                  })
                  .catch(error => {console.log(error)
                    NotificationManager.error('Try it later', 'Something wrong happend');
                    
                
                }
                );
       
      }
    }else
    {
        NotificationManager.error("Error", "Empty fields");
    }
  }

  render() {
    return (
      <div className="third_container">
        <img src="/background/backgroundLog.jpg"></img>
        <div>
          <div className="card_log">
            <div className="left">
              <h2>Register</h2>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <input
                type="password"
                name="password2"
                id="password2"
                placeholder="Retype password"
                value={this.state.password2}
                onChange={this.handleChange}
              />
              <input type="submit" name="signup_submit" value="Sign me up" onClick={this.handleRegister}/>
            </div>
            <div className="right">
              <h2>Login</h2>
              <input
                type="text"
                name="usernameLog"
                placeholder="Username"
                value={this.state.usernameLog}
                onChange={this.handleChange}
              />
              <input
                type="password"
                name="passwordLog"
                placeholder="Password"
                value={this.state.passwordLog}
                onChange={this.handleChange}
              />
              <input type="submit" name="signup_submit" value="Log me up"onClick={this.handleLog} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ThirdSeccion;
