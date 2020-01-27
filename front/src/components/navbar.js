import React, { Component } from 'react';
import '../CSS/navbar.css'
class Navbar extends Component {
   
   

    closeNav() {
        document.getElementById("sidenavbar").style.width ="0px";

    }

  openNav() {
    document.getElementById("sidenavbar").style.width ="250px";
    console.log('entre')
}
      





    render() 
    {   
        return(

            <div className="fondo_navbar">
                 
                <div className="logo_column">
                        <img src="./album.svg"></img>
                        <h3>DexGallery</h3>
                </div>
                <div className="buttons_column">

                    <ul>
         
                        <li>Home</li>
                        <li><a><span className="button_contact">Try it</span></a></li>
                                    

                    </ul>
                    <div id="sidenavbar" className="sidenav">
                        <a className="closebtn" onClick={this.closeNav}>&times;</a>
                        <div className="container_flex">
                            <div>
                                <a href="#">Home</a>
                                <a>Try it</a>
                            </div>                            

                        </div>
                    </div>
                    <span className="slide_menu"  onClick={this.openNav}>&#9776;</span>
                </div>

                

            </div>

        )
    }
}

export default Navbar;    