import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function TopNavbar() {
  const [adminID, setAdminID] = useState(0);
  useEffect(()=>{
      setAdminID(localStorage.getItem('fosadminsecretsID'));
  },[])
  
  const navigate = useNavigate();

  function handleLogOut (){
  //* Get confirmation to logOut or not
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons
    .fire({
      title: 'Are you sure?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, LogOut!',
      cancelButtonText: 'No, Stay in!',
      reverseButtons: true
    })
    .then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("fosadminsecretsID")
        navigate("/")
        window.location.reload();
      }
    });

  }

  return (
    <div className='d-flex justify-content-between pe-3'>
        <h2>FOS</h2>
        {
          (adminID>0)
          ?
          <button onClick={handleLogOut} className='btn btn-danger'>Log out</button>
          :
          <FontAwesomeIcon className='fs-2' icon={faGear} />
        }
    </div>
  )
}

export default TopNavbar
