import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Invoice() { 
  const [invoiceData, setInvoiceData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
	const adminId = localStorage.getItem("fosadminsecretsID");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_FOS_API}/getinvoicedetails`,{
      headers: { Authorization: adminId },
    })
      .then((res) => setInvoiceData(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInvoices = invoiceData.slice(indexOfFirstItem, indexOfLastItem);

  // Function to change the current page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container" >
      <h3 className="text-center my-3 text-primary pb-2">TOTAL INVOICES</h3>
      <div style={{ overflow: 'auto' }}>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Order Number</th>
              <th>Total Bill</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentInvoices.map((m) => (
              <tr key={m.invoiceNumber}>
                <td>{m.invoiceNumber}</td>
                <td>{m.orderNumber}</td>
                <td>₹ {m.totalBill}</td>
                <td>
                  <button
                    onClick={() => navigate(`/invoicedetails/${m.invoiceNumber}`)}
                    className="btn btn-primary"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center mb-5 pb-5">
        <nav>
          <ul className="pagination">
            {Array.from({ length: Math.ceil(invoiceData.length / itemsPerPage) }, (_, i) => (
              <li className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className="page-link"
                  style={{ cursor: 'pointer' }}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Invoice;
