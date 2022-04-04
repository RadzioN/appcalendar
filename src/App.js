import './App.css';
import React, { useState } from 'react';
import { Table, Badge, Card, Form, Button } from 'react-bootstrap';
import moment from 'moment';
import 'moment/locale/pl';

function CalendarDays({year, month, selectedDate, setDate, events}) {

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

function CalendarMonths({monthName, setMonth, setViewMode}) {
  return(
    <div className='monthsList'>
      {monthName.map((row, x) => 
        <button key={x} onClick={() => {setMonth(x); setViewMode('days')}} className='buttonMonth'>
          {row}
        </button>
      )}
    </div>
  );
}

function CalendarYears({setYear, setViewMode, year}) {

  let today = new Date();
  let years = new Array(10);

  for(let i = 0; i < 10; i++) {
    years[i] = year++;
  }

  return(
    <div className='yearView'>
      <div className='yearList'>
        {years.map((row, x) => 
          <button key={x} onClick={() => {setYear(row); setViewMode('months')}} className={'buttonYear '+ (today.getFullYear() === row ? 'todayDay ' : '')}>
            {row}
          </button>
        )}
      </div>
    </div>
  );
}

function Calendar({selectedDate, setDate, events}) {

  let today = new Date();
  const [currentMonth, setMonth] = useState(today.getMonth());
  const [currentYear , setYear] = useState(today.getFullYear());
  const [startYear , setStartYear] = useState(currentYear - 5);
  const [viewMode , setViewMode] = useState('days');
  

  let monthName = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

  function next() {
    if(viewMode === 'years') {
      setStartYear(startYear + 10);
    } else {
      let year = (currentMonth === 11) ? currentYear + 1 : currentYear;
      let month = (currentMonth + 1) % 12;
      setYear(year);
      setMonth(month);
    }
  }

  function previous() {
    if(viewMode === 'years') {
      setStartYear(startYear - 10);
    } else {
      let year = (currentMonth === 0) ? currentYear - 1 : currentYear;
      let month = (currentMonth === 0) ? 11 : currentMonth - 1;
      setYear(year);
      setMonth(month);
    }
  }

  function changeView() {
    if(viewMode === 'days') {
      setViewMode('months');
    } else if (viewMode === 'months') {
      setViewMode('years');
    } else {
      setViewMode('days');
    }
  }

  return(
    <div className='calendar'>
      <div className='calendarActions'>
        <button onClick={previous} className='buttonPrevNext'>Poprzedni</button>
        <button onClick={changeView} className='buttonView'><h1>{monthName[currentMonth] + " " + currentYear}</h1></button>
        <button onClick={next} className='buttonPrevNext'>Następny</button>
      </div>
      {
      viewMode === 'days' ? 
        <CalendarDays year={currentYear} month={currentMonth} selectedDate={selectedDate} setDate={setDate} events={events}/>
      : viewMode === 'months' ?
        <CalendarMonths monthName={monthName} setMonth={setMonth} setViewMode={setViewMode}/>
      : <CalendarYears setYear={setYear} setViewMode={setViewMode} year={startYear}/>
      }
      
    </div>
  );
}

function EventsList({selectedDate, events, setEvent}) {

  const [event , setEventName] = useState('');

  selectedDate.setHours(0,0,0,0);
  moment.locale('pl');

  function addEvent() {
    if(event === '') {
      alert("Puste pole");
    } else {
      let id = events.map((x, i) => {
        x.id = i + 1;
        return x;
      });
  
      setEvent([
        ...events,
        {
          id: id,
          date: selectedDate,
          event: event.target.value
        }
      ]);
    }
  }

  return(
    <div className='events-list'>
      <div className='events-head'>
        <h1>Wydarzenia</h1>
      </div>
      <div className='list'>
        <Card>
          <Card.Header as="h5">Nowe Wydarzenie</Card.Header>
          <Card.Body>
            <Form.Control type="event" placeholder="Wprowadź nazwę" onChange={value => setEventName(value)}/>
            <Button className='add-btn' variant="primary" onClick={addEvent}>
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
  const [selectedDate , setDate] = useState(new Date());
  const [events , setEvent] = useState([
    {id: 1, date: new Date(2022, 3, 4), event: "Przypominajka 1"},
    {id: 2, date: new Date(2022, 3, 20), event: "Przypominajka 2"},
  ]);

  return (
    <div className="App">
      <Calendar selectedDate={selectedDate} setDate={setDate} events={events}/>
      <EventsList selectedDate={selectedDate} events={events} setEvent={setEvent}/>
    </div>
  );
}

export default App;
