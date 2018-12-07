import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Instafeed from 'instafeed.js';
import './App.css';

class App extends Component {
  render() {
    var feed = new Instafeed({
      get: 'user',
      userId: '9436320028',
      accessToken: '9436320028.d6b2746.de3414163bb3419dac64d022bd252833',
      template: '<img src="{{image}}" class="App-photo" />'
    });
    feed.run();
    return (
      <div className="App">
        <div id="instafeed" />
        <Button className="App-button">Request custom order!</Button>
      </div>
    );
  }
}

export default App;
