import './App.css';
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';

function CalendarDays(props) {

  let today = new Date();
  today.setHours(0,0,0,0);

  const [selectedDate , setDate] = useState(today);

  let firstDay = (new Date(props.year, props.month)).getDay() - 1;

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
      } else if(date > daysInMonth(props.month, props.year)) {
        break;
      } else {
        calendarRows[i][j] = date;
        date++;
      }
    }
  }

  let weekDaysShortName = ["Pon", "Wto", "Śro", "Czw", "Pią", "Sob", "Nie"];

  function isToday(day) {
    let date = new Date(props.year, props.month, day);
    if(date.getTime() === today.getTime()) {
      return true;
    } else {
      return false;
    }
  }

  function activeDay(day) {
    let date = new Date(props.year, props.month, day);
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
              <td key={y} className='day'><button className={'dayButton ' + (isToday(row) ? 'todayDay ' : '') + (activeDay(row) ? 'activeDay ' : '') + ( y === 5 || y === 6 ? 'isWeekend ' : '') + ( row === '' ? 'emptyDay' : '' )} onClick={() => setDate(new Date(props.year, props.month, row))}>{row}</button></td> 
            )}
          </tr>
        )}
      </tbody>
    </Table>
  );
}

function CalendarMonths({setMonth, setViewMode}) {

  let monthName = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];

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

function Calendar() {

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
    <div>
      <div className='calendarActions'>
        <button onClick={previous} className='buttonPrevNext'>Poprzedni</button>
        <button onClick={changeView} className='buttonView'><h1>{monthName[currentMonth] + " " + currentYear}</h1></button>
        <button onClick={next} className='buttonPrevNext'>Następny</button>
      </div>
      {
      viewMode === 'days' ? 
        <CalendarDays year={currentYear} month={currentMonth}/>
      : viewMode === 'months' ?
        <CalendarMonths setMonth={setMonth} setViewMode={setViewMode}/>
      : <CalendarYears setYear={setYear} setViewMode={setViewMode} year={startYear}/>
      }
      
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Calendar />
    </div>
  );
}

export default App;
