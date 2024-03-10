// AdvancedSearchModal.js
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";

function AdvancedSearchModal({ show, onHide }) {
  const [search, setSearch] = useState([]);
  const [types, setTypes] = useState([]);
  const [formats, setFormats] = useState([]);
  const [superTypes, setSuperTypes] = useState([]);
  const fetchData = () => {
    /* types */
    axios
      .get(`https://api.magicthegathering.io/v1/types`)
      .then((res) => {
        console.log(res.data);
        const types = res.data.types;
        setTypes(types);
      })
      .catch((error) => {
        console.error("Error fetching types:", error);
      });

    /* formats; */
    axios
      .get(`https://api.magicthegathering.io/v1/formats`)
      .then((res) => {
        console.log(res.data);
        const formats = res.data.formats;
        setFormats(formats);
      })
      .catch((error) => {
        console.error("Error fetching formats:", error);
      });

    /* supertypes; */
    axios
      .get(`https://api.magicthegathering.io/v1/supertypes `)
      .then((res) => {
        console.log(res.data);
        const superTypes = res.data.supertypes;
        setSuperTypes(superTypes);
      })
      .catch((error) => {
        console.error("Error fetching supertypes:", error);
      });

  };
  fetchData(), [];
//   show types on select
  const showType = () => {
    const typesWithPlaceholder = ["select types", ...types];
    return typesWithPlaceholder.map((type, index) => (
      <option value={type} key={index}>{type}</option>
    ));
  };

//   show formats on select
  const showFormat = () => {
    const typesWithPlaceholder = ["select format", ...formats];
    return typesWithPlaceholder.map((format, index) => (
      <option value={format} key={index}>{format}</option>
    ));
  };

//   show supertypes on select
  const showSuperTypes = () => {
    const typesWithPlaceholder = ["select supertype", ...superTypes];
    return typesWithPlaceholder.map((superType, index) => (
      <option value={superType} key={index}>{superType}</option>
    ));
  };

  return (
    <Modal className="ms_font-color-modal" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* types */}
        <div>
          <label className="my-3" htmlFor="types">
            Types
          </label>
          <select className="form-select" name="types" id="types">
            {showType()}
          </select>
        </div>

        {/* formats */}
        <div className="my-3">
          <label className="my-3" htmlFor="formats">
            Formats
          </label>
          <select className="form-select" name="formats" id="formats">
            {showFormat()}
          </select>
        </div>

        {/* supertypes */}
        <div className="my-3">
          <label className="my-3" htmlFor="supertypes">
            Supertypes
          </label>
          <select className="form-select" name="supertypes" id="supertypes">
            {showSuperTypes()}
          </select>
        </div>

       
      </Modal.Body>
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
