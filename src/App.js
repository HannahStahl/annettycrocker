import React, { Component } from 'react';
import { Col, Button, Modal, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap';
import './App.css';
import config from './config';

var validator = require('validator');

const sendEmailURL = "https://2w75n274dh.execute-api.us-east-1.amazonaws.com/prod/email/send";

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getPhotos = this.getPhotos.bind(this);
    this.state = {
      show: false,
      name: '',
      email: '',
      message: '',
      showErrorOnName: false,
      showErrorOnEmail: false,
      showErrorOnMessage: false,
      contactFormHeader: 'I would love to bake for you! Please include the details of what you are looking for below. I will get back to you shortly to discuss!',
      loadingPhotos: true,
      photos: []
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
      showErrorOnMessage: false, 
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

  async handleSubmit() {
    await this.setState({
      showErrorOnName: this.state.name.length === 0,
      showErrorOnEmail: validator.isEmail(this.state.email) === false,
      showErrorOnMessage: this.state.message.length === 0
    });
    const allFieldsValid = !(
      this.state.showErrorOnName ||
      this.state.showErrorOnEmail ||
      this.state.showErrorOnMessage
    );
    if (allFieldsValid) {
      fetch(sendEmailURL, {
        method: 'post',
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          content: this.state.message
        }),
      }).then(() => {
        this.setState({
          name: '',
          email: '',
          message: '',
          showErrorOnName: false,
          showErrorOnEmail: false,
          showErrorOnMessage: false,
          contactFormHeader: 'Sent!',
        });
      }).catch((error) => {
        console.log(error);
        this.setState({
          contactFormHeader: 'Oops! Something went wrong. Please email me at annettycrocker@gmail.com.',
        });
      });
    }
  }

  getPhotos() {
    var req = new XMLHttpRequest();
    req.open("GET", config.photosURL+config.username, true);
    req.onreadystatechange = function() {
      if (req.readyState === 4 && req.status === 200) {
        this.setState({
          loadingPhotos: false,
          photos: JSON.parse(req.responseText)
        });
      }
    }.bind(this);
    req.send();
  }

  componentWillMount() {
    this.getPhotos();
  }

  render() {
    return (!this.state.loadingPhotos &&
      <div className="App">
        <div className="gallery">
          {this.state.photos.map(function(photo) {
            return (
              <img
                key={photo.photoId}
                src={config.cloudFrontURL + photo.image}
                alt="Img"
                className="App-photo"
              />
            );
          })}
        </div>
        <Modal className="App-modal" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header className="App-modal-header" closeButton />
          <div>
            <Modal.Body>
              <p>{this.state.contactFormHeader}</p>
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
          </div>
        </Modal>
        <div className="App-order-button-container">
          <Button className="App-button App-order-button" onClick={this.handleShow}>Request custom order!</Button>
        </div>
      </div>
    );
  }
}

export default App;
