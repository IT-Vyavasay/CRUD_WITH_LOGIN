// @ts-nocheck
import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { Home } from "./components/pages/Home";
import View from "./components/pages/View";
import Edit from "./components/pages/Edit";
import {Login, Ans} from "./components/pages/Login";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import { Home } from "./components/pages/Home";
const App = () => {
  let logged_in = true;
  return (
    <>
    
    <Ans/>

    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/View/:id" element={<View />} />
        <Route path="/Edit/:id" element={<Edit />} />
        <Route path="/Login/:id" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;
