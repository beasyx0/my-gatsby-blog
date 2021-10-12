import React, { useState, useRef } from 'react';

import validator from 'validator';

import addToMailchimp from 'gatsby-plugin-mailchimp';
import Loader from 'react-loader-spinner';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { FaCheck, FaTimes } from 'react-icons/fa';

import NewsletterSvg from '../../svg/undraw_Newsletter_re_wrob.svg';


// todo: add validation to verify that it's an email being entered
const NewsletterSignup = () => {

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const listFields = {'MMERGE6': window.location.href};
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const emailImputRef = useRef(null);

  const handleReset = () => {
    emailImputRef.current.value = '';
    setEmail('');
    setButtonDisabled(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    setLoading(false);
  }

  const handleOnClick = (e) => {
    setLoading(true);
    setIsSuccess(false);
    setButtonDisabled(true);
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

  const svgStyle = {
    maxWidth: '350px',
  }

  return(
    <Card className={'p-3 bg-transparent shadow'}>
      <div className={'text-center'}>
        <NewsletterSvg className={'img-fluid'} style={svgStyle} />
      </div>

      <Card.Body>
        <Card.Title>
          <h3>Sign up for the newsletter</h3>
        </Card.Title >
        <Form onSubmit={handleSubmit}>
          
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
              ref={emailImputRef}
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
            <FaTimes 
              className={`mx-3 text-danger ${isError ? 'd-inline' : 'd-none'}`} 
            />
            
            <FaCheck 
              className={`mx-3 text-success ${isSuccess ? 'd-inline' : 'd-none'}`} 
            />

            <small 
              className={`d-inline ${isError && 'text-danger'} ${isSuccess && 'text-success'}`}
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
