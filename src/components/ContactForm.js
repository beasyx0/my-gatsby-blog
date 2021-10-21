import React, { useState, useRef } from 'react';

import axios from 'axios';

import validator from 'validator';

import Loader from 'react-loader-spinner';

import useDarkMode from 'use-dark-mode';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { FaCheck, FaTimes, FaEnvelopeSquare } from 'react-icons/fa';


const ContactForm = () => {

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isWebsiteUrlInput, setIsWebsiteUrlInput] = useState(false); // honey
  const contactFormEmailInputRef = useRef(null);
  const contactFormMessageInputRef = useRef(null);
  const websiteUrlInputRef = useRef(null);
  const getFormIoEndpointUrl = process.env.GATSBY_GETFORM_CONTACT_FORM_ENDPOINT
  const darkMode = useDarkMode();

  const handleOnChange = (e) => {
    if (e.target.name === 'contactFormEmail') {
      setEmail(e.target.value);
    } else {
      setMessage(e.target.value);
    }

    const isValidEmail = validator.isEmail(email);
    const isValidMessage = true; // creating validator soon

    if (isValidEmail && isValidMessage) {
      setButtonDisabled(false);
      setUserMessage('');
      setIsSuccess(true);
      setIsError(false);
    } else {
      setButtonDisabled(true);
      setUserMessage('');
      setIsSuccess(false);
      setIsError(true);
    }
  }

  const handleReset = () => {
    contactFormEmailInputRef.current.value = '';
    contactFormMessageInputRef.current.value = '';
    websiteUrlInputRef.current.value = '';
    setEmail('');
    setMessage('');
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
      let formData = new FormData();
      formData.append('contactFormEmail', email);
      formData.append('contactFormMessage', message);
      await axios({
        method: 'post',
        url: getFormIoEndpointUrl,
        data: formData,
        headers: { 
          "Content-Type": "multipart/form-data" 
        },
      })
      .then(function (response) {
        setIsError(false);
        setIsSuccess(true);
        setUserMessage('Thank you!');
        handleReset();
        setLoading(false);
        console.log(response);
      })
      .catch(function (error) {
        setIsError(true);
        setIsSuccess(false);
        setUserMessage('Something went wrong.');
        setLoading(false);
        console.log(error);
      })
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

  const inputDarkStyles = { 
    backgroundColor: 'transparent', 
    color: '#fff' 
  }

  return(
    <Card className={'mb-4 p-2 bg-transparent shadow'}>
      <Card.Body>
        <h5>
          <FaEnvelopeSquare className={'text-light'} />
          {' '}
          Contact
        </h5>
        <Form onSubmit={handleSubmit}>
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
              ref={contactFormEmailInputRef} 
              style={darkMode.value ? inputDarkStyles : null}
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
              ref={contactFormMessageInputRef} 
              rows={3} 
              style={darkMode.value ? inputDarkStyles : null}
            />

          </Form.Group>
          <Form.Group className={'pt-4 pb-2'}>
            <Button 
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
              className={`
                mx-3 
                ${loading ? 'd-inline' : 'd-none'}
              `}
            />
            <FaTimes 
              className={`
                mx-3 text-danger 
                ${isError ? 'd-inline' : 'd-none'}
              `} 
            />
            
            <FaCheck 
              className={`
                mx-3 text-success 
                ${isSuccess ? 'd-inline' : 'd-none'}
              `} 
            />
          </Form.Group>
          <small 
            className={`
              position-absolute
              ${userMessage ? 'd-inline' : 'd-none'} 
              ${isError && 'text-danger'} 
              ${isSuccess && 'text-success'}
            `}
          >
            {userMessage}
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
              onChange={handleWebsiteUrlInput} 
              ref={websiteUrlInputRef}
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ContactForm;
