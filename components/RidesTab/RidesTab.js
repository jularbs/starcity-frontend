import "./styles.scss";
import Accordion from "../Elements/Accordion/Accordion";

const RidesTab = () => {
  return (
    <div className="rides-tab-container">
      <h2 className="mb-4">
        WORLD CLASS RIDES AND ATTRACTIONS
        <span className="">See More</span>
      </h2>

      <div className="ride-cards-container d-flex justify-content-around">
        <Accordion className="card-item" title="Kiddie Rides"></Accordion>
        <Accordion className="card-item" title="Extreme Rides"></Accordion>
        <Accordion className="card-item" title="Adult Rides"></Accordion>
      </div>
    </div>
  );
};

export default RidesTab;
