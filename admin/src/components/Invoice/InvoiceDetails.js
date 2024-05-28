import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the Autotable plugin for jsPDF
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesLeft} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

function InvoiceDetails() {
  const { id } = useParams(); 
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

  //*download as pdf

  const handlePrintAndDownload = () => {
    const doc = new jsPDF();
    doc.setTextColor(0, 0, 0); // Set text color to black

    // Add the header with 'Invoice Bill'
    doc.setFontSize(16);
    doc.text('Invoice Bill', 105, 10, 'center');

    // Left section: Receiver details
    doc.setFontSize(12);
    doc.text('Receiver:', 10, 30);
    doc.text(addressData.customername, 20, 40);
    doc.text(addressData.mail, 20, 50);
    doc.text(addressData.phnum, 20, 60);
    doc.text(addressData.address, 20, 70);
    doc.text(`${addressData.pincode}, ${addressData.city}, ${addressData.state}`, 20, 80);

    // Right section: Invoice details
    doc.text(`Invoice Number: ${id}`, 105, 40);
    doc.text(`Order Number: ${invoiceData.orderNumber}`, 105, 50);
    doc.text(`Invoice Date: ${invoiceData.invoiceDate}`, 105, 60);

    // Ordered data as a table
    const tableData = [];
    const headers = ['MenuItem Id', 'MenuItem', 'Qty', 'Unit Cost', 'Discount', 'Total'];

    orderedList.forEach(item => {
      tableData.push([
        item.menuitemid,
        item.menuitems,
        item.quantity,
        item.price,
        '10%',
        (item.quantity * item.price) - (item.quantity * item.price) / 10
      ]);
    });

    doc.autoTable({
      startY: 100,
      head: [headers],
      body: tableData,
      theme: 'striped',
    });

    // Total Price
    const totalBill = orderedList.reduce((total, item) => total + (item.quantity * item.price) - (item.quantity * item.price) / 10, 0);
    doc.text(`Total Cost: ₹${totalBill}`, 105, doc.autoTable.previous.finalY + 10);

    // Save the PDF
    doc.save('invoice.pdf');
  };

  const totalBill = orderedList.reduce((total, { price, quantity }) => total + (price * quantity), 0);
  const discountedBill = totalBill - (totalBill / 10);

  console.log('-->'+invoiceData.addressId);

  return (
    <div className="container pt-4">
      <div className="px-4">
        <div class="d-flex justify-content-between">
          <Link to={"/invoice"} className='link text-primary fs-5'><FontAwesomeIcon icon={faAnglesLeft} /> Back</Link>
          <h4>INVOICE BILL</h4>
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
        <div className="d-flex justify-content-end mt-3 mb-5 pb-5">
          <button onClick={handlePrintAndDownload} className="btn px-3 me-5" style={{ background: 'orange', height: '2.5rem', color: 'white', cursor: 'pointer' }}>Download Invoice</button>
        </div>
      </div>
    </div> 
  );
}

export default InvoiceDetails;
