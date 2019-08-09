
import React, { Component } from 'react';
import './App.css';
var unirest = require("unirest");
const apikey = process.env.REACT_APP_API_KEY;

class App extends Component {
  constructor() {
    super()
    this.state = {
      year: 'Enter a year to get started!',
      current: '',
      usedYear: '',
      text: "Click the button to generate a random info from that year!",
      learnButtonVisible: 'hidden',
      history:[],
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
        current: '',
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
      if(this.state.text!=="Click the button to generate a random info from that year!"){
        this.setState({
          history: [...this.state.history, this.state.usedYear+", "+this.state.text],
        })
      }
      this.setState({
        text: resText,
        usedYear: resYear,
        learnButtonVisible: 'visible',
      })
    });
    console.log("line 33", this.state.history);
  }
  render() {
    var link = "https://www.google.com/search?q=" + this.state.usedYear + " " + this.state.text;
    const theHistory = this.state.history.map((items, index) => 
      <span key={index} className="listItem">
        <a id="learnMoreButton" href={"https://www.google.com/search?q="+ items} rel="noopener noreferrer" target="_blank">Learn More</a>
        <span className="taskText"><b>{index+1}: </b>{items}</span>
      </span>);
    return (
      <div className="container">
        <div className="content">
          <div className="yearDisp">
            <div id='yearText'>{this.state.year}</div>
            <form>
              <input onChange={this.handleChange} id="yearInputBox" name="yearInput" type="number" placeholder="Set the year here" value={this.state.current}></input>
              <button type="submit" id="setYear" onClick={this.setYear}>Set</button>
            </form>
          </div>
          <div className="outputWindow">
            <button id='factButton' onClick={this.func}>Get Fact'd</button>
            <div id="factDisplay">{this.state.text}</div>
            </div>
            <a style={{visibility:this.state.learnButtonVisible}} id="mainLearnMoreButton" href={link} rel="noopener noreferrer" target="_blank">Learn More About This</a>
          
          <div id="historyListTitle"><b>Previous Results</b></div>
          <div className="theList">
            {theHistory.reverse()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
