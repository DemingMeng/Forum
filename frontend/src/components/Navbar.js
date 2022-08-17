
import { Search, HomeOutlined, Add, Face} from "@material-ui/icons";
import { Component }from "react";

import { withRouter } from "react-router-dom";
import "./Navbar.scss"
import image from "./pokerface.jpg"
import axios from "axios"
import Ck from "./ck";
import React from "react";
import { Button, Input } from "@material-ui/core";

class Popup extends Component {
    constructor(props) {
      super(props);
      this.state = {
        onfocus:false,
        content:"",
        image:"",
        title:""
      }
      this.wrapperRef = React.createRef();
      this.handleClickOutside = this.handleClickOutside.bind(this);
      this.onFocus = this.onFocus.bind(this)
      this.onBlur = this.onBlur.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmmmit = this.handleSubmmmit.bind(this)
      this.handlecontent = this.handlecontent.bind(this)
      this.handleupload = this.handleupload.bind(this)
    }
    
    componentDidMount() {
      document.addEventListener("mousedown", this.handleClickOutside);
    
      
    }      
    componentWillUnmount() {
      document.removeEventListener("mousedown", this.handleClickOutside);
    }
    handleChange(e){
        let a = {}
        a[e.target.id] =e.target.value
        this.setState(a)
    }
    handleupload(e){
        this.setState({image:e.target.files[0]})
    }
    handleClickOutside(event) {
      if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
        this.props.handleClickOutside()
      }
    }

  
    onFocus(){
        this.setState({onfocus:true})
    }
    onBlur(){
        this.setState({
            onfocus:false
        })
        
    }
    handlecontent(e){
        this.setState({content:e})
    }

    handleSubmmmit(){
        let headers = { 
        Authorization:"JWT "+localStorage.getItem("jwt")}
        let a = {"Content-Type" : "multipart/form-data"}
        let data = new FormData()
        data.append("image",this.state.image)
        data.append("content",this.state.content)
        data.append("title",this.state.title)
        axios.post("/post/createpost/",data,{headers:headers}).then((res)=>{
            if (res.status===401){
                this.props.history.push("/login")
             
            }

        })
        window.location.reload();
    }
    
    render() {
      return (
        <div className="ckwrapper" ref={this.wrapperRef}>
            <h3> Title</h3>
            <div style = {{width:"90%"}} className ={this.state.onfocus?"inputwrapperfocus":"inputwrapper"}>        
                <input  className ="input" type="text" id = "title"  placeholder="Search Reddit" onFocus={this.onFocus} onBlur = {this.onBlur} onChange = {this.handleChange} />                                       
            </div>      
            <h3>Content</h3>
      
            <Ck id = "content" handlecontent = {this.handlecontent} ></Ck>                 
            <div className="popupactionbar"> 
            <Button 
                variant="contained"
                component="label"
                color = "primary"
                >
                Upload 
                <input
                    type="file"
                    hidden
                    accept="image/*"
                    id = "image"
                    onChange={this.handleupload}
                    
                />
                </Button>
                <Button variant="contained" color = "primary" onClick={this.handleSubmmmit}> Submit</Button>
                </div>
        </div>
     )
    }
  }
class Navbar extends Component{
    constructor(props){
        super(props)
        this.state = {
            onfocus :false,
            search:"",
            data:[],
            login:true,
            createpost:false            
        }
        this.onFocus = this.onFocus.bind(this)
        this.onBlur = this.onBlur.bind(this)
        this.onChange = this.onChange.bind(this)
        this.handleadd = this.handleadd.bind(this)
        this.pushtohome = this.pushtohome.bind(this)
        this.pushtoaccount =  this.pushtoaccount.bind(this)
        this.handleClickOutside = this.handleClickOutside.bind(this)
        this.handleSearch = this.handleSearch.bind(this)

        
    }
    onChange(e){
        this.setState({
            search:e.target.value
        })

    }
    handleSearch(){
        this.props.history.push("/search/"+this.state.search)
        
        window.location.reload();
    }
    handleSubmmmit(){
    }
    onFocus(){
        this.setState({onfocus:true})
    }
    onBlur(){
        this.setState({
            onfocus:false
        })
    }
    handleadd(){
        this.setState({createpost:true})
    }
    pushtohome(){
        this.props.history.push("/")
    }
    pushtoaccount(){
        this.props.history.push("/account")

    }
    handleClickOutside(){
        this.setState({createpost:false})
    }
    render(){
        
        return (
            <div className="p0">
                   {this.state.createpost?
        <div className="editor">  
           <Popup handleClickOutside = {this.handleClickOutside}></Popup>
       </div>
       :<></>}          
            <div className="p1">
                <div className="p2">
                    <div className="logo">Reddit</div>
        
                </div>
                <div className ={this.state.onfocus?"inputwrapperfocus":"inputwrapper"}>
                        <Search onClick = {this.handleSearch} style = {{color:"grey",cursor:"pointer"}}></Search>
                        <input  className ="input" type="text"  placeholder="Search Reddit" onFocus={this.onFocus} onBlur = {this.onBlur}
                       onChange = {this.onChange} />                                                
                </div>
         
                    { this.state.login?
                      <div className="p4">
                            <div className={this.props.page==="1"?"iconitemselected":"iconitem"} onClick = {this.pushtohome}>
                                    <HomeOutlined style = {{fontSize:"inherit"}}/>
                            </div>
                            <div className={this.props.page==="2"?"iconitemselected":"iconitem"} onClick = {this.handleadd}>
                                    <Add style = {{fontSize:"inherit"}} />
                                    
                            </div>
                            <div className={this.props.page==="3"?"iconitemselected":"iconitem"} onClick = {this.pushtoaccount}>
                                    <Face style = {{fontSize:"inherit"}} />
                              
                            </div>
                          
                        </div>            
        
                    :<div className="p3">
                        <div className="buttonwrapper">
                            <button className="type1">Log in</button>
                            <button className="type3">Sign up </button>
                        </div>
                    </div>}
        

            </div>
            </div>
        )
    }

}

export default withRouter(Navbar)

