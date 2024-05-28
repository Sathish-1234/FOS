import React, { useState } from 'react'

function MyEarnings() {

  const [selectedDate, setSelectedDate] = useState(getTodayDate());

  // Function to get today's date in the format 'YYYY-MM-DD'
  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Event handler for date input change
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div style={{minHeight:'70vh'}}>
      <center className='m-4'>
        <h4>My Earning Detials</h4>
      </center>

      <div className='my-4 text-center'>
          <span>Choose Date : </span>
          <input
            className='ms-3 btn btn-primary'
            type='date'
            value={selectedDate}
            onChange={handleDateChange}
          />
      </div>

      <div className='row'>
        <div className='col-4'>
          aaa
        </div>
      </div>
    </div>
  )
}

export default MyEarnings