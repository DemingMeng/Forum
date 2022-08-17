import { Component } from "react";
import "./Home.scss"
import Navbar from "./Navbar";
import Post from "./post";
import image from "./pokerface.jpg"
import hot from "./icons/forum6.png"
import forum1 from "./icons/forum1.jpg"
import forum2 from "./icons/forum2.jpg"
import forum3 from "./icons/forum3.png"
import forum4 from "./icons/forum4.jpg"
import axios from "axios";
import { Done } from "@material-ui/icons";
import { withRouter } from "react-router-dom";


class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
        createpost:false,
        onfocus:false,
        data:[],
        mayinterest:[],
        isfollowing:{
        }
    }

        this.onFocus = this.onFocus.bind(this)
        this.onBlur = this.onBlur.bind(this)
        this.follow = this.follow.bind(this)
        this.handleclick = this.handleclick.bind(this)
    }
    onFocus(){
        this.setState({onfocus:true})
    }
    follow(id){
        this.setState(prev=>
            ({
                isfollowing: {
                  ...prev.objName,
                    [id] : 1
                }
              })
        )
        let data = {follow:id,
        type:1}
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
    }
    handleclick(id){
        this.props.push("/postdetail/"+id)
    }



    onBlur(){
        this.setState({
            onfocus:false
        })
    }
    componentDidMount(){
        let key = this.props.match.params.key
        if (key===undefined){
        axios.get("/post/getallpost/").then((data)=>{
            this.setState({data:data.data})
        })}
        else{
            let data = {
                key:key
            }
          axios.post("/post/searchpost/",data).then((res)=>{
            this.setState({
                data:res.data
            })
          })
        }
        axios.get("/user/getrecommendation/").then((data)=>{
            this.setState({mayinterest:data.data})
        })
        
    }

   
    render(){
        return(
        <div>    
            <Navbar page="1"></Navbar>
         
            <div className="homep0">
                <div className="homep1">
                    <div className="homep4" style = {{flex:1}}>
                    <div className="categorycontainer">
                    <div className="categoryitem" style = {{fontWeight:600}}>
                    <img src={hot} alt="" className="hot" />
                    hot topic
                    </div>
                    <div className="categoryitem">
                        <img src={forum1} alt="" className="category" />
                         physics
                    </div>
                    <div className="categoryitem">
                        <img src={forum2} alt="" className="category" />
                         biology
                    </div>
                    <div className="categoryitem">
                        <img src={forum3} alt="" className="category" />
                         function
                    </div>
                    <div className="categoryitem">
                        <img src={forum4} alt="" className="category" />
                         travel
                    </div>
                    <div className="categoryitem">
                        <img src={forum4} alt="" className="category" />
                         math
                    </div>
                </div>
                    </div>
                    <div className="homep2">
                        {this.state.data.map((item)=>{
                            return(
                                <Post item = {item} type = "post" 
                                ></Post>
                            )
                        })} 
                   
                    </div>
                    <div className="homep3">
                        <div className="postp0">
                            <div className="postp1" style = {{flexDirection:"column",gap:"20px"}}>
                                <h4>You may interested</h4>
                                { this.state.mayinterest.map((item)=>{
                            return (
                                <div className="useritem">
                                    <Userdetail item = {item}></Userdetail>
                                    <div className="commentbutton" style = {{backgroundColor:"#5eba7d"}}
                                    onClick = {()=>{this.follow(item.id)}}>
                                        {this.state.isfollowing[item.id]===1?<Done></Done>:"follow"}
                                    </div>
                                </div>
                            )
                            })    
                            }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
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
        axios.post("/user/getuseroverview/",{id:this.props.item.id}).then((res)=>{
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

export default withRouter(Home)