import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./App.css";
import { useState } from "react";
import { Account, MainContent, Navbar } from "./components";

function App() {
  const [loginStatus, setLoginStatus] = useState({
    status: false,
    data: {},
  });
  const loginCbHandler = (result) => {
    setLoginStatus(result);
  };

  useState(() => {
    if (localStorage.getItem("access_token")) {
      setLoginStatus({
        status: true,
        data: {
          username: localStorage.username,
        },
      });
    } else {
      setLoginStatus({
        status: false,
        data: {},
      });
    }
  });
  return (
    <>
      <div>
        {loginStatus.status ? (
          <>
            <Navbar
              loginStatus={loginStatus}
              loginCbHandler={loginCbHandler}
            ></Navbar>
            <MainContent></MainContent>
          </>
        ) : (
          <Account loginCbHandler={loginCbHandler}></Account>
        )}
      </div>
    </>
  );
}

export default App;
