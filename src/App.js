
import React, { Component } from 'react';
import './App.css';
// var number = 2000;
var unirest = require("unirest");
var apikey=process.env.REACT_APP_API_KEY;

class App extends Component {
  constructor() {
    super()
    this.state = {
      year: 2019,
      current: 0,
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
    this.setState({
      year: this.state.current,
      current: ''
    })
    console.log("Successfully added", this.state.current, "to the list!")
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
        year: resYear,
      })
    });
  }
  render() {
    var link = "https://www.google.com/search?q="+this.state.year+" "+this.state.text;
    return (
      <div>
        <button onClick={this.func}>Get Info  </button>
        <div>
        <form id="addtaskform">
              <label htmlFor="taskName">Change Year:</label>
              <input onChange={this.handleChange} id="yearInputBox" name="yearInput" type="text" placeholder="Enter a year." value={this.state.current}></input>
              <button type="submit" id="setYear"onClick={this.setYear}>Set</button>
            </form>
          <div className="yearDisp">YEAR: {this.state.year}</div>
          <div className="factDisplay">INFO: {this.state.text}</div>
        </div>
          <a id="learnMoreButton" href={link} rel="noopener noreferrer" target="_blank">Learn More</a>
      </div>
    );
  }
}

export default App;
