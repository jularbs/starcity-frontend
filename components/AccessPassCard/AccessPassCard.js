import "./styles.scss";
import { useEffect, useRef } from "react";
import Head from "next/head";

const AccessPassCard = ({ data, index, classNames }) => {
  const qrOptions = {
    width: 250,
    height: 250,
    data: data.accessToken,
    margin: 5,
    qrOptions: {
      typeNumber: "4",
      mode: "Byte",
      errorCorrectionLevel: "H",
    },
    imageOptions: {
      hideBackgroundDots: false,
      imageSize: 0.5,
      margin: 0,
    },
    dotsOptions: {
      type: "classy-rounded",
      gradient: {
        type: "linear",
        rotation: 0,
        colorStops: [
          {
            offset: 0,
            color: "#ffbd24",
          },
          {
            offset: 1,
            color: "#ffdc33",
          },
        ],
      },
    },
    backgroundOptions: {
      color: "#ffffff",
    },
    image: `${process.env.DOMAIN}/spc_logo.png`,
    dotsOptionsHelper: {
      colorType: {
        single: true,
        gradient: false,
      },
      gradient: {
        linear: true,
        radial: false,
        color1: "#6a1a4c",
        color2: "#6a1a4c",
        rotation: "0",
      },
    },
    cornersSquareOptions: {
      type: "dot",
      color: "#ffbd24",
      gradient: null,
    },
    cornersSquareOptionsHelper: {
      colorType: {
        single: true,
        gradient: false,
      },
      gradient: {
        linear: true,
        radial: false,
        color1: "#000000",
        color2: "#000000",
        rotation: "0",
      },
    },
    cornersDotOptions: {
      type: "",
      color: "#ffbd24",
    },
    cornersDotOptionsHelper: {
      colorType: {
        single: true,
        gradient: false,
      },
      gradient: {
        linear: true,
        radial: false,
        color1: "#000000",
        color2: "#000000",
        rotation: "0",
      },
    },
    backgroundOptionsHelper: {
      colorType: {
        single: true,
        gradient: false,
      },
      gradient: {
        linear: true,
        radial: false,
        color1: "#ffffff",
        color2: "#ffffff",
        rotation: "0",
      },
    },
  };

  const canvas = useRef(null);

  const downloadQRcode = () => {
    let qrCode = new window.QRCodeStyling(qrOptions);
    qrCode.download({
      name: `${index}-${data.ticketId.name}`,
      extension: "jpg",
    });
  };
  useEffect(() => {
    let qrCode = new window.QRCodeStyling(qrOptions);
    qrCode.append(canvas.current);
    // qrCode.download({ name: "qr", extension: "svg" });
  }, []);

  return (
    <div className={`access-pass-card ${classNames}`}>
      <h3 className="ticket-name">{`#${index} ${data.ticketId.name}`}</h3>
      <div className="text-center ticket-token">
        <small>{data.accessToken}</small>
      </div>
      {/* <img src={data.QRcode.location}></img> */}
      <div ref={canvas} className="d-flex justify-content-center mb-4"></div>

      <div className="send-buttons">
        <button className="btn btn-block mb-2 btn-dl" onClick={downloadQRcode}>
          Download
        </button>

        <button className="btn btn-block mb-2 btn-viber">Send via Viber</button>
        <button className="btn btn-block btn-fbm">Send via FB Messenger</button>
      </div>
    </div>
  );
};

export default AccessPassCard;
