import React from "react";
import ReactDOM from "react-dom/client";
import GalleryList from "views/GalleryList";
import reportWebVitals from "./reportWebVitals";
import Header from "./components/Header/";
import "styles/index.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "./store";
import Gallery from "views/Gallery";
import Wallet from "views/Wallet";
import Donate from "views/Donate";
import Modal from "components/generics/Modal";
const store = createStore(rootReducer);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Modal />
        <Header />
        <div className="router-wrapper">
          <Routes>
            <Route path="/" element={<GalleryList />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/:id" element={<Gallery />} />
            <Route path="/:id/donate" element={<Donate />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
