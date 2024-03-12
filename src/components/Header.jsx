import { useState } from "react";
import AdvancedSearchModal from "./AdvancedSearchModal";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

function Header({ onSelectedValuesChange }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedValues, setSelectedValues] = useState({}); 

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleApplyFilters = (values) => {
    setSelectedValues(values);
    handleCloseModal(); 
    onSelectedValuesChange(values);
  };

  return (
    <>
      <header className="bg-black border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <img className="logo" src="../../public/img/download.jpeg" alt="" />
          </div>
          <div>
            <Button className="ms_btn-secondary me-5" variant="primary" onClick={handleShowModal}>
              Advanced Search
            </Button>
          </div>
        </div>
      </header>
      <AdvancedSearchModal
        show={showModal}
        onHide={handleCloseModal}
        onApply={handleApplyFilters} 
      />
    </>
  );
}
Header.propTypes = {
  onSelectedValuesChange: PropTypes.func.isRequired,
};


export default Header;
