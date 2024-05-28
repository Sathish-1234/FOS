import React, { useEffect, useReducer, useRef, useState } from "react";
import img1 from "../../assests/images/new.png";
import img2 from "../../assests/images/new_wave_152.53060010913688.png";
import img3 from "../../assests/images/new2.png";
import img4 from "../../assests/images/new3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faHourglassHalf,
  faCheckDouble,
  faChartColumn,
  faTrashCan
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ViewOrder from "./ViewOrder";
import Swal from "sweetalert2";

function Statistics() {
  const [menuCount, setMenuCount] = useState(0);
  const [menuItemCount, setMenuItemCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [recentOrder, setRecentOrder] = useState([]);
  const [totalTodayOrders, setTotalTodayOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  

  const [reducerValue,forceUpdate] = useReducer(x => x + 1,0);

  //* get active delivery partner details

  const [deliveryPersonActiveDetails, setDeliveryPersonActiveDetails] =
    useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_FOS_API}/getactivedeliverypersondetails`,{
        headers: { Authorization: adminId },
      })
      .then((res) => setDeliveryPersonActiveDetails(res.data))
      .catch((err) => console.log(err));
  }, []);

  //* Current Date

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const currentDate = new Date();
  const formattedCurrentDate = formatDate(currentDate);

  //* Get totall orders - today

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_FOS_API}/gettodayinvoice?selectedDate=${formattedCurrentDate}`,{
          headers: { Authorization: adminId },
        }
      )
      .then((res) => setTotalTodayOrders(res.data));
  }, [reducerValue]);

  const filteredTodayOrders = totalTodayOrders.filter((element) => {
    return element.purchasemode != "pickup" && element.assignedto == null;
  });

  const filterAssignedOrders = totalTodayOrders.filter((element) => {
    return element.purchasemode != "pickup" && element.assignedto != null;
  });

  const filterAssignedDPName = (value) => {
    let DeliveryPersonName = null;
    deliveryPersonActiveDetails.map((element)=>{
       if(element.DeliveryPerson_ID === value){
        DeliveryPersonName = element.DP_Name
       }
    })
    console.log(DeliveryPersonName);
    return DeliveryPersonName;
  }

  //~ Admin Data

  const [adminData, setAdminData] = useState({});
  const adminId = localStorage.getItem("fosadminsecretsID");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_FOS_API}/getdesiredadmin/${adminId}`,{
        headers: { Authorization: adminId },
      })
      .then((res) => setAdminData(res.data));
  }, []);

  //~ Month picker

  let date = new Date();
  let currentMonth = date.getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [monthlyOrders, setMonthlyOrders] = useState(0);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_FOS_API}/getmonthlyorders?selectedMonth=${selectedMonth}`,{
          headers: { Authorization: adminId },
        }
      )
      .then((res) => setMonthlyOrders(res.data.totalOrders));
  }, [selectedMonth]);

  //~ Date picker

  const [selectedDate, setSelectedDate] = useState(formattedCurrentDate);
  const [dailyOrders, setDailyOrders] = useState(0);

  // Define the handleDateChange function to update the selectedDate state
  const handleDateChange = (date) => {
    const formattedDate = formatDate(date);
    setSelectedDate(formattedDate);
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_FOS_API}/getdailyorderscount?selectedDate=${selectedDate}`,{
          headers: { Authorization: adminId },
        }
      )
      .then((res) => setDailyOrders(res.data.totalOrders));
  }, [selectedDate]);

  //~ Get total
 
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_FOS_API}/gettotalmenucount`,{
        headers: { Authorization: adminId },
      })
      .then((res) => setMenuCount(res.data.count));
    axios
      .get(`${process.env.REACT_APP_FOS_API}/gettotalmenuitemscount`,{
        headers: { Authorization: adminId },
      })
      .then((res) => setMenuItemCount(res.data.count));
    axios
      .get(`${process.env.REACT_APP_FOS_API}/gettotalcustomerscount`,{
        headers: { Authorization: adminId },
      })
      .then((res) => setCustomerCount(res.data.count));
    axios
      .get(`${process.env.REACT_APP_FOS_API}/gettotalorderscount`,{
        headers: { Authorization: adminId },
      })
      .then((res) => setOrderCount(res.data.count));
    axios
      .get(`${process.env.REACT_APP_FOS_API}/getrecentorders`,{
        headers: { Authorization: adminId },
      })
      .then((res) => setRecentOrder(res.data));
  }, []);

  // handle assign

  // State to store selected delivery persons for each order
  const [selectedDeliveryPersons, setSelectedDeliveryPersons] = useState({});
  const selectRef = useRef(null);


  // Function to handle assigning a delivery person to an order
  const fetchData = (event) => {
    // Get the selected value from the sibling <select> element
    const selectedDPId = event.target.previousSibling.value;
    const invoiceNo = event.target.value;
    console.log(selectedDPId);
    if(selectedDPId === "not choosed"){
      alert("Choose DP")
    }
    else{
      axios.put(`${process.env.REACT_APP_FOS_API}/updateassignment`,{selectedDPId,invoiceNo},{
        headers: { Authorization: adminId },
      })
      .then((res)=>{
        if(res.data.success) console.log("success"); 
        else{console.log("failure")};
        forceUpdate();
        Swal.fire("Assigned Successully!");
      })
      .then((err)=>console.log(err))
    }
    
  };

  // Function to handle assigning a delivery person to an order
  const fetchReassignData = (event) => {
    // Get the selected value from the sibling <select> element
    const selectedDPId = event.target.previousSibling.value;
    const invoiceNo = event.target.value;
    console.log(selectedDPId);
    if(selectedDPId === "not choosed"){
      alert("Choose DP")
    }
    else{
      axios.put(`${process.env.REACT_APP_FOS_API}/updateassignment`,{selectedDPId,invoiceNo},{
        headers: { Authorization: adminId },
      })
      .then((res)=>{
        if(res.data.success) console.log("success"); 
        else{console.log("failure")};
        forceUpdate();
        Swal.fire("Re - Assigned Successully!");
      })
      .then((err)=>console.log(err))
    }
    
  };

  return (
    <div style={{position:'fixed',overflowY:'scroll',overflowX:'hidden',height:'100vh'}}>
      <div className="row vh-100">
        <div className="col-12 col-md-6 " style={{ position: "relative" }}>
          <h5 className="rounded p-3 bg-danger text-white ">
            Recent Request <FontAwesomeIcon className="ms-1" icon={faBell} />
          </h5>

          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer Id</th>
                <th>Delivery Person</th>
                <th>Order</th>
              </tr>
            </thead>
            <tbody>
              {filteredTodayOrders && filteredTodayOrders.length > 0
                ? filteredTodayOrders.map((val, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{val.customerID}</td>
                      <td>
                        <select ref={selectRef} className="border rounded p-1">
                          <option value="not choosed">--Choose Delivery Person--</option>
                          {deliveryPersonActiveDetails.map((m) => (
                            <option key={m.DeliveryPerson_ID} value={m.DeliveryPerson_ID}>{m.DP_Name}</option>
                          ))}
                        </select>
                        <button
                          value={val.invoiceNumber}
                          onClick={fetchData}
                          className="btn btn-sm btn-primary ms-2 mb-2"
                        >
                          Assign
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setSelectedOrderId(val.invoiceNumber);
                          }}
                          className="btn btn-primary btn-sm"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                : "No Orders"}
            </tbody>
          </table>

        </div>

        {selectedOrderId != null ? (
          <div
            className="border rounded"
            style={{
              position: "absolute",
              top: "5%",
              left: "5%",
              background: "white",
              height: "90%",
              width: "90%",
            }}
          >
            <div
              onClick={() => setSelectedOrderId(null)}
              style={{
                position: "absolute",
                right: "2%",
                top: "3%",
                fontWeight: "600",
                fontSize: "30px",
                cursor: "pointer",
              }}
            >
              X
            </div>
            <ViewOrder id={selectedOrderId} />
          </div>
        ) : (
          ""
        )}

        <div className="col-12 col-md-6">
          <h5 className="rounded p-3 bg-warning text-white">
            Waiting To Accept
            <FontAwesomeIcon className="ms-1" icon={faHourglassHalf} />
          </h5>

          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer Id</th>
                <th>Delivery Person</th>
                <th>Order</th>
              </tr>
            </thead>
            <tbody>
              {filterAssignedOrders && filterAssignedOrders.length > 0
                ? filterAssignedOrders.map((val, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{val.customerID}</td>
                      <td>
                        <select ref={selectRef} className="border rounded p-1">
                          <option className="bg-primary">{val.assignedto}</option>
                          {deliveryPersonActiveDetails.map((m) => (
                            <option key={m.DeliveryPerson_ID} value={m.DeliveryPerson_ID}>{m.DP_Name}</option>
                          ))}
                        </select>
                        <button
                          value={val.invoiceNumber}
                          onClick={fetchReassignData}
                          className="btn btn-sm btn-primary ms-2 mb-2"
                        >
                          Re-Assign
                        </button>
                      </td>
                      <td className="d-flex align-items-center">
                        <button
                          onClick={() => {
                            setSelectedOrderId(val.invoiceNumber);
                          }}
                          className="btn btn-primary btn-sm"
                        >
                          View
                        </button>
                        <FontAwesomeIcon style={{cursor:'pointer'}} className="ms-3 text-danger fs-5" icon={faTrashCan} />
                      </td>
                    </tr>
                  ))
                : "No Orders"}
            </tbody>
          </table>

        </div>
        <div className="col-12 col-md-6">
          <h5 className="rounded p-3 bg-dark text-white ">
            Order status{" "}
            <FontAwesomeIcon className="ms-1" icon={faChartColumn} />
          </h5>
        </div>
        <div className="col-12 col-md-6">
          <h5 className="rounded p-3 bg-success text-white ">
            Accepted
            <FontAwesomeIcon className="ms-1" icon={faCheckDouble} />
          </h5>
        </div>
      </div>

      <div className="row">
        <div className="row border rounded py-3 ">
          <div className="col-lg-3 col-md-6 col-12">
            <h6>Total Menu Items</h6>
            <h3>
              <b>{menuCount}</b>
            </h3>
            <img
              className="w-100 w-md-50"
              src={img1}
              alt="888"
              height="120rem"
            />
          </div>
          <div className="col-lg-3 mt-lg-0 mt-4 col-md-6 col-12">
            <h6>Total Menu category</h6>
            <h3>
              <b>{menuItemCount}</b>
            </h3>
            <img className="w-100" src={img2} alt="888" height="120rem" />
          </div>
          <div className="col-lg-3 mt-lg-0 mt-4 col-md-6 col-12">
            <h6>Total Customers</h6>
            <h3>
              <b>{customerCount}</b>
            </h3>
            <img className="w-100" src={img3} alt="888" height="120rem" />
          </div>
          <div className="col-lg-3 mt-lg-0 mt-4 col-md-6 col-12">
            <h6>Total Orders</h6>
            <h3>
              <b>{orderCount}</b>
            </h3>
            <img className="w-100" src={img4} alt="888" height="120rem" />
          </div>
        </div>

        <div className="border rounded p-3 col-12 col-md-6 mt-4">
          <div class="d-flex justify-content-between">
            <h6>DAILY REPORT</h6>
            <DatePicker
              selected={new Date(selectedDate)} // Parse the selectedDate string back to a Date object
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd" // Use the desired format
            />
          </div>
          <hr />

          <div className="row justify-content-around my-4 mx-3">
            <h5 className="my-2 col-6">Total Orders </h5>
            <h5 className="my-2 col-2">-</h5>
            <h5 className="my-2 col-4">
              {dailyOrders} <span style={{ color: "gray" }}>Orders</span>
            </h5>
          </div>
          <div className="row justify-content-around my-4 mx-3 text-success">
            <h5 className="my-2 col-6">Successfull Orders </h5>
            <h5 className="my-2 col-2">-</h5>
            <h5 className="my-2 col-4">
              {dailyOrders} <span>Orders</span>
            </h5>
          </div>
          <div className="row justify-content-around my-4 mx-3 text-danger">
            <h5 className="my-2 col-6">Cancelled Orders </h5>
            <h5 className="my-2 col-2">-</h5>
            <h5 className="my-2 col-4">
              {dailyOrders} <span>Orders</span>
            </h5>
          </div>
        </div>

        <div className="border rounded p-3 col-12 col-md-6 mt-4">
          <div className="d-flex justify-content-between">
            <h6>MONTHLY REPORT</h6>
            <select
              onChange={(e) => setSelectedMonth(e.target.value)}
              value={selectedMonth}
              name=""
              id=""
            >
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
          <hr />

          <div className="row justify-content-around my-4 mx-3">
            <h5 className="my-2 col-6">Total Orders </h5>
            <h5 className="my-2 col-2">-</h5>
            <h5 className="my-2 col-4">
              {monthlyOrders} <span style={{ color: "gray" }}>Orders</span>
            </h5>
          </div>
          <div className="row justify-content-around my-4 mx-3 text-success">
            <h5 className="my-2 col-6">Successfull Orders </h5>
            <h5 className="my-2 col-2">-</h5>
            <h5 className="my-2 col-4">
              {monthlyOrders} <span>Orders</span>
            </h5>
          </div>
          <div className="row justify-content-around my-4 mx-3 text-danger">
            <h5 className="my-2 col-6">Cancelled Orders </h5>
            <h5 className="my-2 col-2">-</h5>
            <h5 className="my-2 col-4">
              {monthlyOrders} <span>Orders</span>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
