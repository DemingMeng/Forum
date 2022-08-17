import axios from "axios"
import "./post.scss"
import image from "./pokerface.jpg"
import { Component } from "react"
import { withRouter } from "react-router-dom"
import { ChatBubbleOutline, FavoriteBorder, FavoriteOutlined, ShareOutlined } from "@material-ui/icons"
import parse, { attributesToProps } from 'html-react-parser';

class Post extends Component{
    constructor(props){
        super(props)
        this.state = {
            like:0,
            comment:false,
            commenttext:"",
            user:{},
            currentuser:{}
        }
        this.handlefavorite = this.handlefavorite.bind(this)
        this.handlecomment  = this.handlecomment.bind(this)
        this.submitcomment = this.submitcomment.bind(this)
        this.onchange = this.onchange.bind(this)
        this.follow = this.follow.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
 
    handlefavorite(){
        
        let data = {
        post:this.props.item.id,
        like: 1-this.state.like
        }
        let headers = { 
            Authorization:"JWT "+localStorage.getItem("jwt")
        }

        axios.post("/post/createlike/",data,{headers:headers}).then(res=>{
            this.setState({like:1-this.state.like})
           
        }).catch((error)=>{
           
                if (error.response.status===401) {
                    this.props.history.push("/login")
                }})
       
    }
    componentDidMount(){
        axios.post("/user/getuseroverview/",{id:this.props.item.user}).then((res)=>{
            this.setState({
                user:res.data
            })
        })
    }
    handlecomment(){
        this.setState({comment:!this.state.comment})
        let headers = { 
            Authorization:"JWT "+localStorage.getItem("jwt"),
   
        }
        axios.get("/user/myaccount/",{headers:headers}).then(res=>{    
            this.setState({currentuser:res.data})       
        }).catch((error)=>{
                    this.props.history.push("/login")
                })
    }
    onchange(e){
        this.setState({
            commenttext:e.target.value
        })
    }
    submitcomment(){
        let headers = { 
            Authorization:"JWT "+localStorage.getItem("jwt"),
        }
        let data = {content:this.state.commenttext,
            post:this.props.item.id}
        axios.post("/post/createcomment/",data,{headers:headers}).then(res=>{
        }).catch((error)=>{
                this.props.history.push("/login")
            })
       
    }
    follow(){
        let data = {follow:this.props.item.user,
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
    content(){
        if (this.props.type==="detail" ){
            const options = {
                replace: domNode => {
                if (domNode.name=== 'img') {
                    const props = attributesToProps(domNode.attribs);
                    return <img {...props} style = {{width:"100%",maxHeight:"600px"}}/>;
                }
                }
            };
  
            return (parse(this.props.item.content, options))
        }
        if (this.props.type==="comment"){
            return (this.props.item.content) 
        }
        const options = {
            replace: domNode => {
                console.log(domNode)
            if (domNode.name=== 'img') {
                return <></>;
            }
            }
        };

        return (parse(this.props.item.content, options))
    }
    handleClick(){
        if (this.props.type==="post"){
        this.props.history.push("/postdetail/"+this.props.item.id)
        }}
    avatar(){
       
        if (this.state.currentuser.image!==undefined&&this.state.currentuser.image!==null){
            
            if(this.state.currentuser.image.length!=0){
                return (this.state.currentuser.image)
            }
        }
        return (image)
    } 
    useravatar(){
       
        if (this.state.user.image!==undefined&&this.state.user.image!==null){
            
            if(this.state.user.image.length!=0){
                return (this.state.user.image)
            }
        }
        return (image)
    }
    
    postimage(){
       
        if (this.props.item.image!==undefined&&this.props.item.image!==null){        
            if(this.props.item.image.length!=0){
                return (this.props.item.image)
            }
        }
        return (image)
    }
    render(){
        return (
            <div className="postp0">
                <div className="postp1">
                    <img src={this.useravatar()} alt="" className="useravatar" />
                    <div className="postp2">
                        <div className="username">{this.state.user.first_name+" "+this.state.user.last_name}  
                            <div className="followbutton" onClick={this.follow}>
                                follow
                            </div>
                        </div>
                        <span className="span1">Economist and developer,live in US</span>
                    </div>
        

                </div>
                <div className="postp5" onClick={this.handleClick}>
                   {this.props.type!=="comment"?<h3>{this.props.item.title}</h3>
                     :<></>}  
                <div className="content">
                  {this.content()}
                </div>
                
                </div>

                <img onClick={this.handleClick} src={this.postimage()} alt="" className={this.props.type==="comment"?"disabled":"postpicture"} />
                <div className="actionbar">
                    <div className="actionitem" onClick={this.handlefavorite}>
                        {this.state.like===0?<FavoriteBorder></FavoriteBorder>:<FavoriteOutlined style = {{color:"brown"}}></FavoriteOutlined>}
                        {this.props.item.likes+this.state.like}
                    </div>
                    <div className="actionitem" onClick={this.handlecomment}>
                        <ChatBubbleOutline></ChatBubbleOutline>
                        332
                    </div>
                    <div className="actionitem">
                       <ShareOutlined></ShareOutlined>
                    </div>
                </div>
                {
                    this.state.comment?
                <div className="commentbar">
                    <img src={this.avatar()} alt="" className="useravatar" />
                    <div className="inputcontainer">
                        <input type="text" className="input1" placeholder="add a comment" onChange = {this.onchange}/>
                    </div>
                    <button className="commentbutton" onClick={this.submitcomment}>
                        Submit
                    </button>
                </div>
                :<></>
    }


            </div>
        )
    }
}
export default withRouter(Post)