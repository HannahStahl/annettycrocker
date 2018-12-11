import React, { Component } from 'react';
import { Col, Button, Modal, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap';
import Instafeed from 'instafeed.js';
import './App.css';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleSubmit() {
    // TODO
  }

  render() {
    var feed = new Instafeed({
      get: 'user',
      userId: '9436320028',
      accessToken: '9436320028.d6b2746.de3414163bb3419dac64d022bd252833',
      template: '<img src="{{image}}" class="App-photo" />',
      resolution: 'standard_resolution'
    });
    feed.run();
    return (
      <div className="App">
        <div id="instafeed" />
        <Modal className="App-modal" show={this.state.show} onHide={this.handleClose}>
          <Modal.Body>
            <p>I would love to bake for you! Please include the details of what you are looking for below. I will get back to you shortly to discuss!</p>
            <Form horizontal className="App-form">
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>Name:</Col>
                <Col sm={10}><FormControl className="App-form-field App-short-field" type="text" /></Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>Email:</Col>
                <Col sm={10}><FormControl className="App-form-field App-short-field" type="email" /></Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>Message:</Col>
                <Col sm={10}><FormControl className="App-form-field App-message" componentClass="textarea" /></Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer className='App-modal-footer'>
            <Button className="App-button App-cancel-button" onClick={this.handleClose}>Cancel</Button>
            <Button className="App-button App-send-button" type="submit" bsStyle="primary" onClick={this.handleSubmit}>Send</Button>
          </Modal.Footer>
        </Modal>
        <div className="App-order-button-container">
          <Button className="App-button App-order-button" onClick={this.handleShow}>Request custom order!</Button>
        </div>
      </div>
    );
  }
}

export default App;
