import React, { useState, useEffect } from 'react';

function DateTimeDisplay() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once after the initial render

  const formattedDate = currentDateTime.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });

  const formattedTime = currentDateTime.toLocaleTimeString();

  return (
    <div className='d-flex gap-3 justify-content-center mt-3'>
      <p>{formattedDate}</p>
      <p>{formattedTime}</p>
    </div>
  );
}

export default DateTimeDisplay;
