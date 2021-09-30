import "./styles.scss";

const AccessPassCard = ({ data, index, classNames }) => {
  return (
    <>
      <div className={`access-pass-card ${classNames}`}>
        <h3 className="ticket-name">
          <span>{`#${index} `}</span>
          {`${data.ticketId.name}`}
        </h3>
        <div className="text-center ticket-token">
          <small>{data.accessToken}</small>
        </div>
        <img className="qr-code" src={data.QRcode.location}></img>

        <div className="send-buttons">
          <button className="btn btn-block w-100 mb-2 btn-dl">Download</button>

          <button className="btn btn-block mb-2 btn-viber">
            Send via Viber
          </button>
          <button className="btn btn-block btn-fbm">
            Send via FB Messenger
          </button>
        </div>

        <div className={`tnc ${classNames}`}>
          <div className="header">Terms and Conditions</div>
          <ul>
            <li>
              Take a screenshot of the QR code above in case of slow internet
              connection during admission
            </li>
            <li>
              Print out version of the QR Code is also accepted during admission
            </li>
            <li>
              This e-ticket is proof of purchase on Star Parks Corp, and must be
              presented at the time of admission
            </li>
            <li>
              This e-ticket is non-transferrable and only one entry is valid per
              ticket purchased
            </li>
            <li>
              Tickets are not to be duplicated for the purpose of falsifying
              entry
            </li>
            <li>
              E-tickets scanned on admission are considered void. Stamps are
              provided for re-entry to the park
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AccessPassCard;
