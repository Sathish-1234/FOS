import axios from "axios";
import React, { useState } from "react";

function AddMenu() { 
  const [menuname, setMenuName] = useState("");
  const [menudescription, setMenuDescription] = useState("");
  const [confirmationstatus, setconfirmationstatus] = useState(false);
  const adminId = localStorage.getItem("fosadminsecretsID");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      menuname: menuname,
      menudescription: menudescription,
    };

    axios
      .post(`${process.env.REACT_APP_FOS_API}/addmenu`, data,{
        headers: { Authorization: adminId },
      })
      .then((res) => {
        console.log(res.data);
        if (confirmationstatus === false) {
          setconfirmationstatus(true);
          setTimeout(() => {
            setconfirmationstatus(false);
          }, 2000);
        }
        setMenuDescription("");
        setMenuName("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <center>
        <h5 className="py-4 text-primary">
          <b>ADD MENU FORM</b>
        </h5>
      </center>
      {confirmationstatus == true ? (
        <p 
        className="py-2 px-2 me-3 text-white"
          style={{ position: "absolute", right: 5, top:'22%',background:"#a749ff" }}
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
                <label htmlFor="menuName">Menu Name</label>
                <input
                  onChange={(e) => setMenuName(e.target.value)}
                  value={menuname}
                  type="text"
                  className="form-control"
                  id="menuName"
                  required
                />
              </div>
              <div className="form-group mt-3 mb-3">
                <label htmlFor="menuDescription">Menu Description</label>
                <input
                  onChange={(e) => setMenuDescription(e.target.value)}
                  value={menudescription}
                  type="text"
                  className="form-control"
                  id="menuDescription"
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

export default AddMenu;
