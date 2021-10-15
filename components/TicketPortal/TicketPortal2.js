import "./styles.scss";
import Modal from "../Elements/Modal/Modal";
import { useState, useEffect } from "react";
import { IoAdd, IoRemove } from "react-icons/io5";

import paymaya from "paymaya-js-sdk";
import { createCheckout } from "../../actions/checkout";
import { getTickets } from "../../actions/ticket";

const TicketPortal2 = ({ active, setActive }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [tickets, setTickets] = useState([]);
  const [qty, setQty] = useState(0);

  const [personalDetails, setPersonalDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    contactNumber: "",
  });

  const fetchTickets = () => {
    getTickets().then((data) => {
      console.log(data);
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

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleDetails = (index) => (e) => {
    const { value } = e.target;
    setPersonalDetails({ ...personalDetails, [index]: value });
  };

  useEffect(() => {
    paymaya.init(process.env.PAYMAYA_PK, true);
  }, []);

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
        {currentStep == 3 && (
          <button
            className={`btn btn-block btn-warning next`}
            onClick={handleCheckout}
          >
            CHECKOUT
          </button>
        )}
      </div>
    );
  };

  const showStep1 = () => {
    return (
      <div className="tickets-container">
        <div
          className="ticket-img"
          style={{
            backgroundImage: "url('placeholderticket.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="contents">
          <div className="price-tag">
            <span>₱500</span>
          </div>
          <div className="ticket-name">Ride All You Can</div>
          <div className="ticket-desc">
            Lorem ipsum is placeholder text commonly used in the graphic, print,
            and publishing industries for previewing layouts and visual mockups.
          </div>
          <div className="qty-control">
            <IoRemove
              className="icon"
              onClick={() => {
                if (qty > 0) setQty(qty - 1);
              }}
            />
            <div className="qty">{qty}</div>
            <IoAdd
              className="icon"
              onClick={() => {
                setQty(qty + 1);
              }}
            />
          </div>
          <div className="customer-details">
            <div className="form-group">
              <label for="exampleInputEmail1">Customer Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter first name"
                onChange={handleDetails("firstName")}
                value={personalDetails.firstName}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Contact Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter first name"
                onChange={handleDetails("firstName")}
                value={personalDetails.firstName}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Email Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter first name"
                onChange={handleDetails("firstName")}
                value={personalDetails.firstName}
              />
            </div>
          </div>
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
          <div className="form-group">
            <label for="exampleInputEmail1">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email address"
              onChange={handleDetails("email")}
              value={personalDetails.email}
            />
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Confirm Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Confirm email address"
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
        <div id="iframe-container" />
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
      <div className="ticket-portal-container2">
        {handleSteps()}
        {showButtons()}
      </div>
    </Modal>
  );
};

export default TicketPortal2;