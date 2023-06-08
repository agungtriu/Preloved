import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getItems } from "../../axios/itemAxios";
import ReactLoading from "react-loading";
import { Item, ModalAddItem } from "../../components";

const HomeItems = () => {
  const [items, setItems] = useState([]);
  const [filterItems, setFilterItems] = useState([]);
  const [done, setDone] = useState(false);
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ItemPerPage] = useState(8);

  const location = useLocation();

  useEffect(() => {
    getItems((result) => {
      setItems(result);
      setFilterItems(result);
      setDone(true);
      setCurrentPage(1);
    });
  }, [location.key]);

  const searchHandler = (key, data) => {
    if (key.length > 0) {
      setFilterItems(
        data.filter((item) =>
          item.name.toLowerCase().includes(key.toLowerCase())
        )
      );
    } else {
      setFilterItems(data);
    }
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * ItemPerPage;
  const indexOfFirstItem = indexOfLastItem - ItemPerPage;
  const currentItems = filterItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (num) => {
    setCurrentPage(num);
  };

  return (
    <>
      <div className="container main-content">
        <div className="row">
          <div className="col">
            <button
              className="btn btn-success btn-sm"
              onClick={() => {
                setShow(true);
              }}
            >
              Add Item
            </button>
          </div>
          <div className="col">
            <input
              className="form-control ms-auto"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ width: "200px" }}
              onChange={(e) => searchHandler(e.target.value, items)}
            />
          </div>
        </div>
        <div className="row">
          {!done ? (
            <ReactLoading
              className="position-absolute top-50 start-50 translate-middle"
              type={"spin"}
              color={"#000000"}
              height={100}
              width={100}
            />
          ) : currentItems.length > 0 ? (
            currentItems.map((item) => {
              return <Item item={item} page={"home"}></Item>;
            })
          ) : (
            <p className="text-center mt-5">Not found!</p>
          )}
        </div>
        <div className="pagination-bottom">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {Array.from(
                { length: Math.ceil(filterItems.length / ItemPerPage) },
                (_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <>
                      <li key={pageNumber} className="page-item">
                        <button
                          onClick={() => paginate(pageNumber)}
                          className="page-link"
                        >
                          {pageNumber}
                        </button>
                      </li>
                    </>
                  );
                }
              )}
            </ul>
          </nav>
        </div>
      </div>
      <ModalAddItem
        page={"home"}
        show={show}
        onHide={() => setShow(false)}
      ></ModalAddItem>
    </>
  );
};

export default HomeItems;
