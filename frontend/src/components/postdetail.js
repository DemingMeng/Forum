import { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./postdetail.scss"
import Navbar from './Navbar'
import Post from "./post";
import axios from "axios";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";


class Postdetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            comments:[],
            post : {}
        }
      
    }
    componentDidMount(){
        console.log(this.state)
        let key = this.props.match.params.key
        axios.post("/post/getcomment/",{post:key}).then(res=>{
            this.setState({comments:res.data})
        })
        axios.post("/post/getallpost/",{id:key}).then(res=>{
            this.setState({post:res.data})
        })
    }
    selector(){
        return(

                <FormControl>
                <RadioGroup
                         row
                         aria-labelledby="demo-row-radio-buttons-group-label"
                             name="row-radio-buttons-group"
                                    >
      <FormControlLabel value="Recent" control={<Radio color = "default" size = "small"/>} label="Recent" />
      <FormControlLabel value="Trending" control={<Radio  color = "default" size = "small"/>} label="Trending" />
      <FormControlLabel value="Most likes" control={<Radio color ="default" size = "small"/>} label="Most likes" />      
    </RadioGroup>
  </FormControl>
        )
    }
    render(){
        return (
            <div className="postdetail">
                <Navbar></Navbar>
                <div className="homep0">
                    <div className="homep1" style = {{gap:50}}>
                        <div className="postdetailp0">{
                            Object.entries(this.state.post).length!==0?<Post type = "detail" item = {this.state.post}></Post>:<></>
                          }  <div className="selectorcontainer">
                                <div style = {{fontSize:16}}>29 answers</div>
                                    <div className="selector">
                                       {this.selector()}
                                    </div>
                                </div>
                          {this.state.comments.map((item)=>{
                            return(
                          <Post type = "comment" item = {item}></Post>)
                          })  
    }
                        </div>
                        <div className="postdetailp1">
                            <div className="postp0">
                                <div className="postp1" style = {{flexDirection:"column",gap:20}}>
                                    <h4>related topic</h4>
                                    <div className="topicitem" >
                                        <button className="commentbutton" style = {{backgroundColor:"#5eba7d"}}>
                                            2094
                                        </button>
                                        <div className="topic">
                                            How to become a millionaire?
                                        </div>
                                    </div>
                                    <div className="topicitem">
                                        <button className="commentbutton" style = {{backgroundColor:"#5eba7d"}}>
                                            2094
                                        </button>
                                        <div className="topic">
                                            How to become a millionaire?
                                        </div>
                                    </div>
                                    <div className="topicitem">
                                        <button className="commentbutton" style = {{backgroundColor:"#5eba7d"}}>
                                            2094
                                        </button>
                                        <div className="topic">
                                            How to become a millionaire?
                                        </div>
                                    </div>

                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(Postdetail)