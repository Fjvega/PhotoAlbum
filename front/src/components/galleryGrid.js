import React, { Component } from 'react';
import { IP } from '../Resources'
import '../CSS/galleryGrid.css'


class GalleryGrid extends Component {
    constructor(props) {
        super(props);
    
        this.createGrid=this.createGrid.bind(this)
      }

state={
photos:[],
init:false
}
componentDidMount()
{

}



createGrid()
{
    const that=this;
    const total = this.props.photos.length;

    let rows = Math.ceil(total/4)
    let iterator =[]
    for (var i = 0; i < rows; i++) {
        iterator.push(i)

      }
    const url=IP+'/photos/get/'
    let list=iterator.map(function(name){
        let index1,index2,index3,index4;
        if(name*4+0<total)
        {   
            index1=name*4+0;
        }else
        {
            index1=null;
        }

        if(name*4+1<total)
        {   
            index2=name*4+1;
        }else
        {
            index2=null;
        }

        if(name*4+2<total)
        {   
            index3=name*4+2;
        }else
        {
            index3=null;
        }

        if(name*4+3<total)
        {   
            index4=name*4+3;
        }else
        {
            index4=null;
        }
        
            return(
                <div className="row_grid">
                    {(index1!==null)?<img src={url+that.props.photos[index1]['filename']} 
                    onClick={()=>that.props.select(that.props.photos[index1]['filename']
                    ,that.props.photos[index1]['realname']
                    ,that.props.photos[index1]['album']
                    ,that.props.photos[index1]['date'])}/>
                    :<div style={{display:'none'}}></div>}
                    {(index2!==null)?<img src={url+that.props.photos[index2]['filename']} 
                    onClick={()=>that.props.select(that.props.photos[index2]['filename']
                    ,that.props.photos[index2]['realname']
                    ,that.props.photos[index2]['album']
                    ,that.props.photos[index2]['date'])}/>
                    :<div style={{display:'none'}}></div>}
                    {(index3!==null)?<img src={url+that.props.photos[index3]['filename']} 
                    onClick={()=>that.props.select(that.props.photos[index3]['filename']
                    ,that.props.photos[index3]['realname']
                    ,that.props.photos[index3]['album']
                    ,that.props.photos[index3]['date'])}/>
                    :<div style={{display:'none'}}></div>}
                    {(index4!==null)?<img src={url+that.props.photos[index4]['filename']} 
                    onClick={()=>that.props.select(that.props.photos[index4]['filename']
                    ,that.props.photos[index4]['realname']
                    ,that.props.photos[index4]['album']
                    ,that.props.photos[index4]['date'])}/>
                    :<div style={{display:'none'}}></div>}
                    
                </div>
            )})
    
    return(
    <div>
        {list}
    </div>)
    //console.log(conteo)

}

componentDidUpdate()
{

}
    render() 
    {   
        return(
          
            <div>
               {this.createGrid()}
            </div>
            
          
        )
    }
}

export default GalleryGrid;   