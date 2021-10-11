import React, { useState } from 'react';

import validator from 'validator';

import addToMailchimp from 'gatsby-plugin-mailchimp';
import Loader from 'react-loader-spinner';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


// todo: add validation to verify that it's an email being entered
const NewsletterSignup = () => {

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(true);
  const listFields = {'MMERGE6': window.location.href}
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addToMailchimp(email, listFields);
    if (result.result === 'error') {
      setMessage('Something went wrong, please try again.');
      setIsError(true);
    } else {
      setMessage('Thank you for subscribing!');
      setIsError(false);
    }
    setLoading(false);
    setButtonDisabled(false);
  }

  const handleOnClick = (e) => {
    setLoading(true);
    setButtonDisabled(true);
  }

  const handleOnChange = (e) => {
    const isValidEmail = validator.isEmail(e.target.value);
    if (isValidEmail) {
      setEmail(e.target.value);
      setMessage('');
      setIsError(false);
      setButtonDisabled(false);
    } else {
      setMessage('Please enter a valid email address');
      setIsError(true);
      setButtonDisabled(true);
    }
  }

  return(
    <Form onSubmit={handleSubmit}>
      <h4>Sign up for the newsletter</h4>
      
      <Form.Group className={''}>
        <Form.Text>
          Get notified of new posts. Don't worry, your email 
          will never be shared with anyone else.
        </Form.Text>
        <Form.Control 
          type="email" 
          placeholder="Enter email" 
          onChange={handleOnChange} 
          className={'mt-3 mb-3 required'} 
        />
      </Form.Group>
      <Form.Group className={'mb-3'}>
        <Button 
          id="newsletterButton" 
          variant="primary" 
          type="submit" 
          onClick={handleOnClick}
          className={buttonDisabled && 'disabled'}
        >
          Submit
        </Button>
        <Loader
          type="Puff"
          color="#00BFFF"
          height={35}
          width={35}
          className={`mx-3 ${loading ? 'd-inline' : 'd-none'}`}
        />
      </Form.Group>
      <Form.Group>
        <Form.Text>
          <span 
            className={`position-absolute ${isError ? 'text-danger' : 'text-success'}`}
          >
            {message || ' '}
          </span>
        </Form.Text>
      </Form.Group>
    </Form>
  );
}

export default NewsletterSignup;
