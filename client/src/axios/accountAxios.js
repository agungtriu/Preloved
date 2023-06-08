import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl } from "../config/config";

const URL = baseUrl + "/accounts";

const register = async (form, cb) => {
  try {
    if (form.name === "") {
      Swal.fire("Register", "Name can not be empty", "error");
      return;
    }

    if (form.username === "") {
      Swal.fire("Register", "Username can not be empty", "error");
      return;
    }

    if (form.username.includes(" ")) {
      Swal.fire("Register", "Invalid username format", "error");
      return;
    }

    if (form.email === "") {
      Swal.fire("Register", "Email can not be empty", "error");
      return;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(form.email)) {
      Swal.fire("Register", "Invalid email address", "error");
      return;
    }

    if (form.password === "") {
      Swal.fire("Register", "Password can not be empty", "error");
      return;
    }

    if (form.confirmPassword === "") {
      Swal.fire("Register", "Confirm Password can not be empty", "error");
      return;
    }

    if (form.password !== form.confirmPassword) {
      Swal.fire("Register", "Pasword and Confirm Password not match", "error");
      return;
    }

    const responseRegister = await axios({
      method: "POST",
      url: URL + "/register",
      data: form,
    });

    Swal.fire("Register", responseRegister.data.message, "success");
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

const login = async (form, cb) => {
  try {
    if (form.key === "") {
      Swal.fire("Login", "Username or Email can not be empty", "error");
      return;
    }

    if (form.password === "") {
      Swal.fire("Login", "Password can not be empty", "error");
      return;
    }

    const responseLogin = await axios({
      method: "POST",
      url: URL + "/login",
      data: form,
    });

    if (responseLogin.data.status) {
      Swal.fire("Login", responseLogin.data.message, "success");
      localStorage.setItem(
        "access_token",
        responseLogin.data.data.access_token
      );
      localStorage.setItem("id", responseLogin.data.data.id);
      localStorage.setItem("username", responseLogin.data.data.username);
      localStorage.setItem("name", responseLogin.data.data.name);
      cb(responseLogin.data);
    }
  } catch (error) {
    if (error.response.status === 500) {
      Swal.fire("Error!", error.response.data.error.errors[0].message, "error");
    } else {
      Swal.fire("Error!", error.response.data.message, "error");
    }
  }
};

export { register, login };
