import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import axios from "axios";
import { useState, useEffect } from "react";

function AdvancedSearchModal({ show, onHide, onApply }) {
  const [types, setTypes] = useState([]);
  const [formats, setFormats] = useState([]);
  const [superTypes, setSuperTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const cachedTypes = localStorage.getItem("cachedTypes");
      const cachedFormats = localStorage.getItem("cachedFormats");
      const cachedSuperTypes = localStorage.getItem("cachedSuperTypes");

      if (!cachedTypes) {
        try {
          const typesResponse = await axios.get(
            "https://api.magicthegathering.io/v1/types"
          );
          setTypes(typesResponse.data.types);
          localStorage.setItem(
            "cachedTypes",
            JSON.stringify(typesResponse.data.types)
          );
        } catch (error) {
          console.error("Error fetching types:", error);
        }
      } else {
        setTypes(JSON.parse(cachedTypes));
      }

      if (!cachedFormats) {
        try {
          const formatsResponse = await axios.get(
            "https://api.magicthegathering.io/v1/formats"
          );
          setFormats(formatsResponse.data.formats);
          localStorage.setItem(
            "cachedFormats",
            JSON.stringify(formatsResponse.data.formats)
          );
        } catch (error) {
          console.error("Error fetching formats:", error);
        }
      } else {
        setFormats(JSON.parse(cachedFormats));
      }

      if (!cachedSuperTypes) {
        try {
          const superTypesResponse = await axios.get(
            "https://api.magicthegathering.io/v1/supertypes"
          );
          setSuperTypes(superTypesResponse.data.supertypes);
          localStorage.setItem(
            "cachedSuperTypes",
            JSON.stringify(superTypesResponse.data.supertypes)
          );
        } catch (error) {
          console.error("Error fetching supertypes:", error);
        }
      } else {
        setSuperTypes(JSON.parse(cachedSuperTypes));
      }
    };

    fetchData();
  }, []);

  const renderOptions = (options) => {
    return ["", ...options].map((option, index) => (
      <option value={option} key={index}>
        {option}
      </option>
    ));
  };
  const handleApply = () => {
    const selectedValues = {
      types: document.getElementById("types").value,
      formats: document.getElementById("formats").value,
      superTypes: document.getElementById("supertypes").value,
    };
    onApply(selectedValues);
    onHide(); 
  };

  return (
    <Modal className="ms_font-color-modal" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Advanced Search</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <label className="my-3" htmlFor="types">
            Types
          </label>
          <select className="form-select" name="types" id="types">
            {renderOptions(types)}
          </select>
        </div>
        <div className="my-3">
          <label className="my-3" htmlFor="formats">
            Formats
          </label>
          <select className="form-select" name="formats" id="formats">
            {renderOptions(formats)}
          </select>
        </div>
        <div className="my-3">
          <label className="my-3" htmlFor="supertypes">
            Supertypes
          </label>
          <select className="form-select" name="supertypes" id="supertypes">
            {renderOptions(superTypes)}
          </select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
     <Button className="ms_btn-secondary" onClick={handleApply}>
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

AdvancedSearchModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
};

export default AdvancedSearchModal;
