import './App.css';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  const events = [
    new Date(2022, 3, 2),
    new Date(2022, 3, 5)
  ];

  return (
    <Container fluid>
      <Row>
        <Col>
          <Calendar tileClassName={({ date, view }) => view === 'month' && events.toLocaleString().includes(date.toLocaleString()) ? 'event' : null}/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
