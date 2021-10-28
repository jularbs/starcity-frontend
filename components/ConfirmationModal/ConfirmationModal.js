//TODOS: show loading
import "./styles.scss";
import Modal from "../Elements/Modal/Modal";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSaleDetails } from "../../actions/sale";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const ConfirmationModal = () => {
  const router = useRouter();
  const { refid, payment } = router.query;

  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saleDetails, setSaleDetails] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (refid && payment) {
      setActive(true);
      setLoading(true);
      getSaleDetails(refid)
        .then((data) => {
          console.log(data);
          setSaleDetails(data);
        })
        .catch((error) => setErrorMessage(error.response.data.error));
    }
  }, [router]);

  return (
    <Modal active={active} setActive={setActive}>
      <div className="confirmation-message-container">
        <IoCheckmarkCircleOutline className="icon check" />
        <div className="greeting">Thank you for your purchase!</div>
        <div className="message">
          We've sent you an email with all the details of your order,
          acknowledgement receipt and how to view your tickets.
        </div>

        <div className="details">
          <div>Reference Number</div>
          <div>{saleDetails.refId}</div>
        </div>
        <div className="details">
          <div>Customer Name</div>
          <div>{saleDetails.customerName}</div>
        </div>
        <div className="details">
          <div>Contact Number</div>
          <div>{saleDetails.contactNumber}</div>
        </div>
        <div className="details">
          <div>Email Address</div>
          <div>{saleDetails.emailAddress}</div>
        </div>
        <div className="details mt-3">
          <div>Payment Gateway</div>
          <div>
            {saleDetails.paymentDetails &&
              saleDetails.paymentDetails.option.name}
          </div>
        </div>
        <div className="details">
          <div>Transaction Number</div>
          <div>
            {saleDetails.paymentDetails &&
              saleDetails.paymentDetails.referenceNumber}
          </div>
        </div>
        <div className="details">
          <div>Payment Status</div>
          <div>
            {saleDetails.paymentDetails && saleDetails.paymentDetails.status}
          </div>
        </div>

        <a
          target="_blank"
          href={`${process.env.DOMAIN}/accesspass?s=${saleDetails.salt}&r=${saleDetails.refId}`}
          className="btn btn-success btn-block w-100 mt-4"
        >
          VIEW TICKETS
        </a>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
