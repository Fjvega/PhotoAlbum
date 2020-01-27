import React, { Component } from 'react';
import '../CSS/cardSearch.css'
import '../CSS/firstSeccion.css'
import {
      NotificationContainer,
      NotificationManager
    } from "react-notifications";

class CardSearch extends Component {
    constructor(props) {
        super(props);
    
      this.handleChange=this.handleChange.bind(this);
      this.sendInfo= this.sendInfo.bind(this);
      }
state={
      name:'',
      initDate:'',
      finalDate:'',
}
handleChange(event) {
    
            let nam = event.target.name;
            let val = event.target.value;

            if(nam==='initDate')
            {
                  this.setState({[nam]: val,finalDate:val});
            }else
            {
                  this.setState({[nam]: val});
            }
           
            console.log(this.state)
}
 
sendInfo()
{
      if(this.state.initDate=='' && this.state.finalDate=='' && this.state.name=='')
      {
            NotificationManager.error("Empty Fields", "Error");
      }else
      {
            var send1,send2
            if(this.state.initDate=='' || this.state.initDate==undefined)
            {
                  send1='none'
            }else{
                  send1=this.state.initDate
            }

            if(this.state.finalDate=='' || this.state.finalDate==undefined)
            {
                  send2='none'
            }else
            {
                  send2=this.state.finalDate
            }

            
            this.props.send(this.state.name,send1,send2)
      }
}
    render() 
    {   
        return(
          
            
            <div className="card_search">
                   <h2>Search</h2>
                   <div className="tittle_container">
                         <h3>Search by name</h3>
                   </div>
                   <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />

                   <div className="tittle_container">
                         <h3>Search by date</h3>
                   </div>

                   <div className="date_container">
                         <h4 style={{display:'inline-block'}}>Initial date:</h4>
                         <input type="date" name="initDate" placeholder="Initial date" value={this.state.initDate} onChange={this.handleChange} />
                   </div>
                   
                   <div className="date_container">
                         <h4 style={{display:'inline-block'}}>Final date:</h4>
                         <input type="date" name="finalDate" placeholder="Final date"  value={this.state.finalDate} onChange={this.handleChange} />
                   </div>
                   <h3></h3>
                   <input type="submit" name="search_submit" value="Search" onClick={this.sendInfo} />

            </div>   

          
        )
    }
}

export default CardSearch;    