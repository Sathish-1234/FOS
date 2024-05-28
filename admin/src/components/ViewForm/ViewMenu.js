import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function ViewMenu() {

  //~ DB API URL
  const [menu, setMenu] = useState([]);
  const [id, setId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
	const adminId = localStorage.getItem("fosadminsecretsID");
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_FOS_API}/getmenudata`,{
        headers: { Authorization: adminId },
      })
      .then((res) => setMenu(res.data))
      .catch((err) => console.log(err));
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
          axios.delete(`${process.env.REACT_APP_FOS_API}/deletemenu/${id}`,{
            headers: { Authorization: adminId },
          });
          axios
            .delete(`${process.env.REACT_APP_FOS_API}/deletemenuitemsmenu/${id}`,{
              headers: { Authorization: adminId },
            })
            .then((res) => {
              axios
                .get(`${process.env.REACT_APP_FOS_API}/getmenudata`,{
                  headers: { Authorization: adminId },
                })
                .then((res) => setMenu(res.data))
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
          forceUpdate();
        }
      });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = menu ? menu.slice(indexOfFirstItem, indexOfLastItem) : null;

  const calculateSno = (index) => {
    return (currentPage - 1) * itemsPerPage + index + 1;
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      {menu && menu.length > 0 ? (
        <div>
          <div className="text-center py-3">
            <h5 className="text-primary"><b>VIEW MENU</b></h5>
          </div>
          <div className="bg-white">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Menu Name</th>
                  <th>Added On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems && currentItems.map((m, index) => (
                  <tr key={m.menuid}>
                    <td>{calculateSno(index)}</td>
                    <td><b>{m.menuname}</b></td>
                    <td>{m.menu_addeddate.substring(0, 10)}</td>
                    <td className="d-flex">
                      <Link to={`/updatemenu/${m.menuid}`}>
                        <FontAwesomeIcon className="me-4" style={{ cursor: 'pointer', color: 'blue', fontSize: '1.2rem' }} icon={faPenToSquare} />
                      </Link>
                      <FontAwesomeIcon onClick={() => handleDelete(m.menuid)} style={{ cursor: 'pointer', color: 'red', fontSize: '1.2rem' }} icon={faTrashCan} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center mt-5">
          <div className="p-5 w-100 w-lg-50" style={{ background: 'white' }}>
            <h5 className="text-center">NO MENU DATA AVAILABLE</h5>
            <Link className="d-flex justify-content-center" to="/addmenu"><button className="btn btn-primary mt-4">ADD MENU</button></Link>
          </div>
        </div>
      )}
 
      <div  className="d-flex justify-content-center">
        <nav>
          <ul className="pagination">
            {Array(Math.ceil(menu.length / itemsPerPage))
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
    </div>
  );
}

export default ViewMenu;
