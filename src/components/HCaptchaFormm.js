import React, { useEffect, useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import validator from 'validator';
import addToMailchimp from 'gatsby-plugin-mailchimp';
import Loader from 'react-loader-spinner';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaCheck, FaTimes } from 'react-icons/fa';


const HCaptchaFormm = () => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const captchaRef = useRef(null);
  const emailInputRef = useRef(null);
  const HCaptchaSiteKey = process.env.GATSBY_HCAPTCHA_SITE_KEY;
  const mailChimpListFields = {'MMERGE6': window.location.href};


  const handleOnChange = (e) => {
    const isValidEmail = validator.isEmail(e.target.value);
    if (isValidEmail) {
      setEmail(e.target.value);
      setIsSuccess(true);
      setIsError(false);
    } else {
      setIsSuccess(false);
      setIsError(true);
    }
  }

  const handleOnClick = (e) => {
    setLoading(true);
    setSubmitDisabled(true);
    setIsSuccess(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    captchaRef.current.execute();
    
    emailInputRef.current.value = '';
    if (token) {
      addToMailchimp(email, mailChimpListFields)
        .then(data => {
          if (data.result === 'error') {
            setSubmitDisabled(false); 
          }
          setToken(null);
          setLoading(false);
          captchaRef.current.resetCaptcha();
        }
      )
    }
  };

  const onExpire = () => {
    console.log("hCaptcha Token Expired");
  };

  const onError = (err) => {
    console.log(`hCaptcha Error: ${err}`);
  };

  useEffect(() => {
    if (token) {
      // Token is set, can submit here
      setIsSuccess(false);
      setSubmitDisabled(false);
    }
  }, [token]);

  return (
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
              type="email"
              ref={emailInputRef}
            />
          </Form.Group>

          <Form.Group>
            <HCaptcha
              sitekey={HCaptchaSiteKey}
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
              className={submitDisabled && 'disabled'}
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

          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default HCaptchaFormm;
