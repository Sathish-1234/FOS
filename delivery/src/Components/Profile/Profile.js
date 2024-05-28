import React from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Profile() {

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
          localStorage.removeItem("dpId")
          navigate("/")
          window.location.reload();
        }
      });
  
    }

  return (
    <div>
      <center>
        <button onClick={handleLogOut} className='btn btn-danger my-5'>LogOut</button>
      </center>
    </div>
  )
}

export default Profile