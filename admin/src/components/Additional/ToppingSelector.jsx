import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark
} from "@fortawesome/free-solid-svg-icons";

function ToppingSelector({ onClose ,onAdd}) {
  const [toppings, setToppings] = useState([]);
  const [prices, setPrices] = useState({});
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [showError, setShowError] = useState(false);
	const adminId = localStorage.getItem("fosadminsecretsID");
  useEffect(() => {
    fetchToppings();
  }, []);

  const fetchToppings = async () => {
    try {
      const response = await axios.get("http://localhost:5555/gettopping",{
        headers: { Authorization: adminId },
      });
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
        { toppingId: item.toppingId, price: "" },
      ]);
    }
  };

  const handlePriceChange = (item, price) => {
    const updatedSelectedToppings = selectedToppings.map((topping) => {
      if (topping.toppingId === item.toppingId) {
        return { toppingId: item.toppingId, price };
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
    }
  };

  const handleCloseClick = () => {
    setSelectedToppings([]);
    setPrices({});
  };

  return (
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
                  onChange={(e) => handlePriceChange(item, e.target.value)}
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
  );
}

export default ToppingSelector;
