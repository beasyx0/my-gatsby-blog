import React from 'react';
import { Link } from 'gatsby';
import useDarkMode from 'use-dark-mode';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ThemeToggle from './ThemeToggle';


const Header = ({ siteTitle, siteDescription }) => {

  const darkMode = useDarkMode();

  return(
      <header className={`mb-2 border-bottom ${darkMode.value && 'border-secondary' }`}> 
        <Container className={'m-0 p-0'}>
          <Row>
            <Col xs={10}>
              <Link to="/">
                <h1 className={'d-inline-block'}>{siteTitle}</h1>
                <br />
                <p className={'d-inline-block'}>{siteDescription}</p>
              </Link>
            </Col>
            <Col xs={2} className={'pt-4'}>
              <ThemeToggle />
            </Col>
          </Row>
        </Container>
      </header>
  );
}
export default Header;
