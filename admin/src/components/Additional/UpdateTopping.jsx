import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Updatetopping() {
  const [toppingname, setToppingName] = useState("");
  const [toppingDescription, setToppingDescription] = useState("");
  const { id } = useParams();
  const adminId = localStorage.getItem("fosadminsecretsID");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_FOS_API}/getdesiredtoppingdata/` + id, {
        headers: { Authorization: adminId },
      })
      .then((res) => {
        console.log(res.data);
        setToppingName(res.data.toppingName);
        setToppingDescription(res.data.toppingDescription);
      })
      .catch((err) => console.log(err));
  }, [id]);

  console.log("id - " + id);

  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put(
        `${process.env.REACT_APP_FOS_API}/updatetopping/` + id,
        {
          toppingname,
          toppingDescription,
        },
        {
          headers: { Authorization: adminId },
        }
      )
      .then((res) => {
        console.log(res.data);
        alert("Updated !");
        navigate("/viewtopping");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="text-center">
        <h5 style={{ color: "orange" }} className="py-4 light-border">
          <b>UPDATE TOPPING FORM</b>
        </h5>
      </div>
      <form onSubmit={handleUpdate} className="d-flex justify-content-center">
        <div className="col-md-6 col-12">
          <div className="mb-3">
            <label htmlFor="toppingName" className="form-label">
              topping Name
            </label>
            <input
              value={toppingname}
              onChange={(e) => setToppingName(e.target.value)}
              type="text"
              className="form-control"
              id="toppingName"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="toppingDescription" className="form-label">
              topping Description
            </label>
            <input
              value={toppingDescription}
              onChange={(e) => setToppingDescription(e.target.value)}
              type="text"
              className="form-control"
              id="toppingDescription"
            />
          </div>
          <div class="d-flex justify-content-center gap-3 mt-4">
            <div>
              <button className="btn btn-primary">
                <Link className="text-white link" to={"/viewtopping"}>
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

export default Updatetopping;
