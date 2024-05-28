import axios from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2';

function AddPartner() {

     const [DP_EmpID,setDP_EmpID]=useState('');
     const [DP_Name,setDP_Name]=useState('');
     const [DP_EMAIL_ID,setDP_EMAIL_ID]=useState('');
     const [DP_PhoneNumber,setDP_PhoneNumber]=useState('');
     const [DP_Addressproof,setDP_Addressproof]=useState('');
     const [Del_IDproof,setDel_IDproof]=useState('');
     const approvalstatus = "approved"
     const adminId = localStorage.getItem("fosadminsecretsID");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_FOS_CLIENT_API}/registerdeliverypartner`,{DP_EmpID, DP_Name, DP_EMAIL_ID, DP_PhoneNumber, DP_Addressproof, Del_IDproof,approvalstatus},{
          headers: { Authorization: adminId },
        })
        .then((res)=>{
            setTimeout(()=>{
                window.location.reload();
            },2000)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Registered",
                showConfirmButton: false,
                timer: 2000
              });
        })
    }

  return (
    <div >
        <center>
            <h5 className="py-4 text-primary">
            <b>ADD DELIVERYPARTNER</b>
            </h5>
        </center>
        <form onSubmit={handleSubmit} className="mt-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">

              <div className='row'>
                  <div className="form-group mb-4 col-12 col-lg-6">
                    <label htmlFor="menuName">DP Name</label>
                    <input
                      onChange={(e) => setDP_Name(e.target.value)}
                      value={DP_Name}
                      type="text"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group mb-4 col-12 col-lg-6">
                    <label htmlFor="menuDescription">DP EmpID</label>
                    <input
                      onChange={(e) => setDP_EmpID(e.target.value)}
                      value={DP_EmpID}
                      className="form-control"
                      type="number"
                    />
                  </div>
              </div>
            
              <div className='row'>
                  <div className="form-group mb-4 col-12 col-lg-6">
                    <label htmlFor="menuName">DP Email</label>
                    <input
                      onChange={(e) => setDP_EMAIL_ID(e.target.value)}
                      value={DP_EMAIL_ID}
                      type="email"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group mb-4 col-12 col-lg-6">
                    <label htmlFor="menuName">DP Phnum</label>
                    <input
                      onChange={(e) => setDP_PhoneNumber(e.target.value)}
                      value={DP_PhoneNumber}
                      type="number"
                      className="form-control"
                      required
                    />
                  </div>
              </div>

              <div className="form-group mb-4">
                <label htmlFor="menuName">DP_Addressproof</label>
                <textarea
                  onChange={(e) => setDP_Addressproof(e.target.value)}
                  value={DP_Addressproof}
                  type="text"
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group mb-2">
                <label htmlFor="menuName">DP ID Proof</label>
                <input
                  onChange={(e) => setDel_IDproof(e.target.value)}
                  value={Del_IDproof}
                  type="text"
                  className="form-control"
                  required
                />
              </div>

              <center>
                <button type="submit" className="btn btn-primary mt-4">
                  ADD NOW
                </button>
              </center>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddPartner