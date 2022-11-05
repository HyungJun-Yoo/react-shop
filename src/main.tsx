import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Side from "./components/Side";
import NotFound from "./components/NotFound";

import Fashion from "./pages/Fashion";
import Accessory from "./pages/Accessory";
import Digital from "./pages/Digital";
import Product from "./pages/Product";
import Cart from "./pages/Cart";

import App from "./App";
import "./index.css";
import Toggle from "./components/Toggle";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RecoilRoot>
    <BrowserRouter>
      {/* <input type="checkbox" id="side-menu" className="drawer-toggle" /> */}
      <Toggle />
      <section className="drawer-content">
        <Header />
        <Routes>
          <Route path={"/"} element={<App />} />
          <Route path={"/product/:productId"} element={<Product />} />
          <Route path={"/fashion"} element={<Fashion />} />
          <Route path={"/accessory"} element={<Accessory />} />
          <Route path={"/digital"} element={<Digital />} />
          <Route path={"/cart"} element={<Cart />} />
          <Route path={"*"} element={<NotFound />} />
        </Routes>
        <Footer />
      </section>
      <Side />
    </BrowserRouter>
  </RecoilRoot>
);
