import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route }from 'react-router-dom'
import Home from './components/home';
import Shelf from './components/shelf';
import Bin from './components/bin';
import './App.css';

  const App = () =>  {
    return (
      <div className="App">
          <Router>
            <Switch>
              <Route path="/bins/:shelf" component={Shelf}/>
              <Route path="/bin/:shelf:bin" component={Bin}/>
              <Route path="/create/:shelf:bin" component={Bin}/>
              <Route path="/" component={Home}/>
            </Switch>
          </Router>
      </div>
    );
  }


export default App;
