import './App.css';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { Container, Row, Col, Button } from 'react-bootstrap';

function App() {
  const [value, onChange] = useState(new Date());

  const events = [new Date(2022, 3, 2), new Date(2022, 3, 5)]

  return (
    <Container fluid>
      <Row>
        <Col>
          <Calendar onChange={onChange} value={value} tileClassName={({ date, view }) => view === 'month' && events.toLocaleString().includes(date.toLocaleString()) ? 'event' : null}/>
        </Col>
        <Col md lg="4" className='eventSide'>
          <Container fluid className='eventBar'>
            <h2>Wydarzenia</h2>
          </Container>
          <Button variant="light" className='addEvent'>Dodaj</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
