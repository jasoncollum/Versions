import React, { Component } from 'react';
import NavBar from './nav/NavBar';
import ApplicationViews from './ApplicationViews'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <ApplicationViews />
      </React.Fragment >
    );
  }
}

export default App;