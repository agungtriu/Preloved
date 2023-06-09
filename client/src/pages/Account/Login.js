import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../axios/accountAxios";

const Login = (props) => {
  const [form, setForm] = useState({
    key: "",
    password: "",
  });

  const { loginCbHandler } = props;

  const loginHandler = (result) => {
    loginCbHandler(result);
  };

  const navigation = useNavigate();

  const submitHandler = () => {
    login(form, (user) => {
      if (user.status) {
        loginHandler(user);
        navigation("/");
      }
    });
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-lg-5 col-md-7 mt-5">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header">
                <h3 className="font-weight-light my-4 mx-3 text-center">
                  Login
                </h3>
              </div>
              <div className="card-body">
                <form>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="username"
                      type="text"
                      placeholder="Email or Username"
                      value={form.key}
                      onChange={(e) =>
                        setForm({ ...form, key: e.target.value })
                      }
                    />
                    <label htmlFor="username">Email or Username</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="d-flex align-items-center justify-content-center mt-4 mb-0">
                    <Link
                      className="btn btn-success"
                      onClick={() => submitHandler()}
                    >
                      Login
                    </Link>
                  </div>
                  <p className="text-center m-3">
                    Don't have Account?
                    <Link
                      className="link-success text-decoration-none ms-2"
                      to="/register"
                    >
                      Register
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
