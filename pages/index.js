import RidesTab from "../components/RidesTab/RidesTab";
import ConfirmationModal from "../components/ConfirmationModal/ConfirmationModal";
import ReactPlayer from "react-player";
import Layout1 from "../layouts/Layout1";
const IndexPage = () => {
  return (
    <Layout1>
      <ConfirmationModal />
      {/* <div className="react-player" style={{position: "absolute",zIndex: "-1", width: "100%", top: "0"}}>
        <ReactPlayer
          url="/splash_tvc.webm"
          width="100%"
          playing={true}
          //   controls={true}
          loop={true}
          height="auto"
          muted
        />
      </div> */}

      <RidesTab />
    </Layout1>
  );
};
export default IndexPage;
