// App.js
import { useState } from "react";
import AdvancedSearchModal from "./AdvancedSearchModal";
import Button from "react-bootstrap/Button";

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);

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
      <AdvancedSearchModal show={showModal} onHide={() => setShowModal(false)} />
    </>
  );
}

export default App;
