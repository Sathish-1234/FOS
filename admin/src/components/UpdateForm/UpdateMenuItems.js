import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Container, Row, Col, Image, Button, InputGroup } from "react-bootstrap";

function UpdateMenuItems() {
  const { id } = useParams();
  const [Currency, setCurrency] = useState(1);
  const [menu, setMenu] = useState([]);
  const [menuitem, setMenuItem] = useState("");
  const [menuid, setMenuId] = useState(-1);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const count = 1;

  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(0);
  const [imageDimensions, setImageDimensions] = useState({
    height: "300px",
    width: "450px",
  });
  const [confirmationStatus, setConfirmationStatus] = useState(false);
  const adminId = localStorage.getItem("fosadminsecretsID");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_FOS_API}/getmenudata`,{
        headers: { Authorization: adminId },
      })
      .then((res) => setMenu(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_FOS_API}/getmenuitemsdesireddata/` + id,{
        headers: { Authorization: adminId },
      })
      .then((res) => {
        const data = res.data;
        setMenuItem(data.menuitem);
        setMenuId(data.menuid);
        setPrice(data.price);
        setQuantity(data.quantity);
        setDescription(data.description);
        setImg(data.image);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  function handleUpdate(e) {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", file);
    formdata.append("menuitem", menuitem);
    formdata.append("menuid", menuid);
    formdata.append("price", price);
    formdata.append("quantity", quantity);
    formdata.append("description", description);
    formdata.append("count", count);

    axios
      .put(`${process.env.REACT_APP_FOS_API}/updateproduct/${id}`, formdata,{
        headers: { Authorization: adminId },
      })
      .then((res) => {
        if (!confirmationStatus) {
          setConfirmationStatus(true);
          setTimeout(() => {
            setConfirmationStatus(false);
          }, 2000);
        }
        navigate("/viewmenuitems");
      })
      .catch((err) => console.log("-> from client" + err));
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 500) {
        setImageDimensions({
          height: "200px",
          width: "250px",
        });
      } else {
        setImageDimensions({
          height: "300px",
          width: "450px",
        });
      }
    }

    // Add an event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call the resize handler initially
    handleResize();

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container>
      {confirmationStatus === true ? (
        <p
          style={{ width: "13rem", position: "absolute", right: 5 }}
          className="successfullanimation"
        >
          Successfully added 🥳
        </p>
      ) : (
        ""
      )}
      <div className="py-3 text-center">
        <h5 style={{ color: "orange" }}>
          <b>UPDATE MENUITEMS FORM</b>
        </h5>
      </div>
      <Form onSubmit={handleUpdate}>
        <Row>
          <Col lg={6} xs={12} className="px-4">
            <Form.Group>
              <Form.Label>Menu Item Name</Form.Label>
              <Form.Control
                type="text"
                value={menuitem}
                onChange={(e) => setMenuItem(e.target.value)}
                placeholder="Pizza"
                required
              />
            </Form.Group>
            <Row>
              <Col lg={6} xs={12}>
                <Form.Group>
                  <Form.Label>Select Categories</Form.Label>
                  <Form.Select
                    onChange={(e) => setMenuId(e.target.value)}
                  >
                    <option style={{ background: "#428FF5" }} value="">
                      {menu.find((m) => m.menuid == menuid)?.menuname}
                    </option>
                    {menu.map((m) =>
                      m.menuid != menuid ? (
                        <option value={m.menuid}>{m.menuname}</option>
                      ) : (
                        ""
                      )
                    )}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={6} xs={12}>
                <Form.Group>
                  <Form.Label>Currency</Form.Label>
                  <Form.Select
                    onChange={(e) => setCurrency(e.target.value)}
                    required
                  >
                    <option value={1}>INR</option>
                    <option value={2}>USD</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col lg={6} xs={12}>
                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="01"
                    required
                  />
                </Form.Group>
              </Col>
              <Col lg={6} xs={12}>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <InputGroup>
                    {Currency == 1 ? (
                      <span className="input-group-text">₹</span>
                    ) : (
                      <span className="input-group-text">$</span>
                    )}
                    <Form.Control
                      style={{ width: "100%" }}
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="100"
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Message"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                onChange={handleFile}
                style={{
                  padding: "0.5rem 1rem",
                  height: "3rem",
                }}
                type="file"
              />
            </Form.Group>
          </Col>
          <Col lg={5} xs={12}>
            <Image
              className="food_1 py-3 px-3 ps-5"
              src={preview === 0 ? `${process.env.REACT_APP_FOS_API}/images/${img}` : preview}
              alt=""
              style={imageDimensions}
            />
            <div className="d-flex justify-content-between py-4 light-border">
              <Form.Label>Discount Active</Form.Label>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="d-flex justify-content-center pb-5 mb-5">
              <Button
                onClick={() => navigate("/viewmenuitems")}
                className="btn btn-primary px-4 py-2 me-3"
              >
                BACK
              </Button>
              <Button type="submit" className="btn btn-primary px-4">
                UPDATE
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default UpdateMenuItems;
