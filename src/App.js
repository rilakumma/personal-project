import React, { Component } from 'react';
import './App.css';
import routes from './routes';
import Nav from './components/Nav/Nav';

class App extends Component {
  render() {
    return (
      <div className="App">
        <title>pompom</title>
      
        <link href="https://fonts.googleapis.com/css?family=Maitree" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Pattaya" rel="stylesheet" />
        <Nav pathname={window.location.pathname} />
        {routes}
      </div>
    );
  }
}

export default App;
