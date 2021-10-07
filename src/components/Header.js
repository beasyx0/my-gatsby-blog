import React from 'react';

import { Link } from 'gatsby';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ThemeToggle from './ThemeToggle';


const Header = ({ siteTitle, siteDescription }) => {
  return(
    <Link to="/">
      <header>
        <Container className={'m-0 p-0'}>
          <Row>
            <Col xs={10}>
              <h1>{siteTitle}</h1>
              <p>{siteDescription}</p>
            </Col>
            <Col xs={2} className={'pt-4'}>
              <ThemeToggle />
            </Col>
          </Row>
        </Container>
      </header>
    </Link>
  );
}
export default Header;
