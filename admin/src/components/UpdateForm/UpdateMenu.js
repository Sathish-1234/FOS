import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function UpdateMenu() {
  const [menuname, setMenuName] = useState('');
  const [menudescription, setMenuDescription] = useState('');
  const { id } = useParams();
	const adminId = localStorage.getItem("fosadminsecretsID");
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_FOS_API}/getdesiredmenudata/` + id,{
      headers: { Authorization: adminId },
    })
      .then(res => {
        setMenuName(res.data.menuname);
        setMenuDescription(res.data.menudescription);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    axios.put(`${process.env.REACT_APP_FOS_API}/updatemenu/` + id, { menuname, menudescription },{
      headers: { Authorization: adminId },
    })
      .then(res => {
        console.log(res.data);
        alert("Updated !");
        navigate('/viewmenu')
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="text-center">
        <h5 style={{ color: 'orange' }} className="py-4 light-border"><b>UPDATE MENU FORM</b></h5>
      </div>
      <form onSubmit={handleUpdate} className="d-flex justify-content-center">
        <div className="col-md-6 col-12">
          <div className="mb-3">
            <label htmlFor="menuName" className="form-label">Menu Name</label>
            <input
              value={menuname}
              onChange={(e) => setMenuName(e.target.value)}
              type="text"
              className="form-control"
              id="menuName"
              placeholder="Pizza"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="menuDescription" className="form-label">Menu Description</label>
            <input
              value={menudescription}
              onChange={(e) => setMenuDescription(e.target.value)}
              type="text"
              className="form-control"
              id="menuDescription"
              placeholder="Description"
              required
            />
          </div>
          <div class="d-flex justify-content-center gap-3 mt-4">
            <div>
              <button className="btn btn-primary"><Link className='text-white link' to={'/viewmenu'}>BACK</Link></button>
            </div>
            <div>
              <button type='submit' className="btn btn-primary">UPDATE NOW</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateMenu;
