import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      msg : "hello React!"
    }
  }
  render() {
    return (
      <div>{this.state.msg}</div>
    );
  }
}

export default App;
