import React from 'react'
import DateTimeDisplay from '../../Utils/DateTimeDisplay'

function Statistics() {
    
  return (
    <center>
        <h3><DateTimeDisplay/></h3>
        <div className='row mt-3 gap-5 justify-content-center text-white'>
            <div className='col-5 s-box box-border'>
                <h1>5</h1>
                <h5><center>Pending Orders</center></h5>
            </div>
            <div className='col-5 s-box box-border'>
                <h1>25</h1>
                <h5><center>Completed Orders</center></h5>
            </div>
            <div className='col-5 s-box box-border'>
                <h1>$ 235</h1>
                <h5><center>Total Collected</center></h5>
            </div>
            <div className='col-5 s-box box-border'>
                <h1>$ 55</h1>
                <h5><center>Your earnings</center></h5>
            </div>
        </div>
    </center>
  )
}

export default Statistics