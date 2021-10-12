import React, { useState, useEffect, useRef } from 'react';
import validator from 'validator';
import addToMailchimp from 'gatsby-plugin-mailchimp';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import Loader from 'react-loader-spinner';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaCheck, FaTimes } from 'react-icons/fa';


// todo: add validation to verify that it's an email being entered
const HCaptchaForm = () => {

  const [email, setEmail] = useState('');
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const captchaRef = useRef(null);
  const hCaptchaSiteKey = process.env.GATSBY_HCAPTCHA_SITE_KEY;
  const mailChimpListFields = {'MMERGE6': window.location.href};

  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    setEmail('');
    setToken(null);
    setLoading(false);
    setIsError(false);
    setButtonDisabled(true);
    captchaRef.current.resetCaptcha();
  };

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
    } else {
      setIsError(true);
      setIsSuccess(false);
      setMessage('');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    captchaRef.current.execute();
    // if (token) {
    //   const result =  await addToMailchimp(email, mailChimpListFields);
    //   if (result.result === 'success') {
    //     setIsError(false);
    //     setIsSuccess(true);
    //     setMessage('Thank you!');
    //     handleReset();
    //   } else {
    //     setIsError(true);
    //     setIsSuccess(false);
    //     setMessage('Something went wrong, please try again.');
    //   }
    // }
  }

  const onExpire = () => {
    alert("hCaptcha Token Expired");
  };

  const onError = (err) => {
    alert(`hCaptcha Error: ${err}`);
  };

  useEffect(() => {
    if (token) {
      setButtonDisabled(false);
    }    
  }, [token]);

  return(
    <Card className={'bg-transparent shadow'}>
      <Card.Body>
        <Card.Title>
          <h3>Sign up for the newsletter</h3>
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
            />
          </Form.Group>
          <Form.Group>
            <HCaptcha
              sitekey={hCaptchaSiteKey}
              onVerify={setToken}
              onError={onError}
              onExpire={onExpire}
              ref={captchaRef}
              theme={'dark'}
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
              className={`mx-2 ${loading ? 'd-inline' : 'd-none'}`}
            />
            <FaTimes 
              className={`mx-2 text-danger ${isError ? 'd-inline' : 'd-none'}`} 
            />
            
            <FaCheck 
              className={`mx-2 text-success ${isSuccess ? 'd-inline' : 'd-none'}`} 
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

export default HCaptchaForm;
