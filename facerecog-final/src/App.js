import React, { Component } from 'react';
import TopBar from './Components/TopBar';
import './App.css';
import Navigation from './Components/Navigation';
import Form from './Components/Form';
import Clarifai from 'clarifai';
import OutputImage from './Components/OutputImage';

const app = new Clarifai.App({
  apiKey: '10e438c98496472ba7d09d2dd56e26ed',
});

//  FACE_DETECT_MODEL

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    };
  }

  //sysnthetic property for the app...
  onInputChange = event => {
    this.setState({input: event.target.value})
  };


  onButtonSubmit = () => {
    console.log('click');
    this.setState({imageUrl: this.state.input})
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        'https://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32).jpg'
      )
      .then(
        function(response) {
          // do something with response
          console.log(response)
        },
        function(err) {
          // there was an error
          console.error(err);
        }
      );
  };

  render() {
    return (
      <div className="App">
        <TopBar />
        <Navigation />
        <Form
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <OutputImage imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
