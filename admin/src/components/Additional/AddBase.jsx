import axios from "axios";
import React, { useState } from "react";

function AddBase() {
  const [baseSize, setBaseSize] = useState("");
  const [baseDescription, setBaseDescription] = useState("");
  const [confirmationstatus, setconfirmationstatus] = useState(false);
	const adminId = localStorage.getItem("fosadminsecretsID");
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      baseSize: baseSize,
      baseDescription: baseDescription,
    };

    axios
      .post(`${process.env.REACT_APP_FOS_API}/addbase`, data,{
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
        setBaseSize("");
        setBaseDescription("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <center>
        <h5 className="py-4 text-primary">
          <b>ADD BASE FORM</b>
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
                <label htmlFor="menuName">Base Size</label>
                <input
                  onChange={(e) => setBaseSize(e.target.value)}
                  value={baseSize}
                  type="text"
                  className="form-control"
                  id="baseSize"
                  required
                />
              </div>
              <div className="form-group mt-3 mb-3">
                <label htmlFor="menuDescription">
                  Base Description (optional)
                </label>
                <input
                  onChange={(e) => setBaseDescription(e.target.value)}
                  value={baseDescription}
                  type="text"
                  className="form-control"
                  id="baseDescription"
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

export default AddBase;
