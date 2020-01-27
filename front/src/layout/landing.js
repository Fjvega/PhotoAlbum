import React, { Component } from 'react';
import Navbar from '../components/navbar';
import FirstSeccion from '../components/firstSeccion';
import SecondSeccion from '../components/secondSeccion';
import Animate from 'animate.css-react'
import 'animate.css/animate.css'
import VisibilitySensor from "react-visibility-sensor";
import ThirdSeccion from '../components/thirdSeccion';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Redirect } from "react-router-dom";

class Landing extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          getElement: null,open:false,flag:false
        };
        this.logSucess=this.logSucess.bind(this);
      }

      componentDidMount()
      {
        if(this.state.flag==false && localStorage.getItem('sessionId')!==null)
        {
          this.setState({open:true,flag:true})
        }
      }







    logSucess()
    {
      this.setState({open:true,flag:true})
    }


    render() 
    {   
    
      if(this.state.open==true && this.state.flag==true) 
      {
        return(
        <Redirect to ="/gallery"/>
        )
      }
        
      
        return(

                   <div>
                     <NotificationContainer/>
                          <FirstSeccion></FirstSeccion>
                           <SecondSeccion></SecondSeccion>
                           <ThirdSeccion log={this.logSucess}></ThirdSeccion>
                   </div>

                   
   
        )
      
    }
    
}

export default Landing;    