import "./styles.scss";
import ReactPlayer from "react-player";
import TicketPortal from "../TicketPortal/TicketPortal";
import { useState } from "react";

const MainNavigation = () => {
  const [ticketPortalActive, setTicketPortalActive] = useState(false);

  return (
    <div className="main-navigation-container">
      <TicketPortal
        active={ticketPortalActive}
        setActive={setTicketPortalActive}
      />
      <div className="react-player">
        <ReactPlayer
          url="/splash_tvc.webm"
          width="100%"
          playing={true}
          //   controls={true}
          loop={true}
          height="auto"
          muted
        />
      </div>
      <div className="main-navbar w-100 d-flex justify-content-between">
        <div className="logo-placement">
          <img src="/spc_logo.png" className="logo-container" alt="" />
        </div>
        <div className="links-placement d-flex align-items-center">
          <div className="link-item">Home</div>
          <div className="link-item">Rides and Attraction</div>
          <div className="link-item">Group Sales</div>
          <div className="link-item">Directions</div>
          <div
            className="link-item cta"
            onClick={() => {
              setTicketPortalActive(true);
            }}
          >
            Buy Tickets
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
