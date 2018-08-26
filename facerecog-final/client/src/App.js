import React, { Component } from 'react';
import TopBar from './Components/TopBar';
import './App.css';
import 'tachyons';
import Navigation from './Components/Navigation';
import Form from './Components/Form';
import Clarifai from 'clarifai';
import OutputImage from './Components/OutputImage/OutputImage';
import Rank from './Components/Rank';
import SignIn from './Components/SignIn';
import Register from './Components/Register';
import Card from './Components/Profile/Card';
import Users from './Components/Profile/Users';

const app = new Clarifai.App({
  apiKey: '10e438c98496472ba7d09d2dd56e26ed',
});

//  FACE_DETECT_MODEL

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        name: '',
        id: '',
        email: '',
        password: '',
        entries: '',
        joined: '',
      },
    };
  }

  //sysnthetic property for the app...
  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    console.log('click');
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.boundingbox(response)))
      .catch(err => {
        console.log(err);
      });
  };

  boundingbox = data => {
    const grid = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('input-image');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(grid);

    return {
      topRow: grid.top_row * height,
      rightCol: width - grid.right_col * width,
      bottomRow: height - grid.bottom_row * height,
      leftCol: grid.left_col * width,
    };
  };

  displayFaceBox = box => {
    this.setState({ box: box });
  };

  onRouteChange = route => {
    console.log(this.state.route);
    console.log(this.state.isSignedIn);
    this.setState({ route: route });
    if (route === 'signout') {
      this.setState({ isSignedIn: false });
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    console.log(route);
    console.log(this.state.user.name);
    console.log(this.state.user.email);
    console.log(this.state.user.joined);
    console.log(this.state.user.entries);
  };

  loadUser = user => {
    this.setState({user: {
      name: user.name,
      id: user.id,
      email: user.email,
      password: user.password,
      entries: user.entries,
      joined: user.joined,
    }});
  };

  render() {
    return (
      <div className="App">
        <TopBar />
        <Navigation
          isSingnedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {this.state.route === 'home' ? (
          <div>
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <Form
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <OutputImage imageUrl={this.state.imageUrl} box={this.state.box} />
          </div>
        ) : this.state.route === 'signin' ? (
          <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        )}
      </div>
    );
  }
}

export default App;
