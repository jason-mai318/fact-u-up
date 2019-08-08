
//TODO:
//ADD STYLING
//ADD SEARCH WINDOW FOR THE FACT
//ADD RANDOMIZE YEAR BUTTON
//ADD YEAR INPUT
//ADD FACT SEARCH HISTORY [MAYBE]

import React, { Component } from 'react';
import './App.css';
// var number = 2000;
var unirest = require("unirest");
var apikey=process.env.REACT_APP_API_KEY;

class App extends Component {
  constructor() {
    super()
    this.state = {
      year: 20019,
      text: "Click the button to generate a random info from that year!",
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
        year: resYear,
      })
    });
  }
  // conponentDidMount() {
  //   (function () {
  //     var cx = '111:xxx';
  //     var gcse = document.createElement('script');
  //     gcse.type = 'text/javascript';
  //     gcse.async = true;
  //     gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
  //     var s = document.getElementsByTagName('script')[0];
  //     s.parentNode.insertBefore(gcse, s);
  //   })();
  // }
  render() {
    return (
      <div>
        <button onClick={this.func}>Get Info  </button>
        <div>
          <div className="yearDisp">YEAR: {this.state.year}</div>
          <div className="factDisplay">INFO: {this.state.text}</div>
        </div>
        {/* <div className="gcse-searchbox" data-resultsUrl="http://www.example.com"
          data-newWindow="true" data-queryParameterName="search" /> */}
      </div>
    );
  }
}

export default App;
