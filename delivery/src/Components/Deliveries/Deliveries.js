import React, { useState } from 'react'
import { Accordion } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function Deliveries() {
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
        <h4>Delivery Detials</h4>
      </center>

      <div className='my-4 text-end'>
          <span>Choose Date : </span>
          <input
            className='ms-3 btn btn-primary'
            type='date'
            value={selectedDate}
            onChange={handleDateChange}
          />
      </div>

      <Accordion >
        <Accordion.Item className='mb-4' eventKey="0">
          <Accordion.Header>
            <div className=''>
              <h6>Successfull Delivery </h6>
              <h6>= 25 Orders</h6>
            </div>
          </Accordion.Header>
          <Accordion.Body>
          <table className='table'>
              <thead>
                  <tr>
                      <th>Order ID</th>
                      <th>Cus Name</th>
                      <th>Amount</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td># 2314</td>
                      <td>Siva</td>
                      <td>$ 15</td>
                  </tr>
                  <tr>
                      <td># 2314</td>
                      <td>Siva</td>
                      <td>$ 15</td>
                  </tr>
                  <tr>
                      <td># 2314</td>
                      <td>Siva</td>
                      <td>$ 15</td>
                  </tr>
                  <tr>
                      <td># 2314</td>
                      <td>Siva</td>
                      <td>$ 15</td>
                  </tr>
              </tbody>
          </table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item className='mb-4' eventKey="1">
          <Accordion.Header>
            <div>
              <h6>Cancelled By You </h6>
              <h6>= 5 Orders</h6>
            </div>
          </Accordion.Header>
          <Accordion.Body>
          <table className='table'>
              <thead>
                  <tr>
                      <th>Order ID</th>
                      <th>Cus Name</th>
                      <th>Amount</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td># 2314</td>
                      <td>Siva</td>
                      <td>$ 15</td>
                  </tr>
                  <tr>
                      <td># 2314</td>
                      <td>Siva</td>
                      <td>$ 15</td>
                  </tr>
                  <tr>
                      <td># 2314</td>
                      <td>Siva</td>
                      <td>$ 15</td>
                  </tr>
                  <tr>
                      <td># 2314</td>
                      <td>Siva</td>
                      <td>$ 15</td>
                  </tr>
              </tbody>
          </table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item className='mb-4' eventKey="2">
          <Accordion.Header>
            <div>
              <h6>Cancelled By Customer </h6>
              <h6>= 10 Orders</h6>
            </div>
          </Accordion.Header>
          <Accordion.Body>
          <table className='table'>
              <thead>
                  <tr>
                      <th>Order ID</th>
                      <th>Cus Name</th>
                      <th>Amount</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td># 2314</td>
                      <td>Siva</td>
                      <td>$ 15</td>
                  </tr>
                  <tr>
                      <td># 2314</td>
                      <td>Siva</td>
                      <td>$ 15</td>
                  </tr>
                  <tr>
                      <td># 2314</td>
                      <td>Siva</td>
                      <td>$ 15</td>
                  </tr>
                  <tr>
                      <td># 2314</td>
                      <td>Siva</td>
                      <td>$ 15</td>
                  </tr>
              </tbody>
          </table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item className='mb-4' eventKey="3">
          <Accordion.Header>
            <div className=''>
              <h6>Other Issues </h6>
              <h6>= 15 Orders</h6>
            </div>
          </Accordion.Header>
          <Accordion.Body>
          <table className='table'>
              <thead>
                  <tr>
                      <th>Order ID</th>
                      <th>Cus Name</th>
                      <th>Amount</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td># 2314</td>
                      <td>Siva</td>
                      <td>$ 15</td>
                  </tr>
                  <tr>
                      <td># 2314</td>
                      <td>Siva</td>
                      <td>$ 15</td>
                  </tr>
                  <tr>
                      <td># 2314</td>
                      <td>Siva</td>
                      <td>$ 15</td>
                  </tr>
                  <tr>
                      <td># 2314</td>
                      <td>Siva</td>
                      <td>$ 15</td>
                  </tr>
              </tbody>
          </table>
          </Accordion.Body>
        </Accordion.Item>
        
      </Accordion>

      
    </div>
  )
}

export default Deliveries