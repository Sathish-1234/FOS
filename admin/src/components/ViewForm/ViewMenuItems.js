import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react'
import { Accordion } from 'react-bootstrap' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function ViewMenuItems() {
  const [menu,setMenu] = useState([]);
  const [menuitem,setMenuItems] = useState([]);
  const [id,setId] = useState(0);
  const adminId = localStorage.getItem("fosadminsecretsID");

  const [reducerValue,forceUpdate] = useReducer(x => x + 1,0);

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_FOS_API}/getmenudata`,{
      headers: { Authorization: adminId },
    })
    .then(res=>setMenu(res.data))
    .catch(err=>console.log(err))
  },[reducerValue]);

  useEffect(()=>{
      axios.get(`${process.env.REACT_APP_FOS_API}/getmenuitemsdata`,{
        headers: { Authorization: adminId },
      })
      .then(res=>setMenuItems(res.data))
      .catch(err=>console.log(err))
  },[reducerValue]);

  const handleDelete = (id)=>{

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
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      })
      .then((result) => {
        if (result.isConfirmed) {
          //* Delete address in the database
          axios.delete(`${process.env.REACT_APP_FOS_API}/deletemenuitems/${id}`,{
            headers: { Authorization: adminId },
          })
          .then(()=>{
            axios
              .get(`${process.env.REACT_APP_FOS_API}/getmenuitemsdata`)
              .then((res) => setMenuItems(res.data))
              .catch((err) => console.log(err));
          })
          .catch(err=>console.log(err))
        }
      });

  }   

  return (
    
    (menuitem.length>0)
    ?
    <div>
      <div className="text-center py-3">
          <h5 className="text-primary"><b>VIEW MENU ITEMS</b></h5>
        </div>
      <div style={{height:'70vh',overflow:'hidden',overflowY:'scroll'}}>
        {(menu.map((m)=>
          <Accordion className="py-2 px-2" key={m.menuid} defaultActiveKey={[]}>
              <Accordion.Item>
                  <Accordion.Header>{m.menuname}</Accordion.Header>
                  {menuitem.map((n) =>
                      m.menuid == n.menuid ? (
                          <Accordion.Body
                              key={n.id}
                          >
                            <div className='row'>
                                <div className='col-3'>
                                    <img
                                        style={{
                                            height: "3.5rem",
                                            borderRadius: "50%",
                                            width: "3.5rem",
                                        }}
                                        src={
                                            `${process.env.REACT_APP_FOS_API}/images/` + n.image
                                        }
                                        alt=""
                                    />
                                </div>
                                <div  className='col-3'>
                                    <b>{n.menuitem}</b>
                                </div>
                                <div  className='col-3'>
                                    <b>₹ {n.price}</b>
                                </div>
                                <div className="col-3 d-flex">
                                  <Link to={`/updatemenuitems/${n.menuitemsid}`}>
                                    <FontAwesomeIcon className="me-4" style={{ cursor: 'pointer', color: 'blue', fontSize: '1.2rem' }} icon={faPenToSquare} />
                                  </Link>
                                  <FontAwesomeIcon onClick={() => handleDelete(n.menuitemsid)} style={{ cursor: 'pointer', color: 'red', fontSize: '1.2rem' }} icon={faTrashCan} />
                                </div>
                            </div>
        
                          </Accordion.Body>
                      ) : (
                          " "
                      )
                  )}
              </Accordion.Item>
          </Accordion>
        ))}
      </div>
    </div>
    :
    <div className="d-flex justify-content-center mt-5">
      <div className="p-5 w-100 w-lg-50" style={{ background: 'white' }}>
        <h5 className="text-center">NO MENU ITEMS DATA AVAILABLE</h5>
        <Link className="d-flex justify-content-center" to="/addmenuitems"><button className="btn btn-primary mt-4">ADD MENUITEMS</button></Link>
      </div>
    </div>
    
  )
}

export default ViewMenuItems