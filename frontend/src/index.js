import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AuthForm from "./components/AuthForm.jsx";
import Counter from "./Counter";
import App from "./App";
import AuthPage from "./pages/AuthPage";
import RegisterSecondPage from "./pages/RegisterSecondPage";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        {/* <App /> */}
        <RegisterSecondPage />
    </React.StrictMode>
);
