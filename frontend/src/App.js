import React from "react"

import { BrowserRouter, Route, Router, Switch} from 'react-router-dom'
import Home from "./components/Home"
import Postdetail from "./components/postdetail"
import Account from "./components/account"
import Login from "./components/login"
import Activation from "./components/activation"
function App() {
     return (
        <BrowserRouter>   
            <Switch>
                <Route exact path="/"
                     render= {(props)=>{
                     return <Home></Home>}}>
                        
                </Route>
                <Route exact path="/search/:key"
                     render= {(props)=>{
                     return <Home {...props}></Home>}}>
                        
                </Route>
                <Route exact path="/postdetail/:key"
                     render= {(props)=>{
                     return <Postdetail {...props}></Postdetail>}}>
                        
                </Route>
                <Route exact path="/account"
                     render= {(props)=>{
                     return <Account></Account>}}>
                        
                </Route>
                <Route exact path="/login"
                     render= {(props)=>{
                     return <Login></Login>}}>
                        
                </Route>
                <Route exact path='/activate/:uid/:token' render={(props) => {
                        return <Activation {...props} />;
                     }} />
            </Switch>
        </BrowserRouter>

    
    )
}
    





export default App