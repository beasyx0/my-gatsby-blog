import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AllTags from './AllTags';


const Sidebar = ({ children }) => {
  return(
    <aside>
      <Container className={'m-0 p-0'}>
        <Row>
          <Col>
            <AllTags />
          </Col>
        </Row>
      </Container>
    </aside>
  );
}

export default Sidebar;
