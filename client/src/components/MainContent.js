import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomeItems, MyItems } from "../pages";

const MainContent = () => {
  return (
    <div className="container p-3">
      <Routes>
        <Route path="/" element={<HomeItems></HomeItems>}></Route>
        <Route path="/myitems" element={<MyItems></MyItems>}></Route>
      </Routes>
    </div>
  );
};

export default MainContent;
