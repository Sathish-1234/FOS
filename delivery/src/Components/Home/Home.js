import React from 'react'
import Statistics from './Statistics'
import Orders from './Orders'


function Home() {
  return (
    <div style={{minHeight:'70vh'}}>
        <Statistics/>
        <hr/> 
        <Orders/>
    </div>
  )
}

export default Home