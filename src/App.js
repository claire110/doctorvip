import React from 'react';
import {Switch, Route, HashRouter} from 'react-router-dom';
import './App.css';
// component
import Login from './views/login/index'
import Index from './views/index/index'
// private component
import PrivateRouter from './components/privateRouter/index'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <div className="test">
        {/* <BrowserRouter basename="/doctor-admin"> */}
        <HashRouter basename="/doctor-admin">
        {/* <BrowserRouter> */}
          <Switch>
            <Route component ={Login} exact path="/" />
            <PrivateRouter component ={Index} path="/index" />
          </Switch>
        {/* </BrowserRouter> */}
        </HashRouter>
      </div>
    )
  }
}

export default App;
