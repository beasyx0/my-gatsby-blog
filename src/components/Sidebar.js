import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AllTags from './AllTags';
import NewsletterSignup from './NewsletterSignup';
import GitHubWidget from './GitHubWidget';
import ContactForm from './ContactForm';
// import HCaptchaForm from './HCaptchaForm';
// import HCaptchaFormm from './HCaptchaFormm';


const Sidebar = ({ children }) => {
  return(
    <aside>
      <Container className={'m-0 p-0'}>
        <Row>
          <Col>
            <AllTags />
            <NewsletterSignup />
            <GitHubWidget />
            <ContactForm />
          </Col>
        </Row>
      </Container>
    </aside>
  );
}

export default Sidebar;
