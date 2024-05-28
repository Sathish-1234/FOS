import React from 'react'
import Unknown_person from '../../assests/Unknown_person.jpg'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='px-4 py-md-3 py-4 bg-primary text-white d-flex justify-content-between'>
        <div className='h2 pointer'>Foodie</div>
        <Link to={'my-profile'}><img className='profileImg pointer' src={Unknown_person} alt='profile' /></Link>
    </div>
  )
}

export default Navbar