import "./styles.scss";
import Modal from "../Elements/Modal/Modal";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { IoCheckmarkCircleOutline } from "react-icons/io5";

const ConfirmationModal = () => {
  const router = useRouter();
  const { refid, payment } = router.query;

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (refid && payment) setActive(true);
  }, [router]);

  return (
    <Modal active={active} setActive={setActive}>
      <div className="confirmation-message-container">
        <IoCheckmarkCircleOutline className="icon check" />
        <div className="greeting">Thank you for your purchase!</div>
        <div className="message">
          We've sent you an email with all the details of your order. We will
          also send a separate email on how to view your tickets.
        </div>

        <div className="details">
          <div>Reference Number</div>
          <div>{refid}</div>
        </div>
        <div className="details">
          <div>Customer Name</div>
          <div>Ralph Jularbal</div>
        </div>
        <div className="details">
          <div>Contact Number</div>
          <div>09178657533</div>
        </div>
        <div className="details">
          <div>Email Address</div>
          <div>ralphjularbal@yahoo.com</div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
