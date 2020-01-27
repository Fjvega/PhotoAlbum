import React, { Component } from "react";
import Animate from "animate.css-react";
import "animate.css/animate.css";
import SideNav, { MenuIcon } from "react-simple-sidenav";
import "../CSS/gallery.css";
import "../CSS/modal.css";
import CardSearch from "../components/cardSearch";
import Popup from "reactjs-popup";
import { IP } from "../Resources";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { Redirect } from "react-router-dom";
import GalleryGrid from "../components/galleryGrid";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNav: false,
      open: true,
      openModal: false,
      url: "",
      file: null,
      name: "",
      changeview: false,
      flag: false,
      realName: "",
      reloadGallery: true,
      openModalOptions: false,
      albumSelectedPhoto: "",
      nameSelectedPhoto: "",
      realNameSelectedPhoto: "",
      urlSelected: IP + "/photos/get/",
      dateSelectedPhoto: "",
      albums: [],
      selectValue: 'default',
      newAlbum :'',
      currentSelectedAlbum:'default',
      photos:[],
      changeNewAlbum:'',
      searchName:'',
      initialDate:'',
      finalDate:''
    };

    this.addFile = this.addFile.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.sendFile = this.sendFile.bind(this);
    this.logout = this.logout.bind(this);
    this.setSelectedImage = this.setSelectedImage.bind(this);
    this.createOptions = this.createOptions.bind(this);
    this.handleChange= this.handleChange.bind(this);
    this.createNewAlbum= this.createNewAlbum.bind(this);
    this.handleAlbum= this.handleAlbum.bind(this);
    this.changeNewAlbum= this.changeNewAlbum.bind(this);
    this.deletePhoto= this.deletePhoto.bind(this);
    this.getSearch=this.getSearch.bind(this)
   
  }

  addFile(event) {
    console.log(event.target.files[0]);

    if (event.target.files[0] != null) {
      this.setState({
        file: event.target.files[0],
        realName: event.target.files[0].name,
        openModal: true,
        url: window.URL.createObjectURL(event.target.files[0])
      });
    }
  }

  closeModal() {
    this.setState({ file: null, openModal: false });
  }

  sendFile(ev) {
    const that = this;
    ev.preventDefault();

    const data = new FormData();

    // form construction
    data.append("file", this.state.file);
    data.append(
      "json",
      JSON.stringify({
        user: this.state.name,
        album: this.state.selectValue,
        filename: this.state.realName
      })
    );

    var options = {
      method: "POST",
      body: data,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    };
    this.setState({ reloadGallery: false, openModal: false });
    fetch(IP + "/photos/add", options)
      .then(response => response.json())
      .then(success => {
        console.log(success["state"]);
        if (success["state"] == "success") {
          NotificationManager.success("File save", "File notification");
          that.setState({ reloadGallery: true },this.getNewPhotos(that.state.name,that.state.currentSelectedAlbum));
        } else {
          NotificationManager.error("Try it later", "Something wrong happend");
          that.setState({ reloadGallery: true });
        }
      })
      .catch(error => {
        console.log(error);
        NotificationManager.error("Try it later", "Something wrong happend");
        that.setState({ reloadGallery: true });
      });
  }

  componentWillMount() {
    if (this.state.flag == false && localStorage.getItem("sessionId") == null) {
      this.setState({ changeview: true, flag: true });
    }
  }

  componentDidMount() {
    const that = this;

    var options = {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json"
      }
    };
    const url = String(localStorage.getItem("sessionId"));
    fetch(IP + "/users/getinfo/" + url, options)
      .then(response => response.json())
      .then(success => {
        console.log(success["albums"]);

        let options = success["albums"].map(function(name) {
          return { id: name, name: name };
        });
        console.log(options);
        that.setState({ name: success["name"], albums: success["albums"] },that.getNewPhotos(success['name'],that.state.currentSelectedAlbum));
      })
      .catch(error => {
        console.log(error);
      });
  }

  logout() {
    console.log("CLICK");
    localStorage.clear();
    this.setState({ changeview: true });
  }

  /*Set the image for the modal view */
  setSelectedImage(name, realname, album, date) {
    console.log(name);
    this.setState({
      realNameSelectedPhoto: realname,
      nameSelectedPhoto: name,
      albumSelectedPhoto: album,
      dateSelectedPhoto: date,
      changeNewAlbum:album,
      openModalOptions: true
    });
  }

  /**Create options for select of the Albums */
  createOptions() {
    let options = this.state.albums.map(function(name) {
      return <option value={name}>{name}</option>;
    });

    return options;
  }

  handleChange(event) {
    
    let nam = event.target.name;
    let val = event.target.value;


    this.setState({[nam]: val});
    console.log(this.state)
  }

/*Create a new Album */
  createNewAlbum()
  {
    const that=this;
    if(this.state.newAlbum!=='')
    {
    var options = {
        method: 'POST',
        body:
        JSON.stringify({'token':localStorage.getItem('sessionId'),
        'album':this.state.newAlbum}),
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type':'application/json; charset=utf-8',
            'Accept': 'application/json',
          
        },
        json: true,
        json:'true',

      };
      
            fetch(IP+'/users/addAlbum', options)
              .then(response => response.json())
              .then(success => {
                  console.log(success['state'])
                  if(success['state']=='success')
                  {
                    if(that.state.albums.includes(that.state.newAlbum))
                    {
                        NotificationManager.error("Fail", "This album already exist");
                    }
                    else{
                        NotificationManager.success("Success", "New album has been created");
                        let temp= that.state.albums
                        temp.push(that.state.newAlbum)
                        that.setState({albums:temp,newAlbum:''})
                    }
                  }
               
              })
              .catch(error => {console.log(error)
                NotificationManager.error('Try it later', 'Something wrong happend');
                
            
            })

        }else
        {
            NotificationManager.error("Fail", "Empty field");
        }
  }


  /*Get all the photos of a Album */
  getNewPhotos(name,currentSelectedAlbum){
    const that = this;

    var options = {
        method: 'GET',
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type':'application/json; charset=utf-8',
            'Accept': 'application/json',
          
        },

      };
      this.setState({reloadGallery:false})
        const url='/photos/get/'+name+'/'+currentSelectedAlbum
        console.log(url)

            fetch(IP+url, options)
              .then(response => response.json())
              .then(success => {

               console.log(success)
               //that.props.stop()
               that.setState({photos:success['photos']}, that.setState({reloadGallery:true}))
              })
              .catch(error => {console.log(error)
             
                
            
            })
  }

  /*Change the album display in the grid */
  handleAlbum(event) {
    
    let val = event.target.value;
    console.log(val)

    if(this.state.currentSelectedAlbum!=val)
    {
      this.setState({currentSelectedAlbum:val},this.getNewPhotos(this.state.name,val))
    }
    

  }

/*Change Album from a photo */
  changeNewAlbum()
  {
    const that=this;
    var options = {
      method: 'POST',
      body:
      JSON.stringify({'name':this.state.nameSelectedPhoto,
      'album':this.state.changeNewAlbum}),
      headers:{
          'Access-Control-Allow-Origin': '*',
          'Content-Type':'application/json; charset=utf-8',
          'Accept': 'application/json',
        
      },
      json: true,
      json:'true',

    };
    
          fetch(IP+'/photos/updateAlbum', options)
            .then(response => response.json())
            .then(success => {
                console.log(success['state'])
                if(success['state']=='success')
                {
                  NotificationManager.success("Success", "You successfully change a Photo to another Album");
                  that.setState({openModalOptions:false}, that.getNewPhotos(that.state.name,that.state.currentSelectedAlbum))
                 
                }else
                {
                  NotificationManager.error("Error", "Something wrong happend");
                  

                }
             
            })
            .catch(error => {console.log(error)
              NotificationManager.error('Try it later', 'Something wrong happend');
              
          
          }
          );
  }

  deletePhoto()
  {
    const that=this;
    var options = {
      method: 'POST',
      body:
      JSON.stringify({'name':this.state.nameSelectedPhoto}),
      headers:{
          'Access-Control-Allow-Origin': '*',
          'Content-Type':'application/json; charset=utf-8',
          'Accept': 'application/json',
        
      },
      json: true,
      json:'true',

    };
    
          fetch(IP+'/photos/delete', options)
            .then(response => response.json())
            .then(success => {
                console.log(success['state'])
                if(success['state']=='success')
                {
                  NotificationManager.success("Success", "You successfully delete a photo");
                  that.setState({openModalOptions:false}, that.getNewPhotos(that.state.name,that.state.currentSelectedAlbum))
                 
                }else
                {
                  NotificationManager.error("Error", "Something wrong happend");
                  

                }
             
            })
            .catch(error => {console.log(error)
              NotificationManager.error('Try it later', 'Something wrong happend');
              
          
          }
          );
  }



/*Search in all albums by name */
  getSearch(word,initial,final){
    const that = this;

    var options = {
        method: 'GET',
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type':'application/json; charset=utf-8',
            'Accept': 'application/json',
          
        },

      };
      this.setState({reloadGallery:false})
        const url='/photos/get/'+this.state.name+'/'+word+'/'+initial+'/'+final
        console.log(url)

            fetch(IP+url, options)
              .then(response => response.json())
              .then(success => {

               console.log(success)
               //that.props.stop()
               that.setState({photos:success['photos']}, that.setState({reloadGallery:true,currentSelectedAlbum:'Search'}))
              })
              .catch(error => {console.log(error)
             
                
            
            })
  }

  render() {
    const Modal = () => (
      <Popup
        open={this.state.openModal}
        modal
        closeOnDocumentClick={false}
        closeOnEscape={false}
      >
        <div className="modal_container">
          <h2>Confirmation</h2>
          <img src={this.state.url}></img>
          <div className="selector_container">
            <h3>Select Album</h3>
            <select className="selector" onChange={this.handleChange} name="selectValue" value={this.state.selectValue}>{this.createOptions()}</select>
          </div>
          <div className="confirmation_container">
            <span className="confirmation_button" onClick={this.sendFile}>
              Upload
            </span>
            <span className="cancel_button" onClick={this.closeModal}>
              Cancel
            </span>
          </div>
        </div>
      </Popup>
    );

    const ModalOptions = () => (
      <Popup
        open={this.state.openModalOptions}
        modal
        contentStyle={{ width: "80%" }}
        onClose={() => this.setState({ openModalOptions: false })}
      >
        <div className="modal_container_fullImage">
          <h2>{this.state.realNameSelectedPhoto}</h2>
          <div>
            <img
              src={this.state.urlSelected + this.state.nameSelectedPhoto}
            ></img>

            <div className="information_container">
              <h3>Date of creation: {this.state.dateSelectedPhoto}</h3>
              <h3>Album: {this.state.albumSelectedPhoto}</h3>
              <div className="selector_container_fullview">
                <h3>Change Album:</h3>
                <select className="selector" onChange={this.handleChange} name="changeNewAlbum" value={this.state.changeNewAlbum}>{this.createOptions()}</select>
                <input className="confirmation_button fixedbutton" type="submit" name="changeAlbum" value="Change Album" onClick={this.changeNewAlbum}/>
              </div>
              <div className="delete_container">
                   <input className="delete_button" type="submit" name="deleteImage" value="Delete Image" onClick={this.deletePhoto}/>
              </div>
              
            </div>
          </div>

          <div></div>
        </div>
      </Popup>
    );

    if (this.state.changeview === true) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <NotificationContainer />
        <div className="navbar">
          <div className="menu_container">
            <MenuIcon onClick={() => this.setState({ showNav: true })} />
            <h4>
              {" "}
              <span>Photo</span> Album
            </h4>
            <div className="selector_container_navbar">
                <h4>Change Album:</h4>
                <select  onChange={this.handleAlbum} name="currentSelectedAlbum" value={this.state.currentSelectedAlbum}>{this.createOptions()}</select>
            </div>
          </div>

          <SideNav
            showNav={this.state.showNav}
            onHideNav={() => this.setState({ showNav: false })}
            title={"Welcome, " + this.state.name}
            items={[
              "All my photos",
              "Albums",
              <a
                onClick={() => {
                  console.log("CLICK");
                  localStorage.clear();
                  this.setState({ changeview: true });
                }}
              >
                Log out
              </a>
            ]}
            titleStyle={{ backgroundColor: "#c91322" }}
            itemStyle={{ backgroundColor: "#fff", listStyleType: "none" }}
          />
        </div>

        <div className="app_container">
          <Modal></Modal>
          <ModalOptions></ModalOptions>
          <div className="search_bar">
            <CardSearch
              send={this.getSearch}
            />
            <label for="file-upload">Upload Image</label>
            <input id="file-upload" type="file" onChange={this.addFile} accept="image/*" />
            <div className="album_container">
              <input type="text" name="newAlbum" placeholder="Album Name" value={this.state.newAlbum} onChange={this.handleChange}/>
              <input type="submit" name="upload_new" value="Create new Album" onClick={this.createNewAlbum} />
            </div>
          </div>
          <div className="gallery_view">
            {this.state.name != "" && this.state.reloadGallery == true ? (
              <GalleryGrid
                photos={this.state.photos}
                select={this.setSelectedImage}
              />
            ) : this.state.reloadGallery == false || this.state.name==''  ? (
              <div className="loader_container">
                <Loader type="Grid" color="#c91322" height={100} width={100} />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Gallery;
