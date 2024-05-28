import {faBell} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import AddPartner from './AddPartner';
import PartnerDetails from './PartnerDetails';

function ViewPartner() {

  //~ DB API URL
  const [deliveryPersonActiveDetails, setDeliveryPersonActiveDetails] = useState([]);
  const [deliveryPersonInActiveDetails, setDeliveryPersonInActiveDetails] = useState([]);
  const [deliveryPersonRejectedDetails, setDeliveryPersonRejectedDetails] = useState([]);
  const adminId = localStorage.getItem("fosadminsecretsID");

  const [choosedOption, setChoosedOption] = useState("active")

  const choosedData = () => {
    switch(choosedOption){
      case "active": 
        return deliveryPersonActiveDetails
      case 'in-active': 
        return deliveryPersonInActiveDetails
      case 'rejected': 
        return deliveryPersonRejectedDetails
      default:
        return []
    }
  }
  

  const [deliveryPersonReqestDetails, setDeliveryPersonRequestDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  const [addNewPartnerBox,setAddNewPartnerBox] = useState(false);

  const [deliveryPartnerDetailsBox,setDeliveryPartnerDetailsBox] = useState(false);
  const [selectedId,setSelectedId] = useState(-1);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_FOS_API}/getactivedeliverypersondetails`,{
        headers: { Authorization: adminId },
      })
      .then((res) => setDeliveryPersonActiveDetails(res.data))
      .catch((err) => console.log(err));
  }, [reducerValue]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_FOS_API}/getinactivedeliverypersondetails`,{
        headers: { Authorization: adminId },
      })
      .then((res) => setDeliveryPersonInActiveDetails(res.data))
      .catch((err) => console.log(err));
  }, [reducerValue]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_FOS_API}/getrejecteddeliverypersondetails`,{
        headers: { Authorization: adminId },
      })
      .then((res) => setDeliveryPersonRejectedDetails(res.data))
      .catch((err) => console.log(err));
  }, [reducerValue]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_FOS_API}/getrequestdeliverypersondetails`,{
        headers: { Authorization: adminId },
      })
      .then((res) => setDeliveryPersonRequestDetails(res.data))
      .catch((err) => console.log(err));
  }, [reducerValue]);

  const handleRequest = (status,DeliveryPerson_ID) => {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
    .fire({
      title: 'Are you sure to '+status+' ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, '+status+' !',
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
        // Update as Approved status in the database
        axios.post(`${process.env.REACT_APP_FOS_API}/deliverypartnerrequest`,{status,DeliveryPerson_ID},{
          headers: { Authorization: adminId },
        })
        .then((res)=>{
          if(res.status==200){
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Successfully Approved",
              showConfirmButton: false,
              timer: 1500
            });
            forceUpdate()
          }
        }
        )
      }
    });

  }

  const updateClose = () => {
    setDeliveryPartnerDetailsBox(false)
    forceUpdate()
  }

  const handleActive = (DeliveryPerson_ID) => {
    //* Get confirmation to active or not
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });

  swalWithBootstrapButtons
    .fire({
      title: 'Are you sure to Active?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Active !',
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
        // Update as Active in the database
        axios.put(`${process.env.REACT_APP_FOS_API}/setDpActive/${DeliveryPerson_ID}`,{
          headers: { Authorization: adminId },
        })
        .then((res)=>{
            if(res.status==200){
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully Approved",
                showConfirmButton: false,
                timer: 1500
              });
              forceUpdate()
            }
        })
      }
    });
  }

  const handleRejected = (DeliveryPerson_ID) => {
    //* Get confirmation to reject or not
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
  });

swalWithBootstrapButtons
  .fire({
    title: 'Are you sure to Reject?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, Reject !',
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
      // Update as Rejected in the database
      axios.put(`${process.env.REACT_APP_FOS_API}/setDpRejected/${DeliveryPerson_ID}`,{
        headers: { Authorization: adminId },
      })
      .then((res)=>{
          if(res.status==200){
            Swal.fire({
              position: "center",
              icon: "success",
              title: " Successfully Rejected",
              showConfirmButton: false,
              timer: 1500
            });
            forceUpdate()
          }
      })
    }
  });
  }

  // const handleDelete = (id) => {

  //   //* Get confirmation to delete or not
  //   const swalWithBootstrapButtons = Swal.mixin({
  //     customClass: {
  //       confirmButton: 'btn btn-success',
  //       cancelButton: 'btn btn-danger'
  //     },
  //     buttonsStyling: false
  //   });

  //   swalWithBootstrapButtons
  //     .fire({
  //       title: 'Are you sure?',
  //   ,
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonText: 'Yes, delete it!',
  //       cancelButtonText: 'No, cancel!',
  //       reverseButtons: true
  //     })
  //     .then((result) => {
  //       if (result.isConfirmed) {
  //         // Delete address in the database
  //         axios.delete(`${process.env.REACT_APP_FOS_API}/deletemenu/${id}`);
  //         axios
  //           .delete(`${process.env.REACT_APP_FOS_API}/deletemenuitemsmenu/${id}`)
  //           .then((res) => console.log(res.data))
  //           .catch((err) => console.log(err));
  //         forceUpdate();
  //       }
  //     });
  // };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = choosedData().length>0 ? choosedData().slice(indexOfFirstItem, indexOfLastItem) : null;

  const calculateSno = (index) => {
    return (currentPage - 1) * itemsPerPage + index + 1;
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [activeOption, setActiveOption] = useState('ACTIVE');

  return (
    <div className="container">
      
      <div className="text-center py-3">
        <h5 className="text-primary"><b>DELIVERY PARTNER</b></h5>
      </div>

      {
        (deliveryPersonReqestDetails && deliveryPersonReqestDetails.length > 0)
        ?

        <div className='border px-3 py-3 mb-4'>
          <div>
            <h5 className='rounded p-3 bg-danger text-white '>Recent Request <FontAwesomeIcon className='ms-1' icon={faBell} /></h5>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>DP ID</th>
                <th>DP Name</th>
                <th>DP phnum</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {deliveryPersonReqestDetails && deliveryPersonReqestDetails.map((m, index) => (
                <tr key={m.DeliveryPerson_ID}>
                  <td>{m.DP_EmpID}</td>
                  <td><b>{m.DP_Name}</b></td>
                  <td>{m.DP_PhoneNumber}</td>
                  <td className="d-flex gap-3">
                    <button onClick={()=>{setDeliveryPartnerDetailsBox(true);setSelectedId(m.DeliveryPerson_ID)}} className='btn btn-primary'>View</button>
                    <button onClick={()=>handleRequest('approved',m.DeliveryPerson_ID)} className='btn btn-success'>✓</button>
                    <button onClick={()=>handleRequest('rejected',m.DeliveryPerson_ID)} className='btn btn-danger'>X</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        :
        ''
      }

      <div>
        <div className="bg-white">

          <div className='d-flex align-items-center justify-content-between mb-4'>
            <div className='d-flex gap-2'>
              <h6
                onClick={() => {setActiveOption('ACTIVE');setChoosedOption('active')}}
                style={{cursor:'pointer',border:'.2px solid gray',borderRadius:'5px'}} 
                className={`p-2 ${activeOption === 'ACTIVE' ? 'bg-primary text-white' : ''}`}
              >
                ACTIVE
              </h6>
              <h6 
                onClick={() => {setActiveOption('IN-ACTIVE');setChoosedOption('in-active')}}
                style={{cursor:'pointer',border:'.2px solid gray',borderRadius:'5px'}} 
                className={`p-2 ${activeOption === 'IN-ACTIVE' ? 'bg-primary text-white' : ''}`}
              >
                IN-ACTIVE
              </h6>
              <h6 
                onClick={() => {setActiveOption('REJECTED');setChoosedOption('rejected')}}
                style={{cursor:'pointer',border:'.2px solid gray',borderRadius:'5px'}} 
                className={`p-2 ${activeOption === 'REJECTED' ? 'bg-primary text-white' : ''}`}
              >
                REJECTED
              </h6>
            </div>
            <div><button onClick={()=>setAddNewPartnerBox(!addNewPartnerBox)} className='btn btn-sm btn-primary me-2 mb-3'>+ ADD PARTNER</button></div>
          </div>

          {choosedData() && choosedData().length > 0 
          ? 
          <table className="table">
            <thead>
              <tr>
                <th>DP ID</th>
                <th>DP Name</th>
                <th>DP phnum</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems && currentItems.map((m, index) => (
                <tr key={m.DeliveryPerson_ID}>
                  <td>{m.DP_EmpID}</td>
                  <td><b>{m.DP_Name}</b></td>
                  <td>{m.DP_PhoneNumber}</td>
                  <td className="d-flex">
                    <button onClick={()=>{setDeliveryPartnerDetailsBox(true);setSelectedId(m.DeliveryPerson_ID)}} className='btn btn-primary'>View</button>
                    {
                      (choosedOption==="in-active")
                      ?
                      <div>
                        <button onClick={()=>handleActive(m.DeliveryPerson_ID)} className='btn btn-success ms-2'>Active</button>
                        <button onClick={()=>handleRejected(m.DeliveryPerson_ID)} className='btn btn-danger ms-2'>Reject</button>
                      </div>
                      :
                      ''
                    }
                    {
                      (choosedOption==="rejected")
                      ?
                      <button onClick={()=>handleActive(m.DeliveryPerson_ID)} className='btn btn-success ms-2'>Approve</button>
                      :
                      ''
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          :
          <center className='pt-3'><h5 className="text-center">NO "{choosedOption.toUpperCase()}" PARTNERS</h5></center>
          }

        </div>
      </div>
      
 
      {
        (choosedData() && choosedData().length>0)
        ?
        <div  className="d-flex justify-content-center">
          <nav>
            <ul className="pagination">
              {Array(Math.ceil(choosedData().length / itemsPerPage))
                .fill()
                .map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                  >
                    <a
                      onClick={() => handlePageChange(index + 1)}
                      className="page-link"
                      style={{ cursor: 'pointer' }}
                    >
                      {index + 1}
                    </a>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
        :
        ''
      }


      {
        (addNewPartnerBox) 
        ? 
        <div>
          <div className='d-none d-lg-block' style={{border:'.3px solid gray',position:'absolute',width:'60%',height:'72%',top:'50%',left:'65%',overflowY:'hidden',transform:'translate(-50%,-50%)',background:'white',zIndex:'9999',borderRadius:'5px'}}>
            <AddPartner/><div className='pe-2' onClick={()=>setAddNewPartnerBox(!addNewPartnerBox)} style={{position:'absolute',top:0,right:0,fontSize:'1.7rem',fontWeight:'600',cursor:'pointer'}}>X</div>
          </div>
          <div className='d-lg-none' style={{border:'.3px solid gray',position:'absolute',width:'90%',top:'60%',left:'50%',overflowY:'hidden',transform:'translate(-50%,-50%)',background:'white',zIndex:'9998',borderRadius:'5px'}}>
            <AddPartner/><div className='pe-2' onClick={()=>setAddNewPartnerBox(!addNewPartnerBox)} style={{position:'absolute',top:0,right:0,fontSize:'1.7rem',fontWeight:'600',cursor:'pointer'}}>X</div>
          </div>
        </div>
        :
        ''
      }

      {
        (deliveryPartnerDetailsBox)
        ?
        <div>
          <div className='d-none d-lg-block' style={{border:'.3px solid gray',position:'absolute',width:'60%',height:'72%',top:'50%',left:'65%',overflowY:'hidden',transform:'translate(-50%,-50%)',background:'white',zIndex:'55',borderRadius:'5px'}}>
            <PartnerDetails DeliveryPerson_ID={selectedId} updateClose={updateClose} choosedOption={choosedOption}/><div className='pe-2' onClick={()=>setDeliveryPartnerDetailsBox(!deliveryPartnerDetailsBox)} style={{position:'absolute',top:0,right:0,fontSize:'1.7rem',fontWeight:'600',cursor:'pointer'}}>X</div>
          </div>
          <div className='d-lg-none' style={{border:'.3px solid gray',position:'absolute',width:'90%',top:'60%',left:'50%',overflowY:'hidden',transform:'translate(-50%,-50%)',background:'white',zIndex:'9998',borderRadius:'5px'}}>
            <PartnerDetails DeliveryPerson_ID={selectedId} updateClose={updateClose} choosedOption={choosedOption}/><div className='pe-2' onClick={()=>setDeliveryPartnerDetailsBox(!deliveryPartnerDetailsBox)} style={{position:'absolute',top:0,right:0,fontSize:'1.7rem',fontWeight:'600',cursor:'pointer'}}>X</div>
          </div>
        </div>
        :
        ''
      }

      
    </div>
  );
}

export default ViewPartner;
