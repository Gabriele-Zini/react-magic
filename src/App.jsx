import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(undefined);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setLoading(true);
    const params = {
      pageSize: 20,
      page: page,
      totalCount: "Total-Count",
      name: inputValue,
      contains: "imageUrl",
    };
    const fetchData = () => {
      axios
        .get(`https://api.magicthegathering.io/v1/cards?`, { params })
        .then((res) => {
          setCards(res.data.cards);
          const totalCount = parseInt(res.headers["total-count"]);
          setTotalCount(totalCount);
          const totalPages = Math.ceil(totalCount / 20);
          setTotalPages(totalPages);
        })
        .catch((error) => {
          console.error("Error fetching cards:", error);
        })
        .finally(() => setLoading(false));
    };
    fetchData();
  }, [page, inputValue, totalCount, totalPages]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const renderPageNumbers = () => {
    const numPagesToShow = 5;
    const pageNumbers = [];
    let startPage;
    let endPage;

    if (totalPages <= numPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else if (page <= Math.ceil(numPagesToShow / 2)) {
      startPage = 1;
      endPage = numPagesToShow;
    } else if (page > totalPages - Math.floor(numPagesToShow / 2)) {
      startPage = totalPages - numPagesToShow + 1;
      endPage = totalPages;
    } else {
      startPage = page - Math.floor(numPagesToShow / 2);
      endPage = page + Math.ceil(numPagesToShow / 2) - 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${i === page ? "active" : ""}`}
          onClick={() => setPage(i)}
        >
          <button className="page-link">{i}</button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <>
      <div className="container my-5">
        <div className="row gap-4 m-4 align-items-center justify-content-between">
          {/* pagination */}
          <div className="d-flex gap-4 align-items-center justify-content-center col-12 col-md-6 col-lg-4 p-0">
            <nav aria-label="Page navigation" className="my-4">
              <ul className="pagination d-flex align-items-center m-0">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={prevPage}
                    aria-label="Previous"
                  >
                    Previous<span aria-hidden="true">&laquo;</span>
                  </button>
                </li>
                {renderPageNumbers()}
                <li
                  className={`page-item ${
                    page === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={nextPage}
                    aria-label="Next"
                  >
                    Next<span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-12 col-md-10 col-lg-3">
            <p className="m-0">
              <strong>Total results:</strong> {totalCount}
            </p>
            <p className="m-0">
              <strong>Total pages:</strong> {totalPages}
            </p>
          </div>
          <div className="col-12 col-md-10 col-lg-4 d-flex gap-3 align-items-center">
            <label htmlFor="">search</label>
            <input
              className="form-control"
              type="text"
              value={inputValue}
              placeholder="simple search"
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
            className="d-flex justify-content-center align-items-center" /* style={{height:'30vh'}} */
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

        {!loading && cards.length > 0 && (
          <div className="row justify-content-start align-items-center g-5">
            {cards.map((card) =>
              card.imageUrl ? (
                <div
                  key={card.id}
                  className="col-12 col-md-6 col-lg-3 d-flex justify-content-center"
                >
                  <div
                    className="shadow w-100 py-5 text-center card bg-light d-flex justify-content-center align-items-center col-12 col-md-8 col-lg-5 mx-auto"
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

        {!loading && cards.length === 0 && (
          <div className="text-center mt-5 pt-5">
            <p className="fw-bold fs-3">No results found</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
