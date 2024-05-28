import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck, faXmark} from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';

function CurrentOrder() {

    const acceptOrder = () =>{
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Accepted OrderID #2314",
            showConfirmButton: false,
            timer: 2000
          });
    }

    const rejectOrder = () =>{
        Swal.fire({
            title: "Are you sure?",
            text: `You will get ***"NEGATIVE"*** score`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject it!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Rejected!",
                text: "",
                icon: "success"
              });
            }
          });
    }
  return (
    <div className='mt-4'>
        <center>
            <h4 className='text-primary'>Current Order </h4>
        </center>

        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td># 2314</td>
                        <td>Siva</td>
                        <td>$ 15</td>
                        <td className='d-flex gap-2'>
                            <FontAwesomeIcon onClick={acceptOrder} className='btn btn-success' icon={faCheck} />
                            <FontAwesomeIcon onClick={rejectOrder} className='btn btn-danger' icon={faXmark} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>



        <div className='text-center d-none'>
            ----- No Orders -----
        </div>
    </div>
  )
}

export default CurrentOrder