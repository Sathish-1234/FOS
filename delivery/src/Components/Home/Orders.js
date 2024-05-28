import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCheck,
	faXmark,
	faLocationDot,
	faPhone,
	faUser,
	faCheckDouble,
	faSackDollar,
	faTruck,
	faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Accordion from "react-bootstrap/Accordion";
import { Modal, Button, Form } from "react-bootstrap";

function Orders() {
	const [acceptedOrderDetails, setAcceptedOrderDetails] = useState([]);
	const [waitingOrderDetails, setWaitingOrderDetails] = useState([]);
	const [activeOrderDetails, setActiveOrderDetails] = useState(false);
	const [showPaymentModal, setShowPaymentModal] = useState(false);
	const [showIssuesModal, setShowIssuesModal] = useState(false);
	const [showAlreadyPaidModal, setShowAlreadyPaidModal] = useState(false);
	const [selectedIssuesOption, setSelectedIssuesOption] = useState(null);
	const [selectedInvoiceNumber, setSelectedInvoiceNumber] = useState(null);
	const [selectedCodOption, setSelectedCodOption] = useState(null);

	const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

	const dpId = localStorage.getItem("dpId");

	const handleDeliveryStatus = (invoiceId, status) => {
		axios
			.put(
				`${process.env.REACT_APP_FOS_DELIVERY_PARTNER_API}/updatedeliverystatus/${invoiceId}`,
				{ status },
				{ headers: { Authorization: dpId } },
			)
			.then((res) => {
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Order Accepted",
					showConfirmButton: false,
					timer: 2000,
				});
				forceUpdate();
			})
			.catch((err) => console.log(err));
	};

	// const rejectOrder = () => {
	//   Swal.fire({
	//     title: "Are you sure?",
	//     text: `You will get ***"NEGATIVE"*** score`,
	//     icon: "warning",
	//     showCancelButton: true,
	//     confirmButtonColor: "#3085d6",
	//     cancelButtonColor: "#d33",
	//     confirmButtonText: "Yes, reject it!"
	//   }).then((result) => {
	//     if (result.isConfirmed) {
	//       Swal.fire({
	//         title: "Rejected!",
	//         text: "",
	//         icon: "success"
	//       });
	//     }
	//   });
	// }

	const handleDeliveredClick = (transcationmode) => {
		// Show the payment options modal
		if (transcationmode == "cod") {
			setShowPaymentModal(true);
		} else {
			setShowAlreadyPaidModal(true);
		}
	};

	const handleAlreadyPaidSubmit = () => {
		setShowAlreadyPaidModal(false);
		axios
			.put(
				`${process.env.REACT_APP_FOS_DELIVERY_PARTNER_API}/alreadypaiddelivery/${selectedInvoiceNumber}`,
				{},
				{ headers: { Authorization: dpId } },
			)
			.then((res) => {
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Order Delivered",
					showConfirmButton: false,
					timer: 2000,
				});
				forceUpdate();
			})
			.catch((err) => console.log(err));
	};

	const handlePaidSubmit = () => {
		setShowPaymentModal(false);
		axios
			.put(
				`${process.env.REACT_APP_FOS_DELIVERY_PARTNER_API}/codpaiddelivery/${selectedInvoiceNumber}`,
				{ selectedCodOption },
				{ headers: { Authorization: dpId } },
			)
			.then((res) => {
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Order Delivered",
					showConfirmButton: false,
					timer: 2000,
				});
				forceUpdate();
			})
			.catch((err) => console.log(err));
	};

	const handleIssuesSubmit = () => {
		setShowIssuesModal(false);

		axios
			.put(
				`${process.env.REACT_APP_FOS_DELIVERY_PARTNER_API}/updateIssuesstatus/${selectedInvoiceNumber}`,
				{ selectedIssuesOption },
				{ headers: { Authorization: dpId } },
			)
			.then((res) => {
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Issues Updated",
					showConfirmButton: false,
					timer: 2000,
				});
				forceUpdate();
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		axios
			.get(
				`${process.env.REACT_APP_FOS_DELIVERY_PARTNER_API}/getacceptedindividualorders/${dpId}`,
				{ headers: { Authorization: dpId } },
			)
			.then((res) => setAcceptedOrderDetails(res.data));
	}, [reducerValue]);

	useEffect(() => {
		axios
			.get(
				`${process.env.REACT_APP_FOS_DELIVERY_PARTNER_API}/getwaitingindividualorders/${dpId}`,
				{ headers: { Authorization: dpId } },
			)
			.then((res) => setWaitingOrderDetails(res.data));
	}, [reducerValue]);

	return (
		<div className="mb-5">
			<h3 className="text-success mt-5 mb-4">Current Order: </h3>
			{acceptedOrderDetails.length > 0 ? (
				acceptedOrderDetails.map((val) => (
					<Accordion
						className="mt-4"
						defaultActiveKey="0"
						key={val.invoiceNumber}
					>
						<Accordion.Item eventKey="0">
							<Accordion.Header>
								<div>
									<b># {val.invoiceNumber}</b>
								</div>
							</Accordion.Header>
							<Accordion.Body
								style={{
									overflow: "scroll",
								}}
								className="d-flex flex-column gap-1"
							>
								<div>
									<FontAwesomeIcon icon={faUser} />
									<b className="mx-2">{val.customername}</b>
									<a
										className="btn btn-sm btn-primary"
										href={`tel:${val.phnum}`}
									>
										<FontAwesomeIcon icon={faPhone} />
									</a>
								</div>
								<div>
									<FontAwesomeIcon icon={faLocationDot} />
									<span className="mx-2">{val.address}</span>
								</div>
								<span className="ms-4">{val.pincode}</span>

								<div
									style={{
										maxHeight: "30vh",
										overflow: "hidden",
										width: "100vw",
									}}
								>
									<table className="table table-bordered">
										<thead className="bg-light w-100">
											<tr>
												<th>MenuItem</th>
												<th>Qty</th>
												<th>Unit Cost</th>
												<th>Discount</th>
												<th>Total</th>
											</tr>
										</thead>
										<tbody>
											{JSON.parse(val.orderDetails).map((m, index) => (
												<tr key={index}>
													<td>{m.menuitems}</td>
													<td>{m.quantity}</td>
													<td>{m.price}</td>
													<td>10%</td>
													<td>
														{m.quantity * m.price - (m.quantity * m.price) / 10}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>

								<div className="d-flex gap-4">
									{val.transcationmode !== "cod" ? (
										<div className="d-flex gap-2">
											<p
												className="bg-primary btn btn-sm text-white px-2 py-1 rounded"
												style={{ width: "max-content" }}
											>
												{" "}
												{val.transcationmode}
												<FontAwesomeIcon icon={faSackDollar} className="ps-2" />
											</p>
											<p
												className="bg-primary btn btn-sm text-white px-2 py-1 rounded"
												style={{ width: "max-content" }}
											>
												PAID{" "}
												<FontAwesomeIcon
													icon={faCheckDouble}
													className="ps-1"
												/>
											</p>
										</div>
									) : (
										<p
											className="bg-warning text-white px-2 py-1 rounded"
											style={{ width: "max-content" }}
										>
											COD{" "}
											<FontAwesomeIcon icon={faSackDollar} className="ps-1" />
										</p>
									)}
									<h5 className="text-end text-primary ">
										Total : {val.totalBill}
									</h5>
								</div>

								<div className="d-flex gap-2 justify-content-end">
									<button
										className="btn btn-sm btn-warning"
										onClick={() => {
											setShowIssuesModal(true);
											setSelectedInvoiceNumber(val.invoiceNumber);
										}}
									>
										<FontAwesomeIcon
											className="me-2"
											icon={faCircleExclamation}
										/>{" "}
										Issues
									</button>
									<button
										className="btn btn-sm btn-success"
										onClick={() => {
											handleDeliveredClick(val.transcationmode);
											setSelectedInvoiceNumber(val.invoiceNumber);
										}}
									>
										<FontAwesomeIcon className="me-2" icon={faTruck} />{" "}
										Delivered
									</button>
								</div>
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				))
			) : (
				<center>No current Orders</center>
			)}

			<h3 className="text-danger mt-5 mb-4">Waiting Orders : </h3>
			{waitingOrderDetails.length > 0 ? (
				waitingOrderDetails.map((val) => (
					<Accordion className="mt-4" key={val.invoiceNumber}>
						<Accordion.Item eventKey="0">
							<Accordion.Header>
								<div>
									<b># {val.invoiceNumber}</b>
								</div>
							</Accordion.Header>
							<Accordion.Body
								style={{
									overflow: "scroll",
								}}
								className="d-flex flex-column gap-1"
							>
								<div>
									<FontAwesomeIcon icon={faUser} />
									<b className="mx-2">{val.customername}</b>
									<a
										className="btn btn-sm btn-primary"
										href={`tel:${val.phnum}`}
									>
										<FontAwesomeIcon icon={faPhone} />
									</a>
								</div>
								<div>
									<FontAwesomeIcon icon={faLocationDot} />
									<span className="mx-2">{val.address}</span>
								</div>
								<span className="ms-4">{val.pincode}</span>

								<div
									style={{
										maxHeight: "30vh",
										overflow: "hidden",
										width: "100vw",
									}}
								>
									<table className="table table-bordered">
										<thead className="bg-light w-100">
											<tr>
												<th>MenuItem</th>
												<th>Qty</th>
												<th>Unit Cost</th>
												<th>Discount</th>
												<th>Total</th>
											</tr>
										</thead>
										<tbody>
											{JSON.parse(val.orderDetails).map((m, index) => (
												<tr key={index}>
													<td>{m.menuitems}</td>
													<td>{m.quantity}</td>
													<td>{m.price}</td>
													<td>10%</td>
													<td>
														{m.quantity * m.price - (m.quantity * m.price) / 10}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>

								<div className="d-flex gap-4">
									{val.transcationmode !== "cod" ? (
										<div className="d-flex gap-2">
											<p
												className="bg-primary btn btn-sm text-white px-2 py-1 rounded"
												style={{ width: "max-content" }}
											>
												{" "}
												{val.transcationmode}
												<FontAwesomeIcon icon={faSackDollar} className="ps-2" />
											</p>
											<p
												className="bg-primary btn btn-sm text-white px-2 py-1 rounded"
												style={{ width: "max-content" }}
											>
												PAID{" "}
												<FontAwesomeIcon
													icon={faCheckDouble}
													className="ps-1"
												/>
											</p>
										</div>
									) : (
										<p
											className="bg-warning text-white px-2 py-1 rounded"
											style={{ width: "max-content" }}
										>
											COD{" "}
											<FontAwesomeIcon icon={faSackDollar} className="ps-1" />
										</p>
									)}
									<h5 className="text-end text-primary ">
										Total : {val.totalBill}
									</h5>
								</div>

								<div className="d-flex gap-2 justify-content-end">
									<button
										className="btn btn-sm btn-warning"
										onClick={() => {
											setShowIssuesModal(true);
											setSelectedInvoiceNumber(val.invoiceNumber);
										}}
									>
										<FontAwesomeIcon
											className="me-2"
											icon={faCircleExclamation}
										/>{" "}
										Issues
									</button>
									<button
										className="btn btn-sm btn-success"
										onClick={() =>
											handleDeliveryStatus(val.invoiceNumber, "accepted")
										}
									>
										<FontAwesomeIcon className="me-2" icon={faCheckDouble} />{" "}
										Accept
									</button>
								</div>
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				))
			) : (
				<center>No Pending Orders</center>
			)}

			{/* Issues Options Modal */}
			<Modal show={showIssuesModal} onHide={() => setShowIssuesModal(false)}>
				<Modal.Header>
					<Modal.Title>Choose the Issues</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="paymentOptions">
							<Form.Check
								type="radio"
								label="cancelled by customers"
								value="cancelled by customers"
								checked={selectedIssuesOption === "cancelled by customers"}
								onChange={() =>
									setSelectedIssuesOption("cancelled by customers")
								}
							/>
							<Form.Check
								type="radio"
								label="restaurent issues"
								value="restaurent issues"
								checked={selectedIssuesOption === "restaurent issues"}
								onChange={() => setSelectedIssuesOption("restaurent issues")}
							/>
							<Form.Check
								type="radio"
								label="cancelled by delivery person"
								value="cancelled by delivery person"
								checked={
									selectedIssuesOption === "cancelled by delivery person"
								}
								onChange={() =>
									setSelectedIssuesOption("cancelled by delivery person")
								}
							/>
							{/* <Form.Check
                type="radio"
                label="other issues"
                value="other issues"
                checked={selectedIssuesOption === 'other issues'}
                onChange={() => setSelectedIssuesOption('other issues')}
              /> */}

							<input
								style={{ padding: ".2rem" }}
								placeholder="if there is any other issues"
								onChange={(e) => setSelectedIssuesOption(e.target.value)}
								className="ms-4 my-1 text-gray"
							></input>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => {
							setShowIssuesModal(false);
							setSelectedInvoiceNumber(null);
							setSelectedIssuesOption(null);
						}}
					>
						Close
					</Button>
					<Button variant="primary" onClick={handleIssuesSubmit}>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>

			{/* Payment Options Modal */}
			<Modal
				show={showAlreadyPaidModal}
				onHide={() => {
					setShowAlreadyPaidModal(false);
					setSelectedInvoiceNumber(null);
				}}
			>
				<Modal.Header>
					<Modal.Title>Choose Payment Option</Modal.Title>
				</Modal.Header>
				<Modal.Body>ALREADY PAID</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => {
							setShowAlreadyPaidModal(false);
							setSelectedInvoiceNumber(null);
						}}
					>
						Close
					</Button>
					<Button variant="primary" onClick={handleAlreadyPaidSubmit}>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>

			{/* show cod payment options */}

			<Modal
				show={showPaymentModal}
				onHide={() => {
					setShowPaymentModal(false);
					setSelectedInvoiceNumber(null);
				}}
			>
				<Modal.Header>
					<Modal.Title>Choose Payment Option</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="paymentOptions">
							<Form.Check
								type="radio"
								label="Pay by cash"
								value="cash"
								checked={selectedCodOption === "cash"}
								onChange={() => setSelectedCodOption("cash")}
							/>
							<Form.Check
								type="radio"
								label="Pay by UPI"
								value="upi"
								checked={selectedCodOption === "upi"}
								onChange={() => setSelectedCodOption("upi")}
							/>
							<Form.Check
								type="radio"
								label="Pay by Card"
								value="card"
								checked={selectedCodOption === "card"}
								onChange={() => setSelectedCodOption("card")}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => {
							setShowPaymentModal(false);
							setSelectedInvoiceNumber(null);
							setSelectedCodOption(null);
						}}
					>
						Close
					</Button>
					<Button variant="primary" onClick={handlePaidSubmit}>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default Orders;
