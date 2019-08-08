
import React, { Component } from 'react';
import './App.css';
// var number = 2000;
var unirest = require("unirest");
var apikey = process.env.REACT_APP_API_KEY;

class App extends Component {
  constructor() {
    super()
    this.state = {
      year: 'Enter a year to get started!',
      current: '',
      usedYear: '',
      text: "Click the button to generate a random info from that year!",
    }
  }

  handleChange = event => {
    this.setState({
      current: event.target.value
    })
  };

  setYear = event => {
    event.preventDefault();
    if (this.state.current > 0 && this.state.current <= 2019) {
      this.setState({
        year: this.state.current,
        current: ''
      })
    }
    else {
      alert("Please enter a year between 1 and 2019!")
    }
  }

  func = () => {
    var req = unirest("GET", "https://numbersapi.p.rapidapi.com/" + this.state.year + "/year");
    var resText, resYear;
    req.query({
      "fragment": "false",
      "json": "true"
    });

    req.headers({
      "x-rapidapi-host": "numbersapi.p.rapidapi.com",
      "x-rapidapi-key": apikey
    });

    req.end((res) => {
      resText = res.body.text;
      resYear = res.body.number;
      console.log("line 33", res.body);
      this.setState({
        text: resText,
        usedYear: resYear,
      })
    });
  }
  render() {
    var link = "https://www.google.com/search?q=" + this.state.usedYear + " " + this.state.text;
    return (
      <div className="container">
        <div className="content">
          <div className="yearDisp">
            <div id='yearText'>{this.state.year}</div>
            <form id="addtaskform">
              <input onChange={this.handleChange} id="yearInputBox" name="yearInput" type="number" placeholder="Set the year here" value={this.state.current}></input>
              <button type="submit" id="setYear" onClick={this.setYear}>Set</button>
            </form>
          </div>
          <div className="outputWindow">
            <button id='button' onClick={this.func}>Get Info  </button>
            <div className="factDisplay">INFO: {this.state.text}</div>
            <a id="learnMoreButton" href={link} rel="noopener noreferrer" target="_blank">Learn More About This</a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
