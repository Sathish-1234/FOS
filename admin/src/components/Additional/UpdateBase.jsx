import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function UpdateBase() {
  const [baseName, setBaseName] = useState("");
  const [baseDescription, setBaseDescription] = useState("");
  const { id } = useParams();
	const adminId = localStorage.getItem("fosadminsecretsID");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_FOS_API}/getdesiredbasedata/` + id,{
        headers: { Authorization: adminId },
      })
      .then((res) => {
        console.log(res.data);
        setBaseName(res.data.baseName);
        setBaseDescription(res.data.baseDescription);
      })
      .catch((err) => console.log(err));
  }, [id]);

  console.log("id - " + id);

  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put(`${process.env.REACT_APP_FOS_API}/updatebase/` + id, {
        baseName,
        baseDescription,
      })
      .then((res) => {
        console.log(res.data);
        alert("Updated !");
        navigate("/viewBase");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="text-center">
        <h5 style={{ color: "orange" }} className="py-4 light-border">
          <b>UPDATE BASE FORM</b>
        </h5>
      </div>
      <form onSubmit={handleUpdate} className="d-flex justify-content-center">
        <div className="col-md-6 col-12">
          <div className="mb-3">
            <label htmlFor="baseName" className="form-label">
              Base Name
            </label>
            <input
              value={baseName}
              onChange={(e) => setBaseName(e.target.value)}
              type="text"
              className="form-control"
              id="baseName"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="baseDescription" className="form-label">
              Base Description
            </label>
            <input
              value={baseDescription}
              onChange={(e) => setBaseDescription(e.target.value)}
              type="text"
              className="form-control"
              id="baseDescription"
            />
          </div>
          <div class="d-flex justify-content-center gap-3 mt-4">
            <div>
              <button className="btn btn-primary">
                <Link className="text-white link" to={"/viewBase"}>
                  BACK
                </Link>
              </button>
            </div>
            <div>
              <button type="submit" className="btn btn-primary">
                UPDATE NOW
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateBase;
