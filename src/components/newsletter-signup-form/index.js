import React, { useState, useEffect, useRef } from 'react';

import NewsletterSignupMachine from './NewsletterSignupMachine';
import { useMachine } from '@xstate/react';

import Loader from 'react-loader-spinner';

import useDarkMode from 'use-dark-mode';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { FaCheck, FaTimes, FaRss } from 'react-icons/fa';


const NewsletterSignup = () => {

  const [currentState, send] = useMachine(NewsletterSignupMachine);

  const emailInputRef = useRef(null);
  const websiteUrlInputRef = useRef(null);

  const [formData, setFormData] = useState({
    email: '',
    websiteUrl: '',
    emailInput: emailInputRef,
    websiteUrlInput: websiteUrlInputRef,
  })
  
  const darkMode = useDarkMode();

  const handleSubmit = async (e) => {
    e.preventDefault();
    send({
      type: 'SUBMIT',
      data: formData,
    })
  }

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      email: e.target.value,
      emailInput: emailInputRef,
      websiteUrlInput: websiteUrlInputRef,
    })
  }

  const handleOnChangeWebsiteUrl = (e) => {
    setFormData({
      ...formData,
      websiteUrl: e.target.value,
    })
  }

  useEffect(()=>{
    // only run if the values change in formData
    if (
      formData.email !== '' || 
      formData.websiteUrl !== ''
    ) {
      send({ 
        type: 'CHANGE', 
        data: formData,
      });
    }
  }, [formData, send])

  // honey
  const websiteUrlStyles = {
    position: 'absolute',
    left: '-9999px',
  }

  const notAllowedCursorStyle = {
    cursor: 'not-allowed',
  }

  const emailInputDarkStyles = { 
    backgroundColor: 'transparent', 
    color: '#fff' 
  }

  return(
    <Card className={'mb-4 p-1 bg-transparent shadow'}>
      <Card.Body>
        <h5>
          <FaRss />
          {' '}
          Sign up for the newsletter
        </h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Text>
              Get notified of new posts. Don't worry, your email 
              will never be shared with anyone else.
            </Form.Text>
            <Form.Label for="newsletterEmailInput" className={'invisible'}>
              Email
            </Form.Label>
            <Form.Control 
              required
              type="email" 
              id="newsletterEmailInput" 
              placeholder="Enter email" 
              onChange={handleOnChange} 
              className={'mt-3 mb-3'} 
              ref={emailInputRef}
              style={darkMode.value ? emailInputDarkStyles : {}}
              disabled={currentState.matches('success')}
            />
          </Form.Group>
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
              ref={websiteUrlInputRef}
            />
          </Form.Group>
          <Form.Group>
            <span style={!currentState.matches('valid') && !currentState.matches('error') ? notAllowedCursorStyle : null}>
              <Button 
                id="newsletterButton" 
                variant="primary" 
                type="submit" 
                disabled={!currentState.matches('valid') && !currentState.matches('error')}
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
        </Form>
      </Card.Body>
    </Card>
  );
}

export default NewsletterSignup;
