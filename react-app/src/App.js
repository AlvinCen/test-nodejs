import React from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from 'react-dom';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:4000/read")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="App">
      </div>
    );
  }
}


export default App;
