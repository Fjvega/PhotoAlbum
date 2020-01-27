import React, { Component } from 'react';
import '../CSS/navbar.css'
import '../CSS/secondSeccion.css'
import Animate from 'animate.css-react'
import 'animate.css/animate.css'

class SecondSeccion extends Component {
   


    render() 
    {   
        return(
           
            <div className="second_container" >
                 
                <img src="/logos/photo.svg"></img>
                <h1>                        
                    <span>Photo </span>
                    Album
                </h1>
                <div className="card_container">
                    <div className="card">
                        <div className="column1">
                            <div className="flip-card-inner">
                                <div className="flip-front">
                                    <img className="logo_card" src="/logos/add.svg"></img>
                                    <h3>Create account</h3>
                                </div>
                                <div className="flip-back">
                                    <h3>Secure your more precious moments</h3>
                                </div>


                            </div>
                           
                        </div>
                        
                    </div>
                    <div className="card">
                        <div className="column2">
                        <div className="flip-card-inner">
                                <div className="flip-front">
                                    <img className="logo_card" src="/logos/album.svg"></img>
                                    <h3>Create album</h3>
                                </div>
                                <div className="flip-back">
                                    <h3>Keep all your photos organize</h3>
                                </div>


                            </div>
                        </div>
                      
                    </div>
                    <div className="card">
                        <div className="column3">
                        <div className="flip-card-inner">
                                <div className="flip-front">
                                    <img className="logo_card" src="/logos/loupe.svg"></img>
                                    <h3>See information</h3>
                                </div>
                                <div className="flip-back">
                                    <h3>See relevant information of your photos</h3>
                                </div>


                            </div>
                        </div>
                       
                    </div>
                </div>


             
                

            </div>

        )
    }
}

export default SecondSeccion;    