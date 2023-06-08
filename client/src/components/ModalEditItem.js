import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { editNoImage, editWithImage } from "../axios/itemAxios";
import { Modal } from "react-bootstrap";
import { imageUrl } from "../config/config";

const ModalEditItem = (props) => {
  const { page, show, onHide, item } = props;
  const [previewImage, setPreviewImage] = useState(imageUrl + item.image);

  const [form, setForm] = useState({
    id: item.id,
    image: item.image,
    name: item.name,
    purchasePrice: +item.purchasePrice,
    sellingPrice: +item.sellingPrice,
    stock: +item.stock,
  });

  const [file, setFile] = useState(null);

  const navigate = useNavigate();
  const submitHandler = (form) => {
    if (form.name === "") {
      Swal.fire("Add Item", "Name cannot be empty", "error");
      return;
    }

    if (file === null) {
      editNoImage(form, form.id, (status) => {
        if (status) {
          setPreviewImage("");
          onHide();
          page === "myitems" ? navigate("/myitems") : navigate("/");
        }
      });
    } else {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("name", form.name);
      formData.append("purchasePrice", form.purchasePrice);
      formData.append("sellingPrice", form.sellingPrice);
      formData.append("stock", form.stock);

      editWithImage(formData, form.id, (status) => {
        if (status) {
          onHide();
          page === "myitems" ? navigate("/myitems") : navigate("/");
        }
      });
    }
  };

  const handleImageUpload = (e) => {
    if (e.target.files.length > 0) {
      if (e.target.files[0].size > 102400) {
        Swal.fire("Add Item", "File is too big, Maximum size 100KB!", "error");
        setPreviewImage("");
        return;
      } else {
        setFile(e.target.files[0]);
        setForm({ ...form, image: e.target.files[0].name });

        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
          setPreviewImage(e.target.result);
        };

        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        className="modal fade"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {previewImage !== "" ? (
              <div className="img-items m-3">
                <p>
                  <small>*Maximum 100 KB</small>
                </p>
                <img
                  src={previewImage}
                  className="rounded"
                  alt="Preview"
                  style={{ maxWidth: "300px" }}
                />
              </div>
            ) : null}
            <div className="my-3">
              <input
                type="file"
                className="form-control"
                id="formFile"
                accept="image/png, image/jpg"
                onChange={(e) => {
                  handleImageUpload(e);
                }}
              />
            </div>
            <div className="form-floating mb-3">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="form-control"
                type="text"
                id="floatingName"
              />
              <label htmlFor="floatingName">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={form.purchasePrice}
                onChange={(e) =>
                  setForm({ ...form, purchasePrice: e.target.value })
                }
                type="number"
                className="form-control"
                id="floatingPurchase"
              />
              <label htmlFor="floatingPurchase">Purchase price</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={form.sellingPrice}
                onChange={(e) =>
                  setForm({ ...form, sellingPrice: e.target.value })
                }
                type="number"
                className="form-control"
                id="floatingSellingPrice"
              />
              <label htmlFor="floatingSellingPrice">Selling price</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                type="number"
                className="form-control"
                id="floatingStock"
              />
              <label htmlFor="floatingStock">Stock</label>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-success"
            type="button"
            onClick={() => submitHandler(form)}
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditItem;
