import "./styles.scss";
import { useState } from "react";

const Accordion = ({ className, data, title }) => {
  const [active, setActive] = useState(0);

  const sampleData = [
    {
      name: "Toy Chest",
      description: "3ft and above",
      imageUrl: "/ride1.jpeg",
    },
    {
      name: "Art Adventure",
      description: "General Admission",
      imageUrl: "/ride2.jpeg",
    },
    {
      name: "Ferris Wheel",
      description: "2ft and above",
      imageUrl: "/ride3.jpeg",
    },
  ];

  const showRides = () => {
    return sampleData.map((data, index) => {
      return (
        <div
          className={`ride-details ${index === active ? "active" : ""}`}
          key={index}
          onClick={() => {
            setActive(index);
          }}
          style={{
            backgroundImage: `url('${data.imageUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          //   style={{ backgroundImage: `url('${data.imageUrl}')` }}
        >
          <div className="spacer"></div>
          <div className="details">
            <div className="name">{data.name}</div>
            <div className="h-reqs">{data.description}</div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className={`accordion-container box-shadow__1 ${className}`}>
      <div className="title">{title}</div>
      {showRides()}
      <div className="control d-flex text-uppercase">see more</div>
    </div>
  );
};

export default Accordion;
