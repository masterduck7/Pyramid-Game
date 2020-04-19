import React, { Component } from 'react';
import './App.css';
import CustomLayout from './Containers/Layout';
import Home from './Containers/Home';

class App extends Component{
  render(){
    return (
      <div>
        <CustomLayout />
        <Home />
      </div>
    );
  }
}

export default App;
