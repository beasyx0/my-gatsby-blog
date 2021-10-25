import React, { useState, useEffect, useRef } from 'react';

import contactFormMachine from './ContactFormMachine';
import { useMachine } from '@xstate/react';

import Loader from 'react-loader-spinner';

import useDarkMode from 'use-dark-mode';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { FaCheck, FaTimes, FaEnvelopeSquare } from 'react-icons/fa';


const ContactForm = () => {

  const [currentState, send] = useMachine(contactFormMachine);

  const emailInputRef = useRef(null);
  const messageInputRef = useRef(null);

  const [formData, setFormData] = (
    useState({ 
      email: '', 
      message: '',
      websiteUrlInput: '',
      emailInput: emailInputRef,
      messageInput: messageInputRef,
    })
  );

  const darkMode = useDarkMode();

  const handleOnChange = (e) => {
    // setFormData doesnt update the state object immediately, 
    // using useEffect below to send CHANGE the state machine.
    e.target.name === 'contactFormEmail' ? (
      setFormData({
        ...formData,
        email: e.target.value,
        emailInput: emailInputRef,
        messageInput: messageInputRef,
      })
    ) : (
      setFormData({
        ...formData,
        message: e.target.value,
        emailInput: emailInputRef,
        messageInput: messageInputRef,
      })
    );
  }

  const handleOnChangeWebsiteUrl = (e) => {
    setFormData({
      ...formData,
      websiteUrlInput: e.target.value,
    })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    send({
      type: 'SUBMIT',
      data: formData,
    });
  }

  useEffect(()=>{
    // only run if the values change in formData
    if (formData.email !== '' || formData.message !== '') {
      send({ 
        type: 'CHANGE', 
        data: formData,
      });
    }
  }, [formData, send])

  const websiteUrlStyles = {
    position: 'absolute',
    left: '-9999px',
  }

  const notAllowedCursorStyle = {
    cursor: 'not-allowed',
  }

  const inputDarkStyles = { 
    backgroundColor: 'transparent', 
    color: '#fff' 
  }

  return(
    <Card className={'mb-4 p-2 bg-transparent shadow'}>
      <Card.Body>
        <h5>
          <FaEnvelopeSquare className={darkMode.value ? 'text-light' : 'text-dark'} />
          {' '}
          Contact
        </h5>
        <Form onSubmit={handleOnSubmit}>
          <Form.Group>

            <Form.Label 
              for="contactFormEmailInput" 
              className={'invisible'} 
            >
              Email
            </Form.Label>

            <Form.Control 
              id="contactFormEmailInput" 
              required
              type="email" 
              name="contactFormEmail" 
              placeholder="Enter email" 
              onChange={handleOnChange} 
              ref={emailInputRef}
              style={darkMode.value ? inputDarkStyles : null} 
              disabled={currentState.matches('success')}
            />

            <Form.Label 
              for="contactFormMessageInput" 
              className={'invisible'} 
            >
              Message
            </Form.Label>

            <Form.Control 
              id="contactFormMessageInput" 
              required 
              as="textarea" 
              name="contactFormMessage" 
              placeholder="Enter a message.." 
              onChange={handleOnChange} 
              ref={messageInputRef}
              rows={3}
              style={darkMode.value ? inputDarkStyles : null}
              disabled={currentState.matches('success')}
            />

          </Form.Group>
          <Form.Group className={'pt-4 pb-2'}>
            <span style={!currentState.matches('valid') ? notAllowedCursorStyle : null}>
              <Button 
                variant="primary" 
                type="submit" 
                disabled={!currentState.matches('valid')}
              >
                Submit
              </Button>
            </span>
            {currentState.matches('invalid') && (
              <FaTimes className={'mx-3 d-inline text-danger'} />
            )}
            {currentState.matches('valid') && (
              <FaCheck className={'mx-3 d-inline text-success'} />
            )}
            {currentState.matches('submitting') && (
              <Loader
                type="Puff"
                color="#00BFFF"
                height={35}
                width={35}
                className={'mx-3 d-inline'}
              />
            )}
            {currentState.matches('success') && (
              <small className={'mx-3 text-success'}>Thank you.</small>
            )}
            {currentState.matches('error') && (
              <small className={'mx-3 text-danger'}>Something went wrong.</small>
            )}
          </Form.Group>
          <small 
            className={`
              position-absolute
            `}
          >
          {/*  {userMessage}*/}
          </small>
          <Form.Group style={websiteUrlStyles}>
            <Form.Label for="websiteUrl">
              Your website
            </Form.Label>
            <Form.Control
              type="text" 
              id="websiteUrl" 
              name="url" 
              tabindex="-1" 
              autocomplete="no" 
              onChange={handleOnChangeWebsiteUrl} 
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ContactForm;
