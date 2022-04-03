import './App.css';

function CalendarDays(props) {

  let firstDay = (new Date(props.year, props.month)).getDate();

  function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
  }

  let date = 1;

  var [calendarRows] = [6][7];

  for(let i = 0; i < 6; i++) {
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

  console.log(calendarRows);

  return(
    <div>
      
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Kalendarz</h1>
      <CalendarDays year="2022" month="3"/>
    </div>
  );
}

export default App;
