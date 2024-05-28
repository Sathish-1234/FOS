import React, { useEffect, useState } from 'react'
import unknownImg from './../../assests/images/unknown_dp_img.jpg'
import axios from 'axios'
import Swal from 'sweetalert2';

function PartnerDetails({DeliveryPerson_ID,updateClose,choosedOption}) {

    const [DP_EmpID,setDP_EmpID]=useState('');
    const [DP_Name,setDP_Name]=useState('');
    const [DP_EMAIL_ID,setDP_EMAIL_ID]=useState('');
    const [DP_PhoneNumber,setDP_PhoneNumber]=useState('');
    const [DP_Addressproof,setDP_Addressproof]=useState('');
    const [Del_IDproof,setDel_IDproof]=useState('');
    const [approvalstatus,setApprovedStatus] = useState('')
    const adminId = localStorage.getItem("fosadminsecretsID");


    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_FOS_API}/getIndividualDeliveryPartnerDetails/${DeliveryPerson_ID}`,{
            headers: { Authorization: adminId },
          })
        .then((res)=>{
            setDP_EmpID(res.data.DP_EmpID)
            setDP_Name(res.data.DP_Name)
            setDP_EMAIL_ID(res.data.DP_EMAIL_ID)
            setDP_PhoneNumber(res.data.DP_PhoneNumber)
            setDP_Addressproof(res.data.DP_Addressproof)
            setDel_IDproof(res.data.Del_IDproof)
            setApprovedStatus(res.data.approvalstatus)
        })
        .catch((err)=>console.log(err))
    },[])




    const handleUpdate = (e) => {
        e.preventDefault();
        axios
            .put(`${process.env.REACT_APP_FOS_API}/updateDeliveryPartner/${DeliveryPerson_ID}`, {DP_EmpID, DP_Name, DP_EMAIL_ID, DP_PhoneNumber, DP_Addressproof, Del_IDproof},{
                headers: { Authorization: adminId },
              })
            .then((res) => 
            {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Update Successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  setTimeout(()=>{
                    updateClose();
                  },1500)

            }
            )
            .catch((err) => {
            console.error('Error updating delivery partner details:', err);
            });
        };
          

    const handleInActive = (e) => {
        e.preventDefault()
        //* Get confirmation to delete or not
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        });
  
      swalWithBootstrapButtons
        .fire({
          title: 'Are you sure to In-Active?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, In-Active !',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
          customStyle: {
            popup: {
                'z-index': 99999, 
            },
        },
        })
        .then((result) => {
          if (result.isConfirmed) {
            // Update as In-Active in the database
            axios.put(`${process.env.REACT_APP_FOS_API}/setDpInActive/${DeliveryPerson_ID}`,{
                headers: { Authorization: adminId },
              })
            .then((res)=>{
                if(res.status==200){
                    updateClose();
                }
            })
          }
        });
    }


  return (
    <div>
        <center>
            <h5 className="py-4 text-primary">
            <b>DELIVERY PARTNER INFO</b>
            </h5>
        </center>
        <div className='row container justify-content-center'>
            <div className='col-12 col-md-4'>
                <img src={unknownImg}></img>
            </div>
            <div className='col-12 col-md-6'>
                <form onSubmit={handleUpdate} className="">
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
                    
                    {
                        (choosedOption==="active")
                        ?
                        <div>
                            <button type="submit" className="btn btn-primary me-3 mt-4">
                                UPDATE
                            </button>
                            <button onClick={handleInActive} className="btn btn-danger mt-4">
                                IN-ACTIVE
                            </button>
                        </div>
                        :
                        (choosedOption==="in-active" || choosedOption==="rejected")
                        ?
                        <button type="submit" className="btn btn-primary me-3 mt-4">
                            UPDATE
                        </button>
                        :""
                    }
                </center>
                </form>
            </div>
        </div>
    </div>
  )
}

export default PartnerDetails