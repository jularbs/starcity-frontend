import "./styles.scss";

const Modal = ({ children, active, setActive }) => {
  return (
    <>
      <div className={`custom-modal-container ${active ? "active" : ""}`}>
        <div className="modal-view ">
          <div
            className="control"
            onClick={() => {
              setActive(false);
            }}
          >
            x
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
