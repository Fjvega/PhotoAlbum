import React, { Component } from 'react';
import '../CSS/navbar.css'
import '../CSS/firstSeccion.css'
import Animate from 'animate.css-react'

class FirstSeccion extends Component {
    constructor(props) {
        super(props);
    

      }
componentDidMount()
{


}

    render() 
    {   
        return(
          
            <div className="first_container">
                 
                <img src="/background/background.jpeg"></img>
                <div>

                <Animate
                    leave="bounceOut" // on Leave animation
                    appear="bounceInDown" // on element Appear animation (onMount)
                    
                    durationAppear={1300}
                    durationLeave={1000}
                  
                    animate={true} // turn off/on animation, true by default
                    >
                        <h1>                        
                        Keep your images
                        in the same
                        place
                        </h1>

                </Animate>

                </div>
                

            </div>
          
        )
    }
}

export default FirstSeccion;    