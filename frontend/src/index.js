import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import AuthForm from "./components/AuthForm.jsx";
// import Counter from "./Counter";
// import App from "./App";
// import AuthPage from "./pages/AuthPage";
// import RegisterSecondPage from "./pages/RegisterSecondPage";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import SearchTicket from "./components/SearchTicket";
import Events from "./components/Events";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            {/* <App /> */}
            <Header />
            <SearchTicket />
            <Events />
        </BrowserRouter>
    </React.StrictMode>
);
