import React, { Component } from 'react';
import { Col, Button, Modal, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap';
import Instafeed from 'instafeed.js';
import './App.css';

var validator = require('validator');

var feed = new Instafeed({
  get: 'user',
  userId: '9436320028',
  accessToken: '9436320028.d6b2746.de3414163bb3419dac64d022bd252833',
  template: '<img src="{{image}}" class="App-photo" />',
  resolution: 'standard_resolution'
});
feed.run();

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      show: false,
      name: '',
      email: '',
      message: '',
      showErrorOnName: false,
      showErrorOnEmail: false,
      showErrorOnMessage: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({
      show: true,
      name: '',
      email: '',
      message: '',
      showErrorOnName: false,
      showErrorOnEmail: false,
      showErrorOnMessage: false      
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === 'name') {
      this.setState({ showErrorOnName: false });
    } else if (e.target.name === 'email') {
      this.setState({ showErrorOnEmail: false });
    } else if (e.target.name === 'message') {
      this.setState({ showErrorOnMessage: false });
    }
  }

  handleSubmit() {
    this.setState({
      showErrorOnName: this.state.name.length === 0,
      showErrorOnEmail: validator.isEmail(this.state.email) === false,
      showErrorOnMessage: this.state.message.length === 0
    });
    if (!(
      this.state.showErrorOnName ||
      this.state.showErrorOnEmail ||
      this.state.showErrorOnMessage
    )) {
      // TODO - send email from backend
    }
  }

  render() {
    return (
      <div className="App">
        <div id="instafeed" />
        <Modal className="App-modal" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header className="App-modal-header" closeButton />
          <Modal.Body>
            <p>I would love to bake for you! Please include the details of what you are looking for below. I will get back to you shortly to discuss!</p>
            <Form horizontal className="App-form">
              <FormGroup validationState={this.state.showErrorOnName ? 'error' : null}>
                <Col componentClass={ControlLabel} sm={2}>Name:</Col>
                <Col sm={10}>
                  <FormControl
                    className="App-form-field App-short-field"
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup validationState={this.state.showErrorOnEmail ? 'error' : null}>
                <Col componentClass={ControlLabel} sm={2}>Email:</Col>
                <Col sm={10}>
                  <FormControl
                    className="App-form-field App-short-field"
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  </Col>
              </FormGroup>
              <FormGroup validationState={this.state.showErrorOnMessage ? 'error' : null}>
                <Col componentClass={ControlLabel} sm={2}>Message:</Col>
                <Col sm={10}>
                  <FormControl
                    className="App-form-field App-message"
                    componentClass="textarea"
                    name="message"
                    value={this.state.message}
                    onChange={this.handleChange}
                  />
                </Col>
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
