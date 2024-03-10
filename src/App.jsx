import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const params = {
      pageSize: 20,
      page: page,
      count: 20,
      name:inputValue,
    };
    const fetchData = () => {
      axios
        .get(`https://api.magicthegathering.io/v1/cards?`, { params })
        .then((res) => {
          setCards(res.data.cards);
          console.log(res.data);
        })
        .catch((error) => {
          console.error("Error fetching cards:", error);
        });
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
        <div className="d-flex gap-4 m-4 align-items-center justify-content-between">
          <div className="d-flex gap-4 m-4 align-items-center justify-content-center">
            <button
              className="btn btn-primary"
              onClick={prevPage}
              disabled={page === 1}
            >
              prev
            </button>
            <p className="m-0">Page: {page}</p>
            <button className="btn btn-primary" onClick={nextPage}>
              next
            </button>
          </div>
          <div className="d-flex gap-3 align-items-center">
            <label htmlFor="">search</label>
            <input
              className="form-control"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        </div>
        <div className="row justify-content-start align-items-center g-5">
          {cards.map((card) =>
            card.imageUrl ? (
              <div
                key={card.id}
                className="col-12 col-md-6 col-lg-3 d-flex justify-content-center"
              >
                <div
                  className=" w-100 py-5 text-center card bg-light d-flex justify-content-center align-items-center col-12 col-md-8 col-lg-5 mx-auto"
                  style={{ minHeight: "300px" }}
                >
                  <img src={card.imageUrl} alt="" />
                  <div className="py-3">
                    <p className="fw-bold m-0">{card.name}</p>
                    <p className="m-0"> {card.type}</p>
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </>
  );
}

export default App;
