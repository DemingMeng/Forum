import { Component } from "react";
import axios from "axios";

import { withRouter } from "react-router-dom";

class Activation extends Component{
   
    componentDidMount(){
        let body = {uid:this.props.match.params.uid,
        token:this.props.match.params.token}
        axios.post("/auth/users/activation/",body).then((res)=>{
            this.props.history.push("/")
        })
        window.location.reload();
    }
    render(){
        return (<div></div>)
    }
}
export default withRouter(Activation)