import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AiOutlineFolderOpen, AiOutlineLogout } from "react-icons/ai";
import { images } from "../images";
const Navbar = (props) => {
  const { loginStatus, loginCbHandler } = props;
  const [username, setUsername] = useState();
  const logoutHandler = () => {
    localStorage.clear();
    loginCbHandler({ status: false, data: {} });
    Swal.fire("Logout", "Logout successful", "success");
  };

  useEffect(() => {
    setUsername(loginStatus.data.username);
  }, [loginStatus.data.username]);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={images.logo} alt="logo" style={{ width: "30px" }} className="d-inline me-1"/>Preloved
          </Link>
          <div className="dropdown">
            <div
              className="mt-3"
              id="dropdownMenuButton"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <p>Hi, {username}</p>
            </div>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <Link className="dropdown-item" to="/myitems">
                  <AiOutlineFolderOpen />
                  <span className="ms-3">My Items</span>
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to={"/"}
                  onClick={() => logoutHandler()}
                >
                  <AiOutlineLogout />
                  <span className="ms-3">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
