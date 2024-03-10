// AdvancedSearchModal.js
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

function AdvancedSearchModal({ show, onHide }) {
  return (
    <Modal className="ms_font-color-modal" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button className="ms_btn-secondary" onClick={onHide}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
AdvancedSearchModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default AdvancedSearchModal;
