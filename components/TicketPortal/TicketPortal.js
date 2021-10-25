import "./styles.scss";
import Modal from "../Elements/Modal/Modal";
import { useState, useEffect } from "react";
import { IoAdd, IoRemove } from "react-icons/io5";

import paymaya from "paymaya-js-sdk";
import { createCheckout } from "../../actions/checkout";
import { getTickets } from "../../actions/ticket";
import { getPaymentOptions } from "../../actions/paymentOptions";

import { PayPalButtons } from "@paypal/react-paypal-js";
const TicketPortal = ({ active, setActive }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [tickets, setTickets] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [personalDetails, setPersonalDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    contactNumber: "",
  });

  //PAYPAL STATES
  const [succeeded, setSucceeded] = useState(false);
  const [paypalErrorMessage, setPaypalErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);
  const [billingDetails, setBillingDetails] = useState("");

  useEffect(() => {
    paymaya.init(process.env.PAYMAYA_PK, true);
    fetchTickets();
    fetchPaymentOptions();
  }, []);

  //PAYPAL FUNCTION
  const createOrder = async (data, actions) => {
    const cartItems = tickets
      .filter((ticket) => ticket.qty > 0)
      .map((item) => {
        return { _id: item._id, qty: item.qty };
      });

    const buyerDetails = {
      customerName: `${personalDetails.firstName} ${personalDetails.lastName}`,
      email: personalDetails.confirmEmail,
      contactNumber: personalDetails.contactNumber,
    };

    const checkout = await createCheckout({
      cartItems: cartItems,
      ...buyerDetails,
    });
    console.log(checkout);

    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: checkout.orderTotal,
            },
          },
        ],
        // remove the applicaiton_context object if you need your users to add a shipping address
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order
      .capture()
      .then(function (details) {
        console.log("STATUS: ", details.status);
        console.log("ID: ", details.id);
        const { payer } = details;
        setBillingDetails(payer);
        setSucceeded(true);
      })
      .catch((err) => setPaypalErrorMessage("Something went wrong."));
  };

  const fetchTickets = () => {
    getTickets().then((data) => {
      const availableTickets = data.map((item) => {
        return {
          _id: item._id,
          name: item.name,
          description: item.shortDescription,
          price: item.price,
          qty: 0,
        };
      });

      setTickets(availableTickets);
    });
  };

  const fetchPaymentOptions = () => {
    getPaymentOptions().then((data) => {
      setPaymentOptions(data);
    });
  };

  const handleDetails = (index) => (e) => {
    const { value } = e.target;
    setPersonalDetails({ ...personalDetails, [index]: value });
  };

  const handleCheckout = () => {
    const cartItems = tickets
      .filter((ticket) => ticket.qty > 0)
      .map((item) => {
        return { _id: item._id, qty: item.qty };
      });

    const buyerDetails = {
      customerName: `${personalDetails.firstName} ${personalDetails.lastName}`,
      email: personalDetails.confirmEmail,
      contactNumber: personalDetails.contactNumber,
    };

    createCheckout({ cartItems: cartItems, ...buyerDetails }).then((data) => {
      const cart = {
        totalAmount: {
          value: data.orderTotal,
          currency: "PHP",
        },
        buyer: {
          firstName: personalDetails.firstName,
          lastName: personalDetails.lastName,
          contact: {
            phone: personalDetails.contactNumber,
            email: personalDetails.confirmEmail,
          },
        },
        items: tickets
          .filter((ticket) => ticket.qty > 0)
          .map((item) => {
            return {
              name: item.name,
              quantity: item.qty,
              totalAmount: {
                value: item.price * item.qty,
              },
            };
          }),
        redirectUrl: {
          success: `${process.env.SPC_API}/v1/payment/success/paymaya/${data.refId}`,
          failure: `${process.env.SPC_API}/v1/payment/fail/paymaya/${data.refId}`,
          cancel: `${process.env.SPC_API}/v1/payment/cancel/paymaya/${data.refId}`,
        },
        requestReferenceNumber: data.refId,
        metadata: {},
      };
      paymaya.createCheckout(cart).then((data) => {
        console.log(data);
      });
    });
  };

  const handleAddItem = (item) => {
    let newCounter = tickets.map((row) => {
      if (item._id === row._id) {
        return { ...row, qty: row.qty + 1 };
      } else {
        return row;
      }
    });

    setTickets(newCounter);
  };

  const handleRemoveItem = (item) => {
    let newCounter = tickets.map((row) => {
      if (item._id === row._id) {
        if (row.qty == 0) return row;
        return { ...row, qty: row.qty - 1 };
      } else {
        return row;
      }
    });

    setTickets(newCounter);
  };

  const computeTotal = () => {
    const total = tickets.reduce((prev, current) => {
      const currentItemTotal = current.qty * current.price;

      return prev + currentItemTotal;
    }, 0);
    return total;
  };

  const showTickets = () => {
    return tickets.map((ticket, index) => {
      return (
        <div className="ticket-item" key={index}>
          <div className="name content">{ticket.name}</div>
          <div className="desc content">{ticket.description}</div>
          <div className="price content">Php {ticket.price}</div>
          <div className="qty content">
            <IoRemove
              className="icon"
              onClick={() => handleRemoveItem(ticket)}
            />
            <div>{ticket.qty}</div>
            <IoAdd className="icon" onClick={() => handleAddItem(ticket)} />
          </div>
        </div>
      );
    });
  };

  const showTicker = () => {
    return (
      <div className="ticker-container">
        <div className="ticker-item">
          <div className="label">Step 1</div>
          <div className="description">Ticket Details</div>
        </div>
        <div className="ticker-item">
          <div className="label">Step 2</div>
          <div className="description">Personal Details</div>
        </div>
        <div className="ticker-item">
          <div className="label">Step 3</div>
          <div className="description">Order Summary</div>
        </div>
      </div>
    );
  };

  const handleStepUp = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleStepDown = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const showCheckoutButton = () => {
    return paymentOptions.map((po, i) => {
      return (
        <button
          className={`btn btn-block btn-warning mb-2 next`}
          onClick={handleCheckout}
          key={i}
        >
          Pay with {po.name}
        </button>
      );
    });
  };

  const showButtons = () => {
    return (
      <div className="buttons-container">
        <button
          className={`btn btn-block btn-secondary prev ${
            currentStep == 1 ? "hide-stepper" : ""
          }`}
          onClick={handleStepDown}
        >
          PREVIOUS
        </button>
        <button
          className={`btn btn-block btn-success next ${
            currentStep == 3 ? "hide-stepper" : ""
          }`}
          onClick={handleStepUp}
        >
          NEXT
        </button>
      </div>
    );
  };

  const showStep1 = () => {
    return (
      <div className="tickets-container">
        {showTickets()}
        <div className="ticket-item">
          <div className="total-label">Total</div>
          <div className="total-content">Php {computeTotal()}</div>
        </div>
      </div>
    );
  };

  const showStep2 = () => {
    return (
      <div className="p-details-container">
        <div className="form-container">
          <div className="form-group">
            <label for="exampleInputEmail1">First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter first name"
              onChange={handleDetails("firstName")}
              value={personalDetails.firstName}
            />
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter last name"
              onChange={handleDetails("lastName")}
              value={personalDetails.lastName}
            />
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Contact Number</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter contact number"
              onChange={handleDetails("contactNumber")}
              value={personalDetails.contactNumber}
            />
          </div>
          {/* <div className="form-group">
            <label for="exampleInputEmail1">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email address"
              onChange={handleDetails("email")}
              value={personalDetails.email}
            />
          </div> */}
          <div className="form-group">
            <label for="exampleInputEmail1">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email address"
              onChange={handleDetails("confirmEmail")}
              value={personalDetails.confirmEmail}
            />
          </div>
        </div>
      </div>
    );
  };

  const showStep3 = () => {
    return (
      <div className="summary-container" id="credit-card-form">
        <PayPalButtons
          style={{
            color: "blue",
            // shape: "pill",
            label: "pay",
            tagline: false,
            layout: "horizontal",
          }}
          createOrder={createOrder}
          onApprove={onApprove}
        />
        {showCheckoutButton()}
      </div>
    );
  };

  const handleSteps = () => {
    if (currentStep == 1) return showStep1();
    if (currentStep == 2) return showStep2();
    if (currentStep == 3) return showStep3();
  };

  return (
    <Modal active={active} setActive={setActive}>
      <div className="ticket-portal-container">
        <h2>Buy Tickets</h2>
        {showTicker()}
        {handleSteps()}

        {showButtons()}
      </div>
    </Modal>
  );
};

export default TicketPortal;
