import axios from 'axios';
import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the Autotable plugin for jsPDF
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesLeft} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

function ViewOrder({id}) {
  const [invoiceData, setInvoiceData] = useState({});
  const [addressData, setAddressData] = useState({});
  const [orderedList, setOrderedList] = useState([]);
  const adminId = localStorage.getItem("fosadminsecretsID");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_FOS_API}/getinvoicedetails/` + id,{
      headers: { Authorization: adminId },
    })
      .then(res => setInvoiceData(res.data))
      .catch(err => console.log(err));
  }, [id]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_FOS_API}/getorderedlist/` + invoiceData.orderNumber,{
      headers: { Authorization: adminId },
    })
      .then(res => setOrderedList(res.data))
      .catch(err => console.log(err));
  }, [invoiceData.orderNumber]);
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_FOS_API}/getaddress/` + invoiceData.addressId,{
      headers: { Authorization: adminId },
    })
      .then(res => setAddressData(res.data))
      .catch(err => console.log(err));
  }, [invoiceData.addressId]);


  const totalBill = orderedList.reduce((total, { price, quantity }) => total + (price * quantity), 0);
  const discountedBill = totalBill - (totalBill / 10);

  console.log('-->'+invoiceData.addressId);

  return (
    <div className="container pt-4">
      <div className="px-4">
        <div class="d-flex justify-content-between">
          <h4>ORDER DETAILS :</h4>
          <p></p>
        </div>
        <div className="d-flex justify-content-between">
          <div className="mb-3">
            <h2 className="py-2">Receiver :</h2>
            <div>
              <h5 className="fw-bold">{addressData.customername}</h5>
              <h6>{addressData.phnum}</h6>
            </div>
            <div className="address pt-2 pb-3">
              <h6>{addressData.address}</h6>
              <h6>{addressData.pincode}</h6>
            </div>
          </div>
          <div className="py-5 mt-2">
            <div className="pb-3"><b>Invoice Number :</b> {id}</div>
            <div className="pb-3"><b>Order Number :</b> {invoiceData.orderNumber}</div>
            <div>
              <p><b>Invoice Date :</b> {invoiceData.invoiceDate}</p>
            </div>
          </div>
        </div>
        <div style={{
          maxHeight: "30vh",
          overflow: "auto",
          background: 'white',
        }}>
          <table className="table table-bordered">
            <thead className="bg-light">
              <tr>
                <th>MenuItem Id</th>
                <th>MenuItem</th>
                <th>Qty</th>
                <th>Unit Cost</th>
                <th>Discount</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderedList.map((m, index) => (
                <tr key={index}>
                  <td>{m.menuitemid}</td>
                  <td>{m.menuitems}</td>
                  <td>{m.quantity}</td>
                  <td>{m.price}</td>
                  <td>10%</td>
                  <td>{(m.quantity * m.price) - (m.quantity * m.price) / 10}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h5 style={{ textAlign: 'end' }} className='pt-3 pe-5'>Total Cost : <span><b>₹ {discountedBill}</b></span></h5>
      </div>
    </div>
  );
}

export default ViewOrder;
