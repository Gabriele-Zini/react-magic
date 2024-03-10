import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const params = {
      pageSize: 20,
      page: page,
      count: 20,
      name: inputValue,
      contains: "imageUrl",
    };
    const fetchData = () => {
      axios
        .get(`https://api.magicthegathering.io/v1/cards?`, { params })
        .then((res) => {
          setCards(res.data.cards);
          console.log(res.data.cards);
        })
        .catch((error) => {
          console.error("Error fetching cards:", error);
        })
        .finally(() => setLoading(false));
    };
    fetchData();
  }, [page, inputValue]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
      <div className="container my-5">
        <div className="row gap-4 m-4 align-items-center justify-content-between">
          {/* pagination */}
          <div className="d-flex gap-4 m-4 align-items-center justify-content-center col-12 col-md-6 col-lg-4">
            <button
              className="btn btn-primary"
              onClick={prevPage}
              disabled={page === 1}
            >
              prev
            </button>
            <p className="m-0">Page: {page}</p>
            <button
              className="btn btn-primary"
              onClick={nextPage}
              disabled={cards.length < 20}
            >
              next
            </button>
          </div>
          <div className="col-12 col-md-10 col-lg-4 d-flex gap-3 align-items-center">
            <label htmlFor="">search</label>
            <input
              className="form-control"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue()}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  setInputValue(e.target.value);
                  setPage(1);
                }
              }}
            />
          </div>
        </div>
        {loading && (
          <div
            className="d-flex justify-content-center text-primary align-items-center" /* style={{height:'30vh'}} */
          >
            <div
              className="spinner-border"
              role="status"
              style={{ height: "4rem", width: "4rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* card */}
        {!loading && (
          <div className="row justify-content-start align-items-center g-5">
            {cards.map((card) =>
              card.imageUrl ? (
                <div
                  key={card.id}
                  className="col-12 col-md-6 col-lg-3 d-flex justify-content-center"
                >
                  <div
                    className=" w-100 py-5 text-center card bg-light d-flex justify-content-center align-items-center col-12 col-md-8 col-lg-5 mx-auto"
                    style={{ height: "450px" }}
                  >
                    <img
                      style={{ width: "200px" }}
                      src={card.imageUrl}
                      alt=""
                    />
                    <div className="py-3 px-2 ms_font-size">
                      <p className="fw-bold m-0">{card.name}</p>
                      <p className="m-0">
                        <strong>Type:</strong> {card.type}
                      </p>
                      <p className="m-0">
                        <strong>Rarity:</strong> {card.rarity}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        )}
        {/* card */}

        {cards.length === 0 && !loading && (
          <div className="text-center mt-5 pt-5">
            <p className="fw-bold fs-3">no results found</p>
          </div>
        )}
        <div className="row gap-4 m-4 align-items-center justify-content-between">
          {/* pagination */}
          <div className="d-flex gap-4 m-4 align-items-center justify-content-center col-12 col-md-6 col-lg-4">
            <button
              className="btn btn-primary"
              onClick={prevPage}
              disabled={page === 1}
            >
              prev
            </button>
            <p className="m-0">Page: {page}</p>
            <button
              className="btn btn-primary"
              onClick={nextPage}
              disabled={cards.length < 20}
            >
              next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
