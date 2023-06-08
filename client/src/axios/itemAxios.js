import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl } from "../config/config";

const URL = baseUrl + "/items/";

const add = async (form, cb) => {
  try {
    const responseAdd = await axios({
      method: "POST",
      url: URL + "add",
      data: form,
      headers: {
        "Content-Type": "multipart/form-data",
        access_token: localStorage.access_token,
      },
    });
    Swal.fire("Add Item", responseAdd.data.message, "success");
    cb(true);
  } catch (error) {
    if (error.response.status === 500) {
      Swal.fire("Error!", error.response.data.error.errors[0].message, "error");
    } else {
      Swal.fire("Error!", error.response.data.message, "error");
    }
    cb(false);
  }
};

const getItems = async (cb) => {
  try {
    const responseItems = await axios({
      method: "GET",
      url: URL,
      headers: {
        access_token: localStorage.access_token,
      },
    });
    cb(responseItems.data.data);
  } catch (error) {
    if (error.response.status === 500) {
      Swal.fire("Error!", error.response.data.error.errors[0].message, "error");
    } else {
      Swal.fire("Error!", error.response.data.message, "error");
    }
  }
};

const getItemsById = async (cb) => {
  try {
    const responseItems = await axios({
      method: "GET",
      url: URL + "/" + localStorage.id,
      headers: {
        access_token: localStorage.access_token,
      },
    });
    cb(responseItems.data.data);
  } catch (error) {
    if (error.response.status === 500) {
      Swal.fire("Error!", error.response.data.error.errors[0].message, "error");
    } else {
      Swal.fire("Error!", error.response.data.message, "error");
    }
  }
};

const editNoImage = async (form, id, cb) => {
  try {
    const responseEdit = await axios({
      method: "PUT",
      url: URL + "/edit/" + id,
      data: form,
      headers: {
        access_token: localStorage.access_token,
      },
    });
    Swal.fire("Edit Item", responseEdit.data.message, "success");
    cb(true);
  } catch (error) {
    if (error.response.status === 500) {
      Swal.fire("Error!", error.response.data.error.errors[0].message, "error");
    } else {
      Swal.fire("Error!", error.response.data.message, "error");
    }
    cb(false);
  }
};

const editWithImage = async (form, id, cb) => {
  try {
    const responseEdit = await axios({
      method: "PUT",
      url: URL + "/edit/image/" + id,
      data: form,
      headers: {
        "Content-Type": "multipart/form-data",
        access_token: localStorage.access_token,
      },
    });
    Swal.fire("Edit Item", responseEdit.data.message, "success");
    cb(true);
  } catch (error) {
    if (error.response.status === 500) {
      Swal.fire("Error!", error.response.data.error.errors[0].message, "error");
    } else {
      Swal.fire("Error!", error.response.data.message, "error");
    }
    cb(false);
  }
};

const remove = async (id, cb) => {
  try {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const responseRemove = await axios({
          method: "GET",
          url: URL + "/delete/" + id,
          headers: {
            access_token: localStorage.access_token,
          },
        });
        cb(true);
        Swal.fire("Delete", `${responseRemove.data.message}`, "success");
      }
    });
  } catch (error) {
    if (error.response.status === 500) {
      Swal.fire("Error!", error.response.data.error.errors[0].message, "error");
    } else {
      Swal.fire("Error!", error.response.data.message, "error");
    }
    cb(false);
  }
};

export { add, getItems, getItemsById, editNoImage, editWithImage, remove };
