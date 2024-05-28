import React, { useEffect, useState, useRef } from "react";
import pre_preview from "../../assests/images/previww.png";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function AddMenuItems() {
  const [Currency, setCurrency] = useState(1);
  const [menu, setMenu] = useState([]);
  const [menuitem, setMenuItem] = useState("");
  const [menuid, setMenuId] = useState(-1);
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [description, setDescription] = useState("");
  const count = 1;
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(0);
  const [imageDimensions, setImageDimensions] = useState({
    height: "300px",
    width: "450px",
  });
  const [confirmationstatus, setConfirmationStatus] = useState(false);

  //topping start

  const [isToppingSelector, setIsToppingSelector] = useState(false);
  const [isToppingSelectorView, setIsToppingSelectorView] = useState(false);
  const adminId = localStorage.getItem("fosadminsecretsID");

  const [toppings, setToppings] = useState([]);
  const [prices, setPrices] = useState({});
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [showError, setShowError] = useState(false);
  console.log("token" + adminId);
  useEffect(() => {
    fetchToppings();
  }, []);

  const fetchToppings = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_FOS_API + "/gettopping",
        {
          headers: { Authorization: adminId },
        }
      );
      setToppings(response.data);
    } catch (error) {
      console.error("Error fetching toppings:", error);
    }
  };

  const handleCheckboxChange = (item) => {
    if (
      selectedToppings.some((topping) => topping.toppingId === item.toppingId)
    ) {
      setSelectedToppings(
        selectedToppings.filter(
          (topping) => topping.toppingId !== item.toppingId
        )
      );
    } else {
      setSelectedToppings([
        ...selectedToppings,
        { toppingId: item.toppingId, price: "", toppingName: item.toppingName },
      ]);
    }
  };

  console.log(JSON.stringify(selectedToppings));

  const handlePriceChange = (item, price) => {
    const updatedSelectedToppings = selectedToppings.map((topping) => {
      if (topping.toppingId === item.toppingId) {
        return {
          toppingId: item.toppingId,
          price,
          toppingName: item.toppingName,
        };
      }
      return topping;
    });

    setSelectedToppings(updatedSelectedToppings);
    setPrices({
      ...prices,
      [item.toppingId]: price,
    });
  };

  const handleAddClick = () => {
    const missingPrices = selectedToppings.filter(
      (topping) => topping.price === ""
    );

    if (missingPrices.length > 0) {
      setShowError(true);
    } else {
      setShowError(false);
      setIsToppingSelectorView(true);
      setIsToppingSelector(false);
    }
  };

  const handleCloseClick = () => {
    setIsToppingSelector(false);
    if (!isToppingSelectorView) {
      setSelectedToppings([]);
      setPrices({});
    }
  };

  //topping end

  //base start

  const [isBaseSelector, setIsBaseSelector] = useState(false);
  const [isBaseSelectorView, setIsBaseSelectorView] = useState(false);

  const [bases, setBases] = useState([]);
  const [basePrices, setBasePrices] = useState({});
  const [selectedBases, setSelectedBases] = useState([]);
  const [showBaseError, setShowBaseError] = useState(false);

  useEffect(() => {
    fetchBases();
  }, []);

  const fetchBases = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_FOS_API + "/getBase",
        {
          headers: { Authorization: adminId },
        }
      );
      setBases(response.data);
    } catch (error) {
      console.error("Error fetching Bases:", error);
    }
  };

  const handleBaseCheckboxChange = (item) => {
    if (selectedBases.some((base) => base.baseId === item.baseId)) {
      setSelectedBases(
        selectedBases.filter((base) => base.baseId !== item.baseId)
      );
    } else {
      setSelectedBases([
        ...selectedBases,
        { baseId: item.baseId, baseName: item.baseName, basePrice: "" },
      ]);
    }
  };

  const handleBasePriceChange = (item, price) => {
    const updatedSelectedBases = selectedBases.map((base) => {
      if (base.baseId === item.baseId) {
        return { ...base, basePrice: price };
      }
      return base;
    });

    setSelectedBases(updatedSelectedBases);
    setBasePrices({
      ...basePrices,
      [item.baseId]: price,
    });
  };

  const handleBaseAddClick = () => {
    const missingPrices = selectedBases.filter(
      (Base) => Base.basePrices === ""
    );

    if (missingPrices.length > 0) {
      setShowBaseError(true);
    } else {
      setShowBaseError(false);
      setIsBaseSelectorView(true);
      setIsBaseSelector(false);
    }
  };

  const handleBaseCloseClick = () => {
    setIsBaseSelector(false);
    if (!isBaseSelectorView) {
      setSelectedBases([]);
      setBasePrices({});
    }
  };

  console.log("seletedbase" + selectedBases);

  //Base end

  console.log(JSON.stringify(selectedBases));

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_FOS_API}/getmenudata`, {
        headers: { Authorization: adminId },
      })
      .then((res) => setMenu(res.data))
      .catch((err) => console.log(err));
  }, []);

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

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("menuitem", menuitem);
    formData.append("menuid", menuid);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("description", description);
    formData.append("count", count);
    formData.append("selectedToppings", JSON.stringify(selectedToppings));
    formData.append("selectedBases", JSON.stringify(selectedBases));

    axios
      .post(`${process.env.REACT_APP_FOS_API}/insertproduct`, formData, {
        headers: { Authorization: adminId },
      })
      .then((res) => {
        console.log(res.data);

        setMenuItem("");
        setMenuId(-1);
        setPrice("");
        setQuantity("");
        setDescription("");
        setFile(null);
        setPreview(0);
        setSelectedToppings([]);
        setPrices({});
        isToppingSelector(false);

        fileInputRef.current.value = "";
        if (confirmationstatus === false) {
          setConfirmationStatus(true);
          setTimeout(() => {
            setConfirmationStatus(false);
          }, 2000);
        }

        //* Clear the input fields
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container">
      {confirmationstatus === true ? (
        <p
          className="position-absolute end-0 me-5 text-white p-2 rounded"
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

      <h5 className="py-3 text-center border-bottom text-primary">
        <b>ADD MENUITEMS FORM</b>
      </h5>

      <form onSubmit={handleSubmit} className="row mt-4">
        <div className="col-lg-6">
          <div className="mb-3">
            <label htmlFor="menuItem">Menu Item Name</label>
            <input
              onChange={(e) => setMenuItem(e.target.value)}
              type="text"
              className="form-control"
              id="menuItem"
              required
              value={menuitem}
            />
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="menuSelect">Select Categories</label>
              <select
                onChange={(e) => setMenuId(e.target.value)}
                className="form-select"
                id="menuSelect"
                required
                value={menuid}
              >
                <option value="">select menu</option>
                {menu.map((m) => (
                  <option key={m.menuid} value={m.menuid}>
                    {m.menuname}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="currencySelect">Currency</label>
              <select
                onChange={(e) => setCurrency(e.target.value)}
                className="form-select"
                id="currencySelect"
                required
              >
                <option value={1}>INR</option>
                <option value={2}>USD</option>
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="quantityInput">Quantity</label>
              <input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
                min="0"
                className="form-control"
                id="quantityInput"
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="priceInput">Price</label>
              <div className="input-group">
                {Currency == 1 ? (
                  <span className="input-group-text">₹</span>
                ) : (
                  <span className="input-group-text">$</span>
                )}
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number" // Use type="number" to restrict input to numbers
                  min="0" // Set a minimum value of 0
                  className="form-control"
                  id="decimalInput"
                  name="decimalInput"
                  step="0.001"
                  required
                />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="descriptionTextarea">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
              id="descriptionTextarea"
              rows="5"
              placeholder="Message"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="imageInput">Product Image</label>
            <input
              ref={fileInputRef} //~ Set the ref here
              onChange={handleFile}
              type="file"
              className="form-control"
              id="imageInput"
              required
              value={null}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div>
            <img
              style={imageDimensions}
              src={preview === 0 ? pre_preview : preview}
              alt=""
            />
          </div>
          <div className="d-flex justify-content-between py-2 light-border py-4">
            <div className="d-flex justify-content-between w-100 me-5">
              <h6>Add Toppings</h6>
              {!isToppingSelectorView ? (
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isToppingSelector}
                    onChange={() => setIsToppingSelector(!isToppingSelector)}
                  />
                  <span className="slider round"></span>
                </label>
              ) : (
                ""
              )}
              {isToppingSelectorView ? (
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isToppingSelector}
                    onChange={() => setIsToppingSelector(!isToppingSelector)}
                  />
                  <span style={{ color: "blue", cursor: "pointer" }}>view</span>
                </label>
              ) : (
                ""
              )}
            </div>

            <div className="d-flex justify-content-between w-100 me-5">
              <h6>Add Bases</h6>
              {!isBaseSelectorView ? (
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isBaseSelector}
                    onChange={() => setIsBaseSelector(!isBaseSelector)}
                  />
                  <span className="slider round"></span>
                </label>
              ) : (
                ""
              )}
              {isBaseSelectorView ? (
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isBaseSelector}
                    onChange={() => setIsBaseSelector(!isBaseSelector)}
                  />
                  <span style={{ color: "blue", cursor: "pointer" }}>view</span>
                </label>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="d-flex justify-content-center me-3 mb-5 pb-5 pt-3">
            <button className="btn btn-primary">Save and Add</button>
          </div>
        </div>
        {/* topping */}
        {isToppingSelector ? (
          <div className="position-absolute w-75 text-dark p-2 rounded">
            <div className="toppings-selector">
              <button className="close-button" onClick={handleCloseClick}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
              <h2 className="heading">Select Toppings</h2>
              {showError && (
                <p className="error-message">
                  Please provide prices for all selected toppings.
                </p>
              )}
              <div className="toppings-list-container">
                {toppings.map((item) => (
                  <div key={item.toppingId} className="topping-item">
                    <input
                      type="checkbox"
                      id={item.toppingId}
                      value={item.toppingName}
                      onChange={() => handleCheckboxChange(item)}
                    />
                    <label htmlFor={item.toppingId}>{item.toppingName}</label>
                    {selectedToppings.some(
                      (topping) => topping.toppingId === item.toppingId
                    ) && (
                      <div>
                        <input
                          type="number"
                          placeholder="Enter price"
                          value={prices[item.toppingId] || ""}
                          onChange={(e) =>
                            handlePriceChange(item, e.target.value)
                          }
                          className={`price-input ${
                            prices[item.toppingId] === "" ? "invalid-price" : ""
                          }`}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="button-container">
                <button className="cancel-button" onClick={handleCloseClick}>
                  Cancel
                </button>
                <button className="add-button" onClick={handleAddClick}>
                  Add
                </button>
              </div>

              <style>
                {`
                  .toppings-selector {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                    position: relative;
                    zindex:9999;
                    background:white
                  }

                  .heading {
                    font-size: 1.5rem;
                    text-align: center;
                    margin-bottom: 10px;
                  }

                  .toppings-list-container {
                    border: 1px solid #ccc;
                    padding: 10px;
                    margin-bottom: 20px;
                    display: flex;
                    flex-wrap: wrap;
                  }

                  .topping-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    width: calc(33.33% - 10px);
                    margin-bottom: 10px;
                    margin-right: 10px;
                  }

                  .topping-item:nth-child(3n) {
                    margin-right: 0;
                  }

                  .price-input {
                    width: 100px;
                    padding: 5px;
                    border: 1px solid #ccc;
                    border-radius: 3px;
                  }

                  .invalid-price {
                    border-color: red;
                  }

                  .selected-price {
                    margin-left: 10px;
                    font-size: 0.8rem;
                  }

                  .error-message {
                    color: red;
                    margin-bottom: 10px;
                  }

                  .close-button {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    padding: 5px;
                    background-color: gray;
                    color: white;
                    border: none;
                    border-radius: 3px;
                    cursor: pointer;
                  }
                  .button-container{
                    text-align:center
                  }
                  .cancel-button {
                    padding: 5px 10px;
                    background-color: gray;
                    color: white;
                    border: none;
                    border-radius: 3px;
                    cursor: pointer;
                    margin-right:10px;
                  }

                  .add-button {
                    margin: 0 auto;
                    margin-top: 10px;
                    padding: 5px 10px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 3px;
                    cursor: pointer;
                  }

                  @media screen and (max-width: 768px) {
                    .toppings-selector {
                      padding: 10px;
                    }

                    .topping-item {
                      width: calc(50% - 5px);
                    }

                    .topping-item:nth-child(3n) {
                      margin-right: 10px;
                    }

                    .topping-item:nth-child(2n) {
                      margin-right: 0;
                    }
                  }

                  @media screen and (max-width: 500px) {
                    .topping-item {
                      width: 100%;
                    }
                  }
                `}
              </style>
            </div>
          </div>
        ) : (
          ""
        )}
        console.log('s '+ selectedToppings);
        {/* base */}
        {isBaseSelector ? (
          <div className="position-absolute w-75 text-dark p-2 rounded">
            <div className="bases-selector">
              <button className="close-button" onClick={handleBaseCloseClick}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
              <h2 className="heading">Select bases</h2>
              {showBaseError && (
                <p className="error-message">
                  Please provide prices for all selected bases.
                </p>
              )}
              <div className="bases-list-container">
                {bases.map((item) => (
                  <div key={item.baseId} className="base-item">
                    <input
                      type="checkbox"
                      id={item.baseId}
                      value={item.baseName}
                      onChange={() => handleBaseCheckboxChange(item)}
                    />
                    <label htmlFor={item.baseId}>{item.baseName}</label>
                    {selectedBases.some(
                      (base) => base.baseId === item.baseId
                    ) && (
                      <div>
                        <input
                          type="number"
                          placeholder="Enter price"
                          value={basePrices[item.baseId] || ""}
                          onChange={(e) =>
                            handleBasePriceChange(item, e.target.value)
                          }
                          className={`price-input ${
                            basePrices[item.baseId] === ""
                              ? "invalid-price"
                              : ""
                          }`}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="button-container">
                <button
                  className="cancel-button"
                  onClick={handleBaseCloseClick}
                >
                  Cancel
                </button>
                <button className="add-button" onClick={handleBaseAddClick}>
                  Add
                </button>
              </div>

              <style>
                {`
                  .bases-selector {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                    position: relative;
                    zindex:9999;
                    background:white
                  }

                  .heading {
                    font-size: 1.5rem;
                    text-align: center;
                    margin-bottom: 10px;
                  }

                  .bases-list-container {
                    border: 1px solid #ccc;
                    padding: 10px;
                    margin-bottom: 20px;
                    display: flex;
                    flex-wrap: wrap;
                  }

                  .base-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    width: calc(33.33% - 10px);
                    margin-bottom: 10px;
                    margin-right: 10px;
                  }

                  .base-item:nth-child(3n) {
                    margin-right: 0;
                  }

                  .price-input {
                    width: 100px;
                    padding: 5px;
                    border: 1px solid #ccc;
                    border-radius: 3px;
                  }

                  .invalid-price {
                    border-color: red;
                  }

                  .selected-price {
                    margin-left: 10px;
                    font-size: 0.8rem;
                  }

                  .error-message {
                    color: red;
                    margin-bottom: 10px;
                  }

                  .close-button {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    padding: 5px;
                    background-color: gray;
                    color: white;
                    border: none;
                    border-radius: 3px;
                    cursor: pointer;
                  }
                  .button-container{
                    text-align:center
                  }
                  .cancel-button {
                    padding: 5px 10px;
                    background-color: gray;
                    color: white;
                    border: none;
                    border-radius: 3px;
                    cursor: pointer;
                    margin-right:10px;
                  }

                  .add-button {
                    margin: 0 auto;
                    margin-top: 10px;
                    padding: 5px 10px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 3px;
                    cursor: pointer;
                  }

                  @media screen and (max-width: 768px) {
                    .bases-selector {
                      padding: 10px;
                    }

                    .base-item {
                      width: calc(50% - 5px);
                    }

                    .base-item:nth-child(3n) {
                      margin-right: 10px;
                    }

                    .base-item:nth-child(2n) {
                      margin-right: 0;
                    }
                  }

                  @media screen and (max-width: 500px) {
                    .base-item {
                      width: 100%;
                    }
                  }
                `}
              </style>
            </div>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}

export default AddMenuItems;
