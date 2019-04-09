import React, { Component } from 'react';
import Pairs from '../src/components/pairs'
import Trades from '../src/components/trades'
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" render={(props) => <Pairs {...props}/>}/>
          <Route path="/trades/:id" component={Trades}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
