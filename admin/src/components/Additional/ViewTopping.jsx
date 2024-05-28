import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function ViewTopping() {
  //~ DB API URL
  const [topping, setTopping] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
	const adminId = localStorage.getItem("fosadminsecretsID");
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_FOS_API}/gettopping`,{
        headers: { Authorization: adminId },
      })
      .then((res) => setTopping(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    //* Get confirmation to delete or not
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`${process.env.REACT_APP_FOS_API}/deletetopping/${id}`)
            .then(() => {
              axios
                .get(`${process.env.REACT_APP_FOS_API}/gettopping`)
                .then((res) => setTopping(res.data))
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        }
      });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = topping
    ? topping.slice(indexOfFirstItem, indexOfLastItem)
    : null;

  const calculateSno = (index) => {
    return (currentPage - 1) * itemsPerPage + index + 1;
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      {topping && topping.length > 0 ? (
        <div>
          <div className="text-center py-3">
            <h5 className="text-primary">
              <b>VIEW TOPPING</b>
            </h5>
          </div>
          <div className="bg-white">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Topping Name</th>
                  <th>Topping Description</th>
                </tr>
              </thead>
              <tbody>
                {currentItems &&
                  currentItems.map((m, index) => (
                    <tr key={m.toppingId}>
                      <td>{calculateSno(index)}</td>
                      <td>
                        <b>{m.toppingName}</b>
                      </td>
                      <td>{m.toppingDescription}</td>
                      <td className="d-flex">
                        <Link to={`/updatetopping/${m.toppingId}`}>
                          <FontAwesomeIcon
                            className="me-4"
                            style={{
                              cursor: "pointer",
                              color: "blue",
                              fontSize: "1.2rem",
                            }}
                            icon={faPenToSquare}
                          />
                        </Link>
                        <FontAwesomeIcon
                          onClick={() => handleDelete(m.toppingId)}
                          style={{
                            cursor: "pointer",
                            color: "red",
                            fontSize: "1.2rem",
                          }}
                          icon={faTrashCan}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center mt-5">
          <div className="p-5 w-100 w-lg-50" style={{ background: "white" }}>
            <h5 className="text-center">NO TOPPING DATA AVAILABLE</h5>
            <Link className="d-flex justify-content-center" to="/addtopping">
              <button className="btn btn-primary mt-4">ADD TOPPING</button>
            </Link>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-center">
        <nav>
          <ul className="pagination">
            {Array(Math.ceil(topping.length / itemsPerPage))
              .fill()
              .map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <a
                    onClick={() => handlePageChange(index + 1)}
                    className="page-link"
                    style={{ cursor: "pointer" }}
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

export default ViewTopping;
