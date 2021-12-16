import Modal from "react-modal";
import "./modal.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ConfirmationModal = ({
  modalIsOpen,
  toggleModal,
  headerText,
  confirmDetails,
  closeModal,
}) => (
  <Modal
    isOpen={modalIsOpen}
    ariaHideApp={false}
    onRequestClose={toggleModal}
    style={customStyles}
  >
    <h3>{headerText}</h3>
    <div className="footerContainer">
      <button type="button" className="footerBtn" onClick={confirmDetails}>
        Confirm
      </button>
      <button type="button" className="footerBtn" onClick={closeModal}>
        Cancel
      </button>
    </div>
  </Modal>
);

export default ConfirmationModal;
