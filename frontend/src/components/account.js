import { Delete, Done, Edit } from "@material-ui/icons";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import "./account.scss"
import Navbar from "./Navbar";
import image from "./pokerface.jpg"
import axios from "axios";
import { Button, ImageListItem, ThemeProvider } from "@material-ui/core";

class Account extends Component{
    constructor(props){
        super(props)
        this.state = {selected:3,
        image:"",
        user:{},
        isfollowing:[],
        posts:[],
        comments:[],
        followed:{}
    }
        this.handleclickcomment = this.handleclickcomment.bind(this)
        this.handleclickfollower  = this.handleclickfollower.bind(this)
        this.handleclickpost = this.handleclickpost.bind(this)
        this.onchange = this.onchange.bind(this)
        this.handlecommentdelete = this.handlecommentdelete.bind(this)
        this.handlepostdelete = this.handlepostdelete.bind(this)
        this.handleupload = this.handleupload.bind(this)
        this.unfollow  = this.unfollow.bind(this)
        this.handleSignout = this.handleSignout.bind(this)
    }
    handleclickcomment(){
        this.setState({selected:1})
        let headers = { 
            Authorization:"JWT "+localStorage.getItem("jwt"),
        }

        axios.get("/post/getmycomment/",{headers:headers}).then(res=>{
            this.setState({comments:res.data})
        }).catch((error)=>{
                this.props.history.push("/login")
            })
        
    }
    handleclickpost(){
        this.setState({selected:0})
        let headers = { 
            Authorization:"JWT "+localStorage.getItem("jwt"),
        }
       
        axios.get("/post/getmypost/",{headers:headers}).then(res=>{
            this.setState({posts:res.data})
        
        }).catch((error)=>{
                this.props.history.push("/login")
            })
        
    }
    handleclickfollower(){
        this.setState({selected:2})
        let headers = { 
            Authorization:"JWT "+localStorage.getItem("jwt"),
        }
        axios.get("/user/getmyfollower/",{headers:headers}).then(res=>{
            this.setState({isfollowing:res.data})
            console.log(this.state.isfollowing)
        }).catch((error)=>{
                this.props.history.push("/login")
            })
        
    }
    componentDidMount(){
      
  
        let headers = { 
            Authorization:"JWT "+localStorage.getItem("jwt"),
   
        }
        axios.get("/user/myaccount/",{headers:headers}).then(res=>{    
            this.setState({user:res.data})       
        }).catch((error)=>{
                    this.props.history.push("/login")
                })
              
    }
    handleupload(){
        let headers = { 
            Authorization:"JWT "+localStorage.getItem("jwt"),
            "Content-Type": "multipart/form-data"}
        let data = new FormData
        data.append("image",this.state.image)
        axios.post("/post/updateavatar/",data,{headers:headers}).then(res=>{
        }).catch((error)=>{
            this.props.history.push("/login")
        })
        window.location.reload();
    }
    onchange(e){
        this.setState({image:e.target.files[0]})
        let headers = { 
            Authorization:"JWT "+localStorage.getItem("jwt")}
        let data = new FormData
        data.append("image",this.state.image)
        axios.post("/post/updateavatar/",data,{headers:headers}).then(res=>{
           
        })
        .catch((error)=>{
            this.props.history.push("/login")

        })
      
      
    }
    handlecommentdelete(e){
        let headers = { 
            Authorization:"JWT "+localStorage.getItem("jwt")}
        let data = {id: e}
        axios.post("/post/deletecomment/",data,{headers:headers}).then(res=>{
          
        }).catch((error)=>{
            this.props.history.push("/login")
        })
        window.location.reload();
    }
   
    handlepostdelete(e){
        let headers = { 
            Authorization:"JWT "+localStorage.getItem("jwt")
            }
        let data = {id: e}
        axios.post("/post/deletepost/",data,{headers:headers}).then(res=>{
          
        }).catch((error)=>{
            this.props.history.push("/login")
        })
        window.location.reload();

    }
   
    
    commentdetail(item,type){
        return (
            <div className="usercomment">
                
                <img src={item.image} alt="" className="usercommentimage" />
                <div className="accountp4">
                    <h5 >{this.type==="post"?item.title:item.content}</h5>
                  
                    <div className="deletebuttonwrapper">
                        <button className="writediscription" onClick = {type==="post"?()=>{this.handlepostdelete(item.id)}:
                    ()=>{this.handlecommentdelete(item.id)}}><Delete></Delete> Delete</button>
                
                    </div>
                </div>
            </div>
        )
    }
    item(type){
        if (type===0){
            return (<div className="accountcommentbar">
            {this.state.posts.map((item)=>{
              return(this.commentdetail(item,"post"))
            })}
         </div>)
       } 
       if (type===1){
            return (<div className="accountcommentbar">
            {this.state.comments.map((item)=>{
              return(this.commentdetail(item,"comment"))
            })}
         </div>)
         }
        if (type===2){
           return(
            <div className="accountcommentbar">
            { this.state.isfollowing.map((item)=>{
            return(<div className="useritem">
                        <Userdetail item = {item}/>
                <div className="commentbutton" style = {{backgroundColor:"#5eba7d"}}
                onClick = {()=>{this.unfollow(item.follow)}}>
                    {this.state.followed[item.id]===1?<Done></Done>:"unfollow"}
                </div>
            </div>)
        })    
        }
        </div>
           )  
        }
    }
    
    unfollow(id){
        this.setState(prev=>
            ({
                followed: {
                  ...prev.objName,
                    [id] : 1
                }
              })
        )
        let data = {follow:id,
        type:0}
        let headers = { 
            Authorization:"JWT "+localStorage.getItem("jwt")
        }
        axios.post("/user/createfollow/" ,data,{headers :headers}).catch(
            (err)=>{
                if (err.response.status === 401){
                    this.props.history.push("/login")
                }
            }
        )
        window.location.reload();
    }

    
    avatar(){
       
        if (this.state.user.image!==undefined&&this.state.user.image!==null){
            
            if(this.state.user.image.length!=0){
                return (this.state.user.image)
            }
        }
        return (image)
    }
    handleSignout(){
        localStorage.clear();
        this.props.history.push("/")
    }

    render(){
        return (
            <div className="account">
                <Navbar page ="3"></Navbar>
                    <div className="accountp0">
                        <div className="accountp1">
                            <div className="accountp2">
                            <div className="accountuseravatar">
                                <img src={this.avatar()} alt="" className="accountimage" />
                                <div className="accountdiscription">
                                    <h3>{this.state.user.first_name+" "+this.state.user.last_name} </h3>
                                    <span className="span1">{"Economist and Developer, live in US"+this.state.user.discription}</span>
                                    <span className="span1">10394 followers</span>
                                    <Button variant="contained" style = {{width:"100%"}}
               
                color = "primary"
                className="writediscription"><div style = {{display:"flex" ,gap:5,alignItems:"center"}} onClick = {this.handleSignout}>Sign out</div></Button>
                                    <Button 
                                            variant="contained"
                                            component="label"
                                            color = "primary"
                                           
                                            >
                                            Upload Avatar
                                            <input
                                                type="file"
                                                hidden
                                                accept="image/*"
                                                id = "image"
                                                onChange={this.onchange}
                                            />
                                            </Button>
                                </div>
                                </div>
                            <div className="accountactionbar">
                                <div className="accountactionselector">
                                    <div className={this.state.selected===0?"accountactionitemselected":"accountactionitem"} style = {{cursor:"pointer"}} onClick = {this.handleclickpost}>Post</div>
                                    <div className={this.state.selected===1?"accountactionitemselected":"accountactionitem"} style = {{cursor:"pointer"}} onClick = {this.handleclickcomment}>Comment</div>
                                    <div className={this.state.selected===2?"accountactionitemselected":"accountactionitem"} style = {{cursor:"pointer"}} onClick = {this.handleclickfollower}>Follower</div>
                          
                                                        
                                </div>
                               {this.item(this.state.selected)}
                            </div>
                            </div>
                            <div className="placeholder"> </div>
                        </div>
                    </div>
            </div>
        )
    }
}

class Userdetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            user:{}
        }
    }
    componentDidMount(){
        axios.post("/user/getuseroverview/",{id:this.props.item.user}).then((res)=>{
            this.setState({
                user:res.data
            })
        })
    }
    render(){
        return(
            <div className="usercontainer">
                <img src={this.state.user.image} alt="" className="useravatar" />
                <h4>{this.state.user.first_name+" "+this.state.user.last_name}</h4>
            </div>
        )
        
    }
}
export default withRouter(Account)