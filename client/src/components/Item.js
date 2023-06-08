import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { imageUrl } from "../config/config";
import rupiahFormatter from "../helpers/rupiahFromatter";
import { remove } from "../axios/itemAxios";
import ModalEditItem from "./ModalEditItem";
import { useState } from "react";
import { Button } from "react-bootstrap";

const Item = (props) => {
  const { item, page } = props;
  const [show, setShow] = useState(false);
  const [editItem, setEditItem] = useState(item);

  const navigate = useNavigate();

  const deleteHandler = (id) => {
    remove(id, (status) => {
      if (status) {
        page === "myitem" ? navigate("/myitem") : navigate("/");
      }
    });
  };

  const editHandler = (data) => {
    console.log(data);
    setShow(true);
    setEditItem(data);
  };
  return (
    <>
      <div className="col-sm-6 col-md-5 col-lg-4 col-xl-3 mt-2" key={item.id}>
        <div className="card mb-4 position-relative">
          <div className="img-items">
            <img
              className="img-card-top"
              src={imageUrl + item.image}
              alt={item.image}
            />
          </div>
          <div className="card-body">
            <div className="label-top">
              <h4>{item.name}</h4>
            </div>

            <div className="row">
              <div className="col">Stock</div>
              <div className="col h6">: {item.stock}</div>
            </div>
            <div className="row">
              <div className="col">Purchase price</div>
              <div className="col">: {rupiahFormatter(item.purchasePrice)}</div>
            </div>

            <div className="row">
              <div className="col">Selling price</div>
              <div className="col">: {rupiahFormatter(item.sellingPrice)}</div>
            </div>

            {+item.accountId === +localStorage.id ? (
              <span className="position-absolute top-0 end-0">
                <div className="dropdown">
                  <div
                    className="me-2 mt-2"
                    id="dropdownMenuButton"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <HiOutlineDotsVertical />
                  </div>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li>
                      <Link
                        className="dropdown-item "
                        onClick={() => deleteHandler(+item.id)}
                      >
                        <AiOutlineDelete />
                        <span className="m-3">Delete</span>
                      </Link>
                    </li>
                    <li>
                      <Button
                        className="dropdown-item"
                        onClick={() => editHandler(item)}
                      >
                        <AiOutlineEdit />
                        <span className="ms-3">Edit</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </span>
            ) : null}
          </div>
        </div>
      </div>
      {show ? (
        <ModalEditItem
          page={page}
          show={show}
          onHide={() => setShow(false)}
          item={editItem}
        ></ModalEditItem>
      ) : null}
    </>
  );
};

export default Item;
