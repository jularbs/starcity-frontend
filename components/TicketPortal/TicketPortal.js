import "./styles.scss";
import Modal from "../Elements/Modal/Modal";

import { IoAdd, IoRemove } from "react-icons/io5";
const TicketPortal = ({ active, setActive }) => {
  const tickets = [
    {
      _id: "13251093421512",
      name: "Ride All You Can",
      description: "Unlimited Day Access",
      price: 470,
    },
    {
      _id: "13251093421512",
      name: "Ride All You Can + Snow World",
      description:
        "Unlimited Day Access + 1 Entry to Snow World. Re-entry to Snow world will incur charges.",
      price: 590,
    },
    {
      _id: "13251093421512",
      name: "Entrance Admission",
      description: "Entry Only",
      price: 60,
    },
  ];

  const showTickets = () => {
    return tickets.map((ticket, index) => {
      return (
        <div className="ticket-item" key={index}>
          <div className="name content">{ticket.name}</div>
          <div className="desc content">{ticket.description}</div>
          <div className="price content">Php {ticket.price}</div>
          <div className="qty content">
            <IoRemove />
            <div>0</div>
            <IoAdd />
          </div>
        </div>
      );
    });
  };
  return (
    <Modal active={active} setActive={setActive}>
      <div className="ticket-portal-container">
        {/* <h2>Buy Tickets</h2> */}
        <div className="tickets-container">
          {showTickets()}
          <div className="ticket-item">
            <div className="name content"></div>
            <div className="desc content"></div>
            <div className="price content">Total</div>
            <div className="qty content">Php 500</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TicketPortal;
