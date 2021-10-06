import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useSiteMetadata } from "../hooks/use-site-metadata";
import Header from './Header';


const Layout = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return(
    <Container>
      <Row>
        <Col>
          <Header siteTitle={title} siteDescription={description} />
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={12} lg={8}>
          <main>
            <h3>Col 1</h3>
            {children}
          </main>
        </Col>
        <Col sm={12} md={12} lg={4}>
          <h3>Col 2</h3>
        </Col>
      </Row>
      <Row>
        {/* Footer goes here */}
        <p>This is the footer</p>
      </Row>
    </Container>
  );
}
export default Layout;
