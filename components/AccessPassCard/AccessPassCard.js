import "./styles.scss";
import Head from "next/head";

const AccessPassCard = ({ data, index, classNames }) => {
  return (
    <>
    <div className={`access-pass-card ${classNames}`}>
      <h3 className="ticket-name">{`#${index} ${data.ticketId.name}`}</h3>
      <div className="text-center ticket-token">
        <small>{data.accessToken}</small>
      </div>
      <img className="qr-code" src={data.QRcode.location}></img>

      <div className="send-buttons">
        <button className="btn btn-block mb-2 btn-dl">Download</button>

        <button className="btn btn-block mb-2 btn-viber">Send via Viber</button>
        <button className="btn btn-block btn-fbm">Send via FB Messenger</button>
      </div>
    </div>
    </>
  );
};

export default AccessPassCard;
