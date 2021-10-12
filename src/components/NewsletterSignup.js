import React, { useState, useRef } from 'react';

import validator from 'validator';

import addToMailchimp from 'gatsby-plugin-mailchimp';
import Loader from 'react-loader-spinner';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { FaCheck, FaTimes } from 'react-icons/fa';


const NewsletterSignup = () => {

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isWebsiteUrlInput, setIsWebsiteUrlInput] = useState(false); // honey
  const emailImputRef = useRef(null);
  const websiteUrlInputRef = useRef(null);
  const listFields = {'MMERGE6': window.location.href};

  const handleReset = () => {
    emailImputRef.current.value = '';
    websiteUrlInputRef.current.value = '';
    setEmail('');
    setButtonDisabled(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsSuccess(false);
    setButtonDisabled(true);
    if (isWebsiteUrlInput) {
      setIsError(false);
      setIsSuccess(true);
      handleReset();
    } else {
      const result = await addToMailchimp(email, listFields);
      if (result.result === 'success') {
        setIsError(false);
        setIsSuccess(true);
        setMessage('Thank you!');
        handleReset();
      } else {
        setIsError(true);
        setIsSuccess(false);
        setMessage('Something went wrong, please try again.');
      }
    }
    setLoading(false);
  }

  const handleOnChange = (e) => {
    const isValidEmail = validator.isEmail(e.target.value);
    if (isValidEmail) {
      setEmail(e.target.value);
      setIsError(false);
      setIsSuccess(true);
      setMessage('');
      setButtonDisabled(false);
    } else {
      setIsError(true);
      setIsSuccess(false);
      setMessage('');
      setButtonDisabled(true);
    }
  }

  const handleWebsiteUrlInput = (e) => {
    e.preventDefault();
    setIsWebsiteUrlInput(true);
  }

  // honey
  const websiteUrlStyles = {
    position: 'absolute',
    left: '-9999px',
  }

  return(
    <Card className={'p-1 bg-transparent shadow'}>
      <Card.Body>
        <Card.Title>            
          <h3 className={'h5'}>Sign up for the newsletter</h3>
        </Card.Title >
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Text>
              Get notified of new posts. Don't worry, your email 
              will never be shared with anyone else.
            </Form.Text>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              onChange={handleOnChange} 
              className={'mt-3 mb-3 required'} 
              ref={emailImputRef}
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
                onChange={handleWebsiteUrlInput} 
                ref={websiteUrlInputRef}
              />
          </Form.Group>
          <Form.Group>
            <Button 
              id="newsletterButton" 
              variant="primary" 
              type="submit" 
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
            <FaTimes 
              className={`mx-3 text-danger ${isError ? 'd-inline' : 'd-none'}`} 
            />
            
            <FaCheck 
              className={`mx-3 text-success ${isSuccess ? 'd-inline' : 'd-none'}`} 
            />

            <small 
              className={`${message ? 'd-inline' : 'd-none'} ${isError && 'text-danger'} ${isSuccess && 'text-success'}`}
            >
              {message}
            </small>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default NewsletterSignup;
