import './App.css';
import React, { useState } from 'react';
import { Table, Badge, Card, Form, Button } from 'react-bootstrap';
import moment from 'moment';
import 'moment/locale/pl';

function CalendarDays() {

  let today = new Date();
  today.setHours(0,0,0,0);


  let firstDay = (new Date(year, month)).getDay() - 1;

  function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
  }

  let date = 1;

  let calendarRows = new Array(6);

  for(let i = 0; i < 6; i++) {
    calendarRows[i] = new Array(7);
    for(let j = 0; j < 7; j++) {
      if(i === 0 && j < firstDay) {
        calendarRows[i][j] = "";
      } else if(date > daysInMonth(month, year)) {
        break;
      } else {
        calendarRows[i][j] = date;
        date++;
      }
    }
  }

  let weekDaysShortName = ["Pon", "Wto", "Śro", "Czw", "Pią", "Sob", "Nie"];

  function isToday(day) {
    let date = new Date(year, month, day);
    if(date.getTime() === today.getTime()) {
      return true;
    } else {
      return false;
    }
  }

  function activeDay(day) {
    let date = new Date(year, month, day);
    if(date.getTime() === selectedDate.getTime()) {
      return true;
    } else {
      return false;
    }
  }


  return(
    <Table bordered>
      <thead>
        <tr>
          {weekDaysShortName.map((row, x)=> 
            <th key={x}>{row}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {calendarRows.map((row, x) => 
          <tr key={x}>
            {row.map((row, y) => 
              <td key={y} className='day'>
                <button className={'dayButton ' + (isToday(row) ? 'todayDay ' : '') + (activeDay(row) ? 'activeDay ' : '') + ( y === 5 || y === 6 ? 'isWeekend ' : '') + ( row === '' ? 'emptyDay ' : '' )} onClick={() => setDate(new Date(year, month, row))}>
                  {row}
                  <Badge className={"badge " + (events.filter(e => e.date.getTime() === (new Date(year, month, row).getTime())).length > 0 ? 'isEventDay' : '')}>
                    {events.filter(e => e.date.getTime() === (new Date(year, month, row).getTime())).length}
                  </Badge>
                </button>
              </td> 
            )}
          </tr>
        )}
      </tbody>
    </Table>
  );
}

function CalendarMonths() {
  return(
    <div className='monthsList'>
      {monthName.map((row, x) => 
        <button key={x} className='buttonMonth'>
          {row}
        </button>
      )}
    </div>
  );
}

function CalendarYears() {

  let today = new Date();
  let years = new Array(10);

  for(let i = 0; i < 10; i++) {
    years[i] = year++;
  }

  return(
    <div className='yearView'>
      <div className='yearList'>
        {years.map((row, x) => 
          <button key={x} className={'buttonYear '+ (today.getFullYear() === row ? 'todayDay ' : '')}>
            {row}
          </button>
        )}
      </div>
    </div>
  );
}

function Calendar() {

  let today = new Date();

  let monthName = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

  return(
    <div className='calendar'>
      <div className='calendarActions'>
        <button className='buttonPrevNext'>Poprzedni</button>
        <button className='buttonView'><h1>{monthName[currentMonth] + " " + currentYear}</h1></button>
        <button className='buttonPrevNext'>Następny</button>
      </div>
      {
      viewMode === 'days' ? 
        <CalendarDays/>
      : viewMode === 'months' ?
        <CalendarMonths/>
      : <CalendarYears/>
      }
      
    </div>
  );
}

function EventsList() {

  selectedDate.setHours(0,0,0,0);
  moment.locale('pl');

  return(
    <div className='events-list'>
      <div className='events-head'>
        <h1>Wydarzenia</h1>
      </div>
      <div className='list'>
        <Card>
          <Card.Header as="h5">Nowe Wydarzenie</Card.Header>
          <Card.Body>
            <Form.Control type="event" placeholder="Wprowadź nazwę"/>
            <Button className='add-btn' variant="primary">
              Dodaj
            </Button>
           </Card.Body>
        </Card>
        <hr/>
        {events.filter(e => e.date.getTime() === selectedDate.getTime()).map((row, x) => 
          <Card key={x}>
            <Card.Header as="h5">{moment(row.date).format('LL')}</Card.Header>
            <Card.Body>
              <Card.Title>{row.event}</Card.Title>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
}

function App() {
return (
    <div className="App">
      <Calendar />
      <EventsList />
    </div>
  );
}

export default App;
