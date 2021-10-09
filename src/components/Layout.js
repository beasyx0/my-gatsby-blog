import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useSiteMetadata } from "../hooks/use-site-metadata";
import Header from './Header';
import Sidebar from './Sidebar';


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
        <Col xs={12} sm={12} md={12} lg={8} xl={8}>
          <main className={'min-vh-100'}>
            <h3>Col 1</h3>
            {children}
          </main>
        </Col>
        <Col sm={12} md={12} lg={4}>
          <Sidebar />
        </Col>
      </Row>
      <Row>
        <p>This is the footer</p>
      </Row>
    </Container>
  );
}
export default Layout;
