import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashCan } from '@fortawesome/free-solid-svg-icons';
import  Swal  from 'sweetalert2';

const OrderPending = () => {
    const [pendingDetails, setPendingDetails] = useState([]);
    const [customerData, setCustomerData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 7;
    const adminId = localStorage.getItem("fosadminsecretsID");

    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_FOS_API}/getuser`,{
            headers: { Authorization: adminId },
          })
            .then(res => setCustomerData(res.data))
            .catch(err => console.log(err));

    }, []);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_FOS_API}/getorderpending`,{
            headers: { Authorization: adminId },
          })
            .then(res => setPendingDetails(res.data))
            .catch(err => console.log(err));
    }, [reducerValue]);

    const handleDelete = (id) => {
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
            // Delete address in the database
            axios.delete(`${process.env.REACT_APP_FOS_API}/deleteorderpendingbyadmin/${id}`,{
                headers: { Authorization: adminId },
              })
              .then((res) => console.log(res.data))
              .catch((err) => console.log(err));
            forceUpdate();
          }
        });
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = pendingDetails.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="container">
            <h3 className="text-center text-primary mt-4">TOTAL PENDING ORDERS</h3>
            <div className="row">
                <div className="col-12" style={{ overflow: 'auto' }}>
                    <div className="bg-white p-3">
                        {currentOrders.length > 0 ? (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Pending ID</th>
                                        <th>Customer ID</th>
                                        <th>Customer Name</th>
                                        <th>Menuitem</th>
                                        <th>Quantity</th>
                                        <th>Pending from</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody style={{ maxHeight: '75vh', overflow: 'auto' }}>
                                    {currentOrders.map((order) => (
                                        <tr key={order.pendingId}>
                                            <td>{order.pendingId}</td>
                                            <td>{order.customerId}</td>
                                            <td>{customerData.find((c) => c.customerID === order.customerId)?.customername}</td>
                                            <td>{order.menuitem}</td>
                                            <td>{order.count}</td>
                                            <td>{order.pendingdatetime.substring(0,10)}</td>
                                            <td>
                                              <FontAwesomeIcon onClick={() => handleDelete(order.pendingId)} style={{ cursor: 'pointer', color: 'red', fontSize: '1.2rem' }} icon={faTrashCan} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center my-5">
                                <h4>Ouch! There is no Order</h4>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center mb-5 pb-5">
                <nav>
                    <ul className="pagination">
                        {Array.from({ length: Math.ceil(pendingDetails.length / ordersPerPage) }, (_, i) => (
                            <li className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                <a
                                    className="page-link"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => paginate(i + 1)}
                                >
                                    {i + 1}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default OrderPending;
