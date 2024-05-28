import axios from 'axios';
import React, { useState } from 'react'

function AddTopping() {
  const [toppingName, setToppingName] = useState("");
  const [toppingDescription, setToppingDescription] = useState("");
  const [confirmationstatus, setconfirmationstatus] = useState(false);


  const adminId = localStorage.getItem("fosadminsecretsID");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      toppingName: toppingName,
      toppingDescription: toppingDescription,
    };

    axios
      .post(`${process.env.REACT_APP_FOS_API}/addtopping`, data, {
        headers: { Authorization: adminId },
      })
      .then((res) => {
        console.log(res.data);
        if (res.status && confirmationstatus === false) {
          setconfirmationstatus(true);
          setTimeout(() => {
            setconfirmationstatus(false);
          }, 2000);
        }
        setToppingName("");
        setToppingDescription("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <center>
        <h5 className="py-4 text-primary">
          <b>ADD TOPPING FORM</b>
        </h5>
      </center>
      {confirmationstatus == true ? (
        <p
          className="py-2 px-2 me-3 text-white"
          style={{
            position: "absolute",
            right: 5,
            top: "22%",
            background: "#a749ff",
          }}
        >
          Successfully added 🥳
        </p>
      ) : (
        ""
      )}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="form-group mb-4">
                <label htmlFor="menuName">Topping Name</label>
                <input
                  onChange={(e) => setToppingName(e.target.value)}
                  value={toppingName}
                  type="text"
                  className="form-control"
                  id="toppingName"
                  required
                />
              </div>
              <div className="form-group mt-3 mb-3">
                <label htmlFor="menuDescription">
                  Topping Description (optional)
                </label>
                <input
                  onChange={(e) => setToppingDescription(e.target.value)}
                  value={toppingDescription}
                  type="text"
                  className="form-control"
                  id="toppingDescription"
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
  );
}

export default AddTopping